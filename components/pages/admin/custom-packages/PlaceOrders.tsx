import Button from "@/components/atoms/Button";
import { FormikInput } from "@/components/atoms/FormikInput";
import Modal from "@/components/molecules/Modal";
import { useUpdateCustomPackagePlaceMutation } from "@/services/customPackageApi";
import { saveBtnColor, updateBtnColor } from "@/styles/colors";
import { Form, Formik, FormikProps } from "formik";
import {
  Activity,
  Book,
  BookText,
  Edit3,
  MapPin,
  Text,
  User,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

interface DeleteActivityProps {
  show: boolean;
  onClose: () => void;
  customizePackagePlaces: any;
}

function PlaceOrders({
  show,
  onClose,
  customizePackagePlaces,
}: DeleteActivityProps) {
  const [updateCustomPackagePlace] = useUpdateCustomPackagePlaceMutation();

  const [allFormValues, setAllFormValues] = useState<{ [key: number]: any }>(
    {}
  );

  const formikRefs = useRef<{ [key: number]: FormikProps<any> | null }>({});

  useEffect(() => {
    const initialValues: { [key: number]: any } = {};
    customizePackagePlaces.forEach((pkg: any) => {
      initialValues[pkg.id] = {
        dayNo: pkg.day_no || "",
        sortOrder: pkg.sort_order || "",
        description: pkg.description || "",
      };
    });
    setAllFormValues(initialValues);
  }, [customizePackagePlaces, show]);

  const handleValueChange = (pkgId: number, field: string, value: any) => {
    setAllFormValues((prev) => {
      const newValues = {
        ...prev,
        [pkgId]: {
          ...prev[pkgId],
          [field]: value,
        },
      };

      setTimeout(() => {
        Object.keys(formikRefs.current).forEach((id) => {
          const formik = formikRefs.current[Number(id)];
          if (formik && Number(id) !== pkgId) {
            formik.validateForm();
          }
        });
      }, 0);

      return newValues;
    });
  };

  const createValidationSchema = () => {
    return Yup.object({
      dayNo: Yup.number()
        .min(1, "* Day No must be at least 1")
        .required("* Day No is Required")
        .test("dayNo-validation", function (value) {
          if (!value) return true;

          const { sortOrder } = this.parent;
          if (!sortOrder) return true;

          const currentDayNo = Number(value);
          const currentSortOrder = Number(sortOrder);

          // Rule 1: dayNo cannot exceed sortOrder
          if (currentDayNo > currentSortOrder) {
            return this.createError({
              message: `* Day No cannot exceed Sort Order (${currentSortOrder})`,
            });
          }

          // Rule 2: Find max dayNo from all entries with STRICTLY LOWER sortOrder
          let maxPreviousDayNo = 0;

          Object.entries(allFormValues).forEach(
            ([pkgId, formValue]: [string, any]) => {
              const pkgSortOrder = Number(formValue.sortOrder);
              const pkgDayNo = Number(formValue.dayNo);

              // Only consider entries with STRICTLY LOWER sortOrder and valid values
              if (pkgSortOrder && pkgDayNo && pkgSortOrder < currentSortOrder) {
                maxPreviousDayNo = Math.max(maxPreviousDayNo, pkgDayNo);
              }
            }
          );

          // Rule 3: Current dayNo must be between maxPreviousDayNo and maxPreviousDayNo + 1
          if (maxPreviousDayNo > 0) {
            if (currentDayNo < maxPreviousDayNo) {
              return this.createError({
                message: `* Day No must be at least ${maxPreviousDayNo} (cannot go backwards)`,
              });
            }
            if (currentDayNo > maxPreviousDayNo + 1) {
              return this.createError({
                message: `* Day No cannot exceed ${
                  maxPreviousDayNo + 1
                } (max from previous sort orders is ${maxPreviousDayNo})`,
              });
            }
          }

          return true;
        }),
      sortOrder: Yup.number()
        .min(1, "* Sort Order must be at least 1")
        .max(
          customizePackagePlaces.length,
          `* Sort Order cannot exceed ${customizePackagePlaces.length}`
        )
        .required("* Sort Order is Required")
        .test(
          "unique-sort-order",
          "* This Sort Order is already used",
          function (value) {
            if (!value) return true;

            // Count how many times this sortOrder appears across ALL forms
            const count = Object.entries(allFormValues).filter(
              ([pkgId, formValue]: [string, any]) => {
                return Number(formValue.sortOrder) === Number(value);
              }
            ).length;

            // Should appear exactly once (only in current form)
            return count === 1;
          }
        ),
      description: Yup.string().required("* Description is Required"),
    });
  };

  return (
    <Modal isOpen={show} onClose={onClose} title="" className="md:max-w-4xl">
      <div className="flex flex-col gap-4 mt-4 overflow-y-auto pr-1">
        {customizePackagePlaces.map((pkg: any) => (
          <div
            key={pkg.id}
            className="flex flex-col w-full bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="bg-gray-100 w-full py-3 px-4 rounded-t-lg">
              <Formik
                innerRef={(formik) => {
                  formikRefs.current[pkg.id] = formik;
                }}
                enableReinitialize
                initialValues={
                  allFormValues[pkg.id] || {
                    dayNo: pkg.day_no ? pkg.day_no : "",
                    sortOrder: pkg.sort_order ? pkg.sort_order : "",
                    description: pkg.description ? pkg.description : "",
                  }
                }
                validationSchema={createValidationSchema}
                validateOnChange={true}
                validateOnBlur={true}
                onSubmit={async (values) => {
                  try {
                    const response = await updateCustomPackagePlace({
                      id: pkg.id,
                      sortOrder: values.sortOrder,
                      dayNo: values.dayNo,
                      description: values.description,
                    }).unwrap();
                    toast.success(response.message);
                    onClose();
                  } catch (err: any) {
                    toast.error(err?.data?.message);
                  }
                }}
              >
                {({ values, setFieldValue }) => (
                  <Form className="flex flex-col md:flex-row w-full md:gap-16 gap-4">
                    <div className="flex flex-col w-full">
                      <div className="flex border-b border-gray-300 pb-2 gap-2 items-center font-bold text-sm">
                        <MapPin width={18} />
                        {pkg.Place.name}
                      </div>
                      <div className="flex flex-col w-full gap-4 pt-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormikInput
                            label="Sort Order"
                            name="sortOrder"
                            type="number"
                            min={1}
                            max={customizePackagePlaces.length}
                            onChange={(e: any) => {
                              const value = e.target.value;
                              setFieldValue("sortOrder", value);
                              handleValueChange(pkg.id, "sortOrder", value);
                            }}
                            isDifferent={true}
                            differentLabel={`sortOrder-${pkg.id}`}
                          />
                          <FormikInput
                            label="Day No"
                            name="dayNo"
                            type="number"
                            min={1}
                            onChange={(e: any) => {
                              const value = e.target.value;
                              setFieldValue("dayNo", value);
                              handleValueChange(pkg.id, "dayNo", value);
                            }}
                            isDifferent={true}
                            differentLabel={`dayNo-${pkg.id}`}
                          />
                        </div>
                        <FormikInput
                          label="Description"
                          name="description"
                          onChange={(e: any) => {
                            const value = e.target.value;
                            setFieldValue("description", value);
                            handleValueChange(pkg.id, "description", value);
                          }}
                          as="textarea"
                          rows={3}
                          isDifferent={true}
                          differentLabel={`description-${pkg.id}`}
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      label="Submit"
                      className={`w-full md:w-auto self-center ${saveBtnColor}`}
                    />
                  </Form>
                )}
              </Formik>
            </div>

            <ul className="flex flex-col gap-2 px-8 py-4 list-disc">
              {pkg.Activities.map((activity: any) => (
                <li
                  key={activity.id}
                  className="text-sm gap-2 items-center text-nowrap"
                >
                  {activity.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default PlaceOrders;
