"use client";
import FormikCheckbox from "@/components/atoms/FormikCheckbox";
import FormikDropdown from "@/components/atoms/FormikDropdown";
import Jumbotron from "@/components/molecules/Jumbotron";
import PageDetails from "@/components/organisams/PageDetails";
import { useGetAllPlacesQuery } from "@/services/placesApi";
import { Form, Formik, FieldArray, ErrorMessage } from "formik";
import React from "react";
import { Plus, Trash2, MapPin, Activity } from "lucide-react";
import { useGetAllPlaceActivitiesQuery } from "@/services/placeActivity";
import * as Yup from "yup";
import Button from "@/components/atoms/Button";
import { useCreateCustomPackagePlaceMutation } from "@/services/customPackageApi";
import toast from "react-hot-toast";

interface PlaceActivity {
  placeId: string;
  activityIds: string[];
}

interface FormValues {
  placeActivities: PlaceActivity[];
}

export default function PlanYourTrip() {
  const { data: placeData } = useGetAllPlacesQuery();

  const places = Array.isArray(placeData?.data) ? placeData.data : [];

  const { data: activityData } = useGetAllPlaceActivitiesQuery();
  const placeActivities = Array.isArray(activityData?.data)
    ? activityData.data
    : [];

  const [createCustomPackagePlace] = useCreateCustomPackagePlaceMutation();

  const initialValues: FormValues = {
    placeActivities: [{ placeId: "", activityIds: [] }],
  };

  const getAvailableActivities = (placeId: string) => {
    const allPlaceActivities = placeActivities.find(
      (a: any) => a.placeDetails.id === placeId
    );

    return allPlaceActivities ? allPlaceActivities.activities : [];
  };

  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      <Jumbotron
        title="Plan Your Trip"
        description="Create your perfect itinerary with our expert guides."
        imageUrl="/round tours/round-tours_main.png"
      />
      <PageDetails
        title="Start Planning Your Family Tour in Sri Lanka"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum."
      />
      <div className="w-full max-w-5xl mx-auto py-4 md:p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            placeActivities: Yup.array().of(
              Yup.object().shape({
                placeId: Yup.string().required("* Place is Required"),
                // activityIds: Yup.array()
                //   .of(Yup.string().required("* Activity is Required"))
                //   .min(1, "* At least one activity is required"),
              })
            ),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const filteredData = values.placeActivities.filter(
              (pa) => pa.placeId !== ""
            );
            try {
              const response = await createCustomPackagePlace({
                places: filteredData,
              }).unwrap();
              toast.success(response.message);
              resetForm();
            } catch (error: any) {
              console.error("Error submitting form:", error);
              toast.error(error?.data?.message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, setFieldValue, submitForm }) => (
            <Form>
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    Design Your Perfect Itinerary
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Select places and activities for your dream vacation
                  </p>
                </div>

                <FieldArray name="placeActivities">
                  {({ push, remove }) => (
                    <>
                      <div className="space-y-6 mb-8">
                        {values.placeActivities.map((item, index) => {
                          const availableActivities = getAvailableActivities(
                            item.placeId
                          );

                          return (
                            <div
                              key={index}
                              className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent transition-all duration-300"
                            >
                              <div
                                className="py-4 px-5 flex items-center justify-between"
                                style={{ backgroundColor: "#cd1a40" }}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                    <span
                                      className="font-bold text-sm md:text-base"
                                      style={{ color: "#cd1a40" }}
                                    >
                                      {index + 1}
                                    </span>
                                  </div>
                                  <h3 className="text-white font-semibold text-base md:text-lg">
                                    Destination {index + 1}
                                  </h3>
                                </div>
                                {values.placeActivities.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                                    aria-label="Remove destination"
                                  >
                                    <Trash2 className="w-4 h-4 text-white" />
                                  </button>
                                )}
                              </div>

                              <div className="p-4 md:p-6">
                                <div className="mb-6">
                                  <div className="flex items-center gap-2 mb-3">
                                    <MapPin
                                      className="w-4 h-4"
                                      style={{ color: "#cd1a40" }}
                                    />
                                    <span className="text-sm font-semibold text-gray-700">
                                      Select Place
                                    </span>
                                  </div>
                                  <FormikDropdown
                                    label=""
                                    name={`placeActivities.${index}.placeId`}
                                    options={places.map((place: any) => ({
                                      value: place.id,
                                      label: place.name,
                                    }))}
                                    defaultOption="Choose a place..."
                                    onChange={(
                                      e: React.ChangeEvent<HTMLSelectElement>
                                    ) => {
                                      setFieldValue(
                                        `placeActivities.${index}.placeId`,
                                        e.target.value
                                      );
                                      setFieldValue(
                                        `placeActivities.${index}.activityIds`,
                                        []
                                      );
                                    }}
                                  />
                                </div>

                                {item.placeId &&
                                  availableActivities.length > 0 && (
                                    <div>
                                      <div className="flex items-center gap-2 mb-3">
                                        <Activity
                                          className="w-4 h-4"
                                          style={{ color: "#ff803c" }}
                                        />
                                        <span className="text-sm font-semibold text-gray-700">
                                          Select Activities
                                        </span>
                                      </div>
                                      <div className="space-y-2">
                                        {availableActivities.map(
                                          (activity: any) => (
                                            <div
                                              key={activity.id}
                                              className="bg-gray-50 hover:bg-gray-100 rounded-xl p-3 transition-colors flex items-center justify-between"
                                            >
                                              <FormikCheckbox
                                                label={activity.name}
                                                name={`placeActivities.${index}.activityIds`}
                                                value={activity.id}
                                              />
                                              <span className="text-sm">
                                                $ {activity.price}
                                              </span>
                                            </div>
                                          )
                                        )}
                                        <ErrorMessage
                                          name={`placeActivities.${index}.activityIds`}
                                          component="div"
                                          className="justify-self-end text-xs font-medium text-red"
                                        />
                                      </div>
                                    </div>
                                  )}

                                {item.placeId &&
                                  availableActivities.length === 0 && (
                                    <div className="text-center py-4 text-gray-500 text-sm">
                                      No activities available for this place
                                    </div>
                                  )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={() => push({ placeId: "", activityIds: [] })}
                        className="w-full py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mb-8 text-sm md:text-base"
                        style={{ backgroundColor: "#cd1a40" }}
                      >
                        <Plus className="w-5 h-5" />
                        Add Another Destination
                      </button>
                    </>
                  )}
                </FieldArray>

                <Button
                  type="button"
                  onClick={submitForm}
                  className="w-full mt-4 py-4 rounded-xl font-bold text-white bg-orange shadow-lg hover:shadow-xl transition-all duration-300 text-base md:text-lg"
                  label="Submit"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
