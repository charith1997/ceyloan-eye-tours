import React, { useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import FileUploader from "@/components/atoms/FileUploader";
import { FormikInput } from "@/components/atoms/FormikInput";
import Modal from "@/components/molecules/Modal";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useCreateCategoryMutation } from "@/services/categoryApi";

interface AddPlaceProps {
  show: boolean;
  onClose: () => void;
}

interface PlaceSuggestion {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

function AddPlace({ show, onClose }: AddPlaceProps) {
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [createCategory] = useCreateCategoryMutation();
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [coordinates, setCoordinates] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google?.maps?.places) {
      setIsGoogleLoaded(true);
      return;
    }

    // If not loaded, listen for the load event
    const handleGoogleMapsLoaded = () => {
      console.log("Google Maps load event received");
      setIsGoogleLoaded(true);
    };

    window.addEventListener("google-maps-loaded", handleGoogleMapsLoaded);

    // Set a timeout for loading
    const timeoutId = setTimeout(() => {
      if (!isGoogleLoaded) {
        console.error("Failed to load Google Maps after timeout");
        toast.error("Failed to load Google Maps. Please refresh the page.");
      }
    }, 5000);

    return () => {
      window.removeEventListener("google-maps-loaded", handleGoogleMapsLoaded);
      clearTimeout(timeoutId);
    };
  }, [isGoogleLoaded]);

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const value = e.target.value;
    setSearchValue(value);
    setFieldValue("location", value);

    if (value && window.google?.maps?.places) {
      const sessionToken = new google.maps.places.AutocompleteSessionToken();
      const service = new google.maps.places.AutocompleteService();

      try {
        const predictions = await service.getPlacePredictions({
          input: value,
          componentRestrictions: { country: "lk" },
          sessionToken,
        });
        setSuggestions(predictions?.predictions || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = async (
    suggestion: PlaceSuggestion,
    setFieldValue: (field: string, value: any) => void
  ) => {
    setSearchValue(suggestion.description);
    setFieldValue("location", suggestion.description);
    setSuggestions([]);

    try {
      const geocoder = new google.maps.Geocoder();
      const result = await geocoder.geocode({
        placeId: suggestion.place_id,
      });

      if (result.results[0]?.geometry?.location) {
        const location = result.results[0].geometry.location;
        setCoordinates({
          lat: location.lat(),
          lng: location.lng(),
        });
      }
    } catch (error) {
      console.error("Error getting coordinates:", error);
      toast.error("Failed to get location coordinates");
    }
  };

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Place Form"
      className="md:w-lg"
    >
      {!isGoogleLoaded ? (
        <div className="text-center py-4">Loading Google Maps...</div>
      ) : (
        <Formik
          initialValues={{
            name: "",
            description: "",
            image: null,
            location: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("* Name is Required"),
            description: Yup.string().required("* Description is Required"),
            image: Yup.mixed().required("* Image is required"),
            location: Yup.string().required("* Location is Required"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (!coordinates.lat || !coordinates.lng) {
              toast.error("Please select a valid location from the dropdown");
              return;
            }

            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("latitude", coordinates.lat.toString());
            formData.append("longitude", coordinates.lng.toString());
            formData.append("location", values.location);
            if (values.image) {
              formData.append("image", values.image);
            }

            try {
              const response = await createCategory(formData).unwrap();
              toast.success(response.message);
              resetForm();
              onClose();
            } catch (err: any) {
              toast.error(err?.data?.message || "Failed to create place");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4 flex-1 overflow-y-auto py-2 pr-2">
              <FormikInput
                label="Name:"
                name="name"
                placeholder="Enter place name"
              />

              <FormikInput
                label="Description:"
                name="description"
                placeholder="Enter description"
              />

              <div className="relative">
                <FormikInput
                  label="Location:"
                  name="location"
                  placeholder="Search location"
                  value={searchValue}
                  onChange={(e) => handleInputChange(e, setFieldValue)}
                  disabled={!isGoogleLoaded}
                />
                {suggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.place_id}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSelect(suggestion, setFieldValue)}
                      >
                        <div className="font-medium">
                          {suggestion.structured_formatting.main_text}
                        </div>
                        <div className="text-sm text-gray-500">
                          {suggestion.structured_formatting.secondary_text}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <FileUploader name="image" label="Upload Image" />

              <div className="flex gap-6">
                <Button
                  onClick={onClose}
                  className="w-full text-white px-8 py-2 rounded-lg bg-[#1976D2] text-lg font-semibold uppercase"
                  label="Cancel"
                />
                <Button
                  type="submit"
                  className="w-full text-white px-8 py-2 rounded-lg bg-gradient-to-r from-red to-orange text-lg font-semibold uppercase"
                  label="Save"
                />
              </div>
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
}

export default AddPlace;
