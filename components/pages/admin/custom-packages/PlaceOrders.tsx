import Button from "@/components/atoms/Button";
import { FormikInput } from "@/components/atoms/FormikInput";
import Modal from "@/components/molecules/Modal";
import { useUpdateCustomPackagePlaceMutation } from "@/services/customPackageApi";
import { Form, Formik } from "formik";
import {
  Activity,
  Book,
  BookText,
  Edit3,
  MapPin,
  Text,
  User,
} from "lucide-react";
import React from "react";
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
  console.log("customizePackagePlaces", customizePackagePlaces);
  const [updateCustomPackagePlace] = useUpdateCustomPackagePlaceMutation();

  return (
    <Modal isOpen={show} onClose={onClose} title="" className="md:max-w-4xl">
      <div className="flex flex-col gap-4 mt-4 overflow-y-auto pr-1">
        {customizePackagePlaces.map((pkg: any) => (
          <>
            <div
              key={pkg.id}
              className="hidden md:flex flex-col w-full bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="bg-gray-200 w-full py-3 px-4 rounded-t-lg">
                <Formik
                  initialValues={{
                    dayNo: pkg.day_no ? pkg.day_no : "",
                    sortOrder: pkg.sort_order ? pkg.sort_order : "",
                    description: pkg.description ? pkg.description : "",
                  }}
                  validationSchema={Yup.object({
                    dayNo: Yup.number()
                      .min(1, "* Day No must be at least 1")
                      .required("* Day No is Required"),
                    sortOrder: Yup.number()
                      .min(1, "* Sort Order must be at least 1")
                      .required("* Sort Order is Required"),
                    description: Yup.string().required(
                      "* Description is Required"
                    ),
                  })}
                  onSubmit={async (values) => {
                    try {
                      const response = await updateCustomPackagePlace({
                        id: pkg.id,
                        sortOrder: values.sortOrder,
                        dayNo: values.dayNo,
                        description: pkg.description,
                      }).unwrap();
                      toast.success(response.message);
                      onClose();
                    } catch (err: any) {
                      toast.error(err?.data?.message);
                    }
                  }}
                >
                  <Form className="flex w-full gap-16">
                    <div className="flex flex-col w-screen">
                      <div className="flex justify-between border-b border-gray-300 pb-2">
                        <p className="flex gap-2 items-center font-bold">
                          <MapPin width={18} />
                          {pkg.Place.name}
                        </p>
                        <span className="flex text-sm gap-2 items-center mt-2">
                          <BookText width={16} /> {pkg.description}
                        </span>
                      </div>
                      <div className="flex w-full gap-4 pt-2">
                        <div className="flex-1">
                          <FormikInput
                            label="Day No"
                            className="w-fit text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none"
                            name="dayNo"
                            type="number"
                            min={0}
                          />
                        </div>
                        <div className="flex-1">
                          <FormikInput
                            label="Sort Order"
                            className="w-fit text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none"
                            name="sortOrder"
                            type="number"
                            min={0}
                          />
                        </div>
                        <div className="flex-[3]">
                          <FormikInput
                            label="Description"
                            className="w-full text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none"
                            name="description"
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      label="Submit"
                      className="w-min py-1 px-2 rounded-md text-white bg-green-500 text-sm uppercase tracking-wide self-center"
                    />
                  </Form>
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

            <div
              key={pkg.id}
              className="flex flex-col md:hidden w-full bg-white rounded-lg shadow-sm border border-gray-200 pr-1"
            >
              <div className="bg-gray-200 w-full py-3 px-4 rounded-t-lg">
                <div className="flex flex-col border-b border-gray-300 pb-2">
                  <p className="flex gap-2 items-center font-bold">
                    <MapPin width={18} />
                    {pkg.Place.name}
                  </p>
                  <span className="flex text-sm gap-2 items-center mt-2">
                    <BookText width={16} /> {pkg.description}
                  </span>
                </div>
                <Formik
                  initialValues={{
                    dayNo: pkg.day_no ? pkg.day_no : "",
                    sortOrder: pkg.sort_order ? pkg.sort_order : "",
                    description: pkg.description ? pkg.description : "",
                  }}
                  validationSchema={Yup.object({
                    dayNo: Yup.number()
                      .min(1, "* Day No must be at least 1")
                      .required("* Day No is Required"),
                    sortOrder: Yup.number()
                      .min(1, "* Sort Order must be at least 1")
                      .required("* Sort Order is Required"),
                    description: Yup.string().required(
                      "* Description is Required"
                    ),
                  })}
                  onSubmit={async (values) => {
                    try {
                      const response = await updateCustomPackagePlace({
                        id: pkg.id,
                        sortOrder: values.sortOrder,
                        dayNo: values.dayNo,
                        description: pkg.description,
                      }).unwrap();
                      toast.success(response.message);
                      onClose();
                    } catch (err: any) {
                      toast.error(err?.data?.message);
                    }
                  }}
                >
                  <Form className="flex flex-col w-full gap-4">
                    <div className="flex w-full gap-4 pt-2">
                      <FormikInput
                        label="Day No"
                        className="w-full text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none"
                        name="dayNo"
                        type="number"
                        min={0}
                      />

                      <FormikInput
                        label="Sort Order"
                        className="w-full text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none"
                        name="sortOrder"
                        type="number"
                        min={0}
                      />
                    </div>
                    <FormikInput
                      label="Description"
                      className="w-full text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none"
                      name="description"
                    />
                    <Button
                      type="submit"
                      label="Submit"
                      className="w-full py-1 px-2 rounded-md text-white bg-green-500 text-sm uppercase tracking-wide self-center"
                    />
                  </Form>
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
          </>
        ))}
      </div>
    </Modal>
  );
}

export default PlaceOrders;
