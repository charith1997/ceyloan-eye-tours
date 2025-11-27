import React from "react";
import Button from "@/components/atoms/Button";
import FileUploader from "@/components/atoms/FileUploader";
import { FormikInput } from "@/components/atoms/FormikInput";
import Modal from "@/components/molecules/Modal";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  useCreateHotelMutation,
  useUpdateHotelMutation,
} from "@/services/hotelApi";
import FormikDropdown from "@/components/atoms/FormikDropdown";
import { useGetAllPlacesQuery } from "@/services/placesApi";
import FormikFieldArray from "@/components/atoms/FormikFieldArray";
import AddRoomDetails from "./AddRoomDetails";
import StarRatingInput from "@/components/atoms/StarRatingInput";
import { useGetAllHotelTypesQuery } from "@/services/hotelTypeApi";
import { cancelBtnColor, saveBtnColor } from "@/styles/colors";
import { isDifferent } from "@/utils/package";
import { compareRoomDetails } from "@/utils/roomDiff";

interface AddHotelProps {
  show: boolean;
  onClose: () => void;
  initialValues: {
    id: string;
    name: string;
    placeId: string;
    description: string[];
    facilities: string[];
    roomsDetails: any[];
    rating: number;
    typeId: string;
    images: any[];
  };
  isEdit: boolean;
}

function AddHotel({ show, onClose, initialValues, isEdit }: AddHotelProps) {
  const [createHotel] = useCreateHotelMutation();
  const [updateHotel] = useUpdateHotelMutation();
  const { data: placeData } = useGetAllPlacesQuery();
  const places = Array.isArray(placeData?.data) ? placeData.data : [];
  const { data: hotelTypeData } = useGetAllHotelTypesQuery();
  const hotelTypes = Array.isArray(hotelTypeData?.data)
    ? hotelTypeData.data
    : [];

  const defaultInitialValues = initialValues || {
    name: "",
    placeId: "",
    description: [""],
    facilities: [""],
    roomsDetails: [],
    rating: 1,
    typeId: "",
    images: [],
  };
  return (
    <Modal isOpen={show} onClose={onClose} title="Hotel Form" className="">
      <Formik
        initialValues={defaultInitialValues}
        validationSchema={Yup.object({
          name: Yup.string().required("* Name is Required"),
          placeId: Yup.string().required("* Place is Required"),
          description: Yup.array()
            .of(Yup.string().required("* Description is required"))
            .min(1, "* At least one description is required")
            .test(
              "no-empty",
              "* Descriptions cannot be empty",
              (arr) =>
                Array.isArray(arr) && arr.every((str) => str?.trim() !== "")
            )
            .required("* Description is required"),
          facilities: Yup.array()
            .of(Yup.string().required("* Facility is required"))
            .min(1, "* At least one facility is required")
            .test(
              "no-empty",
              "* Facilities cannot be empty",
              (arr) =>
                Array.isArray(arr) && arr.every((str) => str?.trim() !== "")
            )
            .required("* Facilities are required"),
          roomsDetails: Yup.array()
            .of(
              Yup.object({
                room_type: Yup.string().required("* Room type is required"),
                size: Yup.string().required("* Room size is required"),
                beds: Yup.string().required("* Bed count required"),
                members: Yup.string().required("* Member count is required"),
                description: Yup.array()
                  .of(Yup.string().required("* Room description is required"))
                  .min(1, "* At least one room description is required")
                  .test(
                    "no-empty",
                    "* Room descriptions cannot be empty",
                    (arr) =>
                      Array.isArray(arr) &&
                      arr.every((str) => str?.trim() !== "")
                  )
                  .required("* Room descriptions are required"),
                attachment: Yup.object({
                  id: Yup.string().required(),
                  value: Yup.mixed()
                    .nullable()
                    .test("required", "* Image is required", function (value) {
                      // Check if value is a File, array of Files, or array of strings (URLs)
                      if (!value) return false;
                      if (value instanceof File) return true;
                      if (Array.isArray(value) && value.length > 0) {
                        return value.every(
                          (item) =>
                            item instanceof File || typeof item === "string"
                        );
                      }
                      if (typeof value === "string" && value.trim() !== "")
                        return true;
                      return false;
                    })
                    .test(
                      "fileType",
                      "* Only image files are allowed",
                      function (value) {
                        if (!value) return true; // Let required test handle this
                        if (value instanceof File) {
                          return value.type.startsWith("image/");
                        }
                        if (Array.isArray(value)) {
                          return value.every((item) =>
                            item instanceof File
                              ? item.type.startsWith("image/")
                              : true
                          );
                        }
                        return true; // String URLs are fine
                      }
                    ),
                }).required("* Image is required"),
              })
            )
            .min(1, "* Add at least one room")
            .required("* Rooms are required"),
          rating: Yup.number().min(1).max(5).required("* Rating is required"),
          typeId: Yup.string().required("* Hotel Type is Required"),
          images: Yup.array()
            .of(
              Yup.mixed().test(
                "fileType",
                "Only image files are allowed",
                (value, context) => {
                  if (typeof value === "string") return true;
                  return value instanceof File;
                }
              )
            )
            .min(1, "* At least one image is required")
            .required("* Image is required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          if (isEdit) {
            if (values.name !== initialValues?.name)
              formData.append("name", values.name);
            if (values.placeId !== initialValues?.placeId)
              formData.append("placeId", values.placeId);
            if (values.typeId !== initialValues?.typeId)
              formData.append("typeId", values.typeId);
            if (values.rating !== initialValues?.rating)
              formData.append("rating", values.rating.toString());

            const decsriptions = isDifferent(
              initialValues?.description,
              values.description
            );
            if (decsriptions) {
              formData.append(
                "description",
                JSON.stringify(values.description)
              );
            }

            const roomFacilities = isDifferent(
              initialValues?.facilities,
              values.facilities
            );
            if (roomFacilities) {
              formData.append("facilities", JSON.stringify(values.facilities));
            }

            const oldImages = initialValues?.images || [];
            const newImages = values.images || [];

            const removedImages = oldImages.filter(
              (oldImg) =>
                !newImages.some(
                  (newImg) => typeof newImg === "string" && newImg === oldImg
                )
            );

            const addedImages = newImages.filter(
              (newImg) => newImg instanceof File || !oldImages.includes(newImg)
            );
            addedImages.forEach((file) => formData.append("images", file));

            if (removedImages.length > 0)
              formData.append("removeImages", JSON.stringify(removedImages));

            // Handle room details changes
            const hasRoomChanges = compareRoomDetails(
              initialValues?.roomsDetails || [],
              values.roomsDetails || []
            );

            if (hasRoomChanges) {
              const removeRoomImages: string[] = [];
              let hasNewRooms = false;
              let hasAnyChanges = false;

              // First pass: Check what type of changes exist
              values.roomsDetails.forEach((currentRoom: any) => {
                const initialRoom = initialValues?.roomsDetails?.find(
                  (r: any) => r.id === currentRoom.id
                );

                if (!initialRoom) {
                  hasNewRooms = true;
                } else {
                  const roomModified =
                    initialRoom.room_type !== currentRoom.room_type ||
                    initialRoom.size !== currentRoom.size ||
                    String(initialRoom.beds) !== String(currentRoom.beds) ||
                    String(initialRoom.members) !==
                      String(currentRoom.members) ||
                    JSON.stringify(initialRoom.description) !==
                      JSON.stringify(currentRoom.description);

                  const imageChanged =
                    currentRoom.attachment?.value instanceof File &&
                    typeof initialRoom.attachment?.value === "string";

                  if (roomModified || imageChanged) {
                    hasAnyChanges = true;
                  }
                }
              });

              // Check for removed rooms
              initialValues?.roomsDetails?.forEach((initialRoom: any) => {
                const stillExists = values.roomsDetails.find(
                  (r: any) => r.id === initialRoom.id
                );
                if (!stillExists) {
                  hasAnyChanges = true;
                  // Room was removed - add its image to removal list
                  if (initialRoom.attachment?.value) {
                    removeRoomImages.push(initialRoom.attachment.value);
                  }
                }
              });

              // If there are any changes (new rooms, modifications, or image changes), send ALL rooms
              if (hasNewRooms || hasAnyChanges) {
                const allRooms = values.roomsDetails.map((room: any) => {
                  const initialRoom = initialValues?.roomsDetails?.find(
                    (r: any) => r.id === room.id
                  );

                  if (initialRoom) {
                    // Existing room - check if image changed
                    const imageChanged =
                      room.attachment?.value instanceof File &&
                      typeof initialRoom.attachment?.value === "string";

                    if (imageChanged) {
                      // Add old image to removal list
                      removeRoomImages.push(initialRoom.attachment.value);

                      // Append new image file
                      if (room.attachment.value instanceof File) {
                        formData.append(
                          `image_${room.id}`,
                          room.attachment.value
                        );
                      }

                      // Return room details WITHOUT image field
                      return {
                        id: room.id,
                        room_type: room.room_type,
                        size: room.size,
                        beds: room.beds,
                        members: room.members,
                        description: room.description,
                      };
                    } else {
                      // Return room details WITH image field (unchanged)
                      return {
                        id: room.id,
                        room_type: room.room_type,
                        size: room.size,
                        beds: room.beds,
                        members: room.members,
                        description: room.description,
                        image: room.attachment?.value,
                      };
                    }
                  } else {
                    // New room - append image file
                    if (room.attachment?.value instanceof File) {
                      formData.append(
                        `image_${room.id}`,
                        room.attachment.value
                      );
                    }

                    // Return room details WITHOUT image field
                    return {
                      id: room.id,
                      room_type: room.room_type,
                      size: room.size,
                      beds: room.beds,
                      members: room.members,
                      description: room.description,
                    };
                  }
                });

                formData.append("roomsDetails", JSON.stringify(allRooms));
              }

              if (removeRoomImages.length > 0) {
                formData.append(
                  "removeRoomImages",
                  JSON.stringify(removeRoomImages)
                );
              }
            }

            if ([...formData.keys()].length === 0) {
              toast("No changes detected");
              setSubmitting(false);
              return;
            }

            try {
              const response = await updateHotel({
                id: values.id,
                data: formData,
              }).unwrap();
              toast.success(response.message);
              resetForm();
              onClose();
            } catch (error: any) {
              console.error("Error updating form:", error);
              toast.error(error?.data?.message);
            } finally {
              setSubmitting(false);
            }
          } else {
            formData.append("name", values.name);
            formData.append("placeId", values.placeId);
            formData.append("description", JSON.stringify(values.description));
            formData.append("facilities", JSON.stringify(values.facilities));
            const rooms =
              values.roomsDetails &&
              values.roomsDetails.map((room: any) => ({
                id: room.id,
                room_type: room.room_type,
                size: room.size,
                beds: room.beds,
                members: room.members,
                description: room.description,
              }));
            formData.append("roomsDetails", JSON.stringify(rooms));
            formData.append("rating", values.rating.toString());
            formData.append("typeId", values.typeId);
            if (values.roomsDetails.length > 0) {
              values.roomsDetails.forEach((roomDetail) => {
                if (roomDetail.attachment && roomDetail.attachment.value) {
                  const attachment = roomDetail.attachment.value;
                  if (attachment instanceof File) {
                    formData.append(
                      `image_${roomDetail.attachment.id}`,
                      attachment
                    );
                  } else if (Array.isArray(attachment)) {
                    attachment.forEach((file: File) => {
                      formData.append(
                        `image_${roomDetail.attachment.id}`,
                        file
                      );
                    });
                  }
                }
              });
            }

            if (Array.isArray(values.images)) {
              values.images.forEach((image: File) => {
                formData.append("images", image);
              });
            } else {
              formData.append("images", values.images);
            }

            try {
              const response = await createHotel(formData).unwrap();
              toast.success(response.message);
              resetForm();
              onClose();
            } catch (err: any) {
              toast.error(err?.data?.message);
            } finally {
              setSubmitting(false);
            }
          }
        }}
      >
        <Form className="space-y-4 flex-1 overflow-y-auto py-2 pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <FormikInput
              label="Hotel Name:"
              name="name"
              placeholder="Enter hotel name"
            />

            <FormikDropdown
              label="Place:"
              name="placeId"
              options={places.map((place: any) => ({
                value: place.id,
                label: place.name,
              }))}
              defaultOption="Select Place"
            />

            <FormikDropdown
              label="Hotel Type:"
              name="typeId"
              options={hotelTypes.map((type: any) => ({
                value: type.id,
                label: type.name,
              }))}
              defaultOption="Select Hotel Type"
            />

            <StarRatingInput
              name="rating"
              maxRating={5}
              label="Hotel Rating:"
            />
          </div>
          <FormikFieldArray
            name="description"
            label="Description:"
            placeholder="Enter description"
          />

          <FormikFieldArray
            name="facilities"
            label="Facilities:"
            placeholder="Enter facilities"
          />

          <AddRoomDetails name="roomsDetails" label="Room Details:" />

          <FileUploader name="images" label="Upload Images" multiple />

          <div className="flex gap-6">
            <Button
              onClick={onClose}
              className={`w-full ${cancelBtnColor}`}
              label="Cancel"
            />
            <Button
              type="submit"
              className={`w-full ${saveBtnColor}`}
              label="Save"
            />
          </div>
        </Form>
      </Formik>
    </Modal>
  );
}

export default AddHotel;
