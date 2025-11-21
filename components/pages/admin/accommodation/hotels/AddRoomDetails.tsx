import React from "react";
import { FieldArray, Field, ErrorMessage, useFormikContext } from "formik";
import { FormikInput } from "@/components/atoms/FormikInput";
import Button from "@/components/atoms/Button";

interface AddRoomDetailsProps {
  name: string;
  label?: string;
}

const AddRoomDetails: React.FC<AddRoomDetailsProps> = ({ name, label }) => {
  const { errors, touched } = useFormikContext<any>();
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium">{label}</label>}
      <FieldArray name={name}>
        {({ push, remove, form }) => (
          <div>
            {form.values[name]?.map((item: any, idx: number) => (
              <div
                key={idx}
                className="border border-gray-400 rounded p-3 mb-2"
              >
                <FormikInput
                  label="Room Type:"
                  name={`${name}.${idx}.room_type`}
                  placeholder="Enter room type (Double room/Triple Room/Family Room/etc.)"
                />

                <FieldArray name={`${name}.${idx}.description`}>
                  {({ push, remove, form }) => {
                    const description =
                      form.values[name][idx].description || [];
                    return (
                      <div>
                        <label className="text-sm font-medium">
                          Description:
                        </label>
                        {description.map((desc: string, descIdx: number) => (
                          <div key={descIdx}>
                            <div className="flex gap-2 mb-2">
                              <Field
                                name={`${name}.${idx}.description.${descIdx}`}
                                placeholder="Enter description"
                                className="w-full text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => remove(descIdx)}
                                className="rounded-lg bg-gray-200 px-3 text-sm hover:bg-gray-300 align-self-center"
                                disabled={description.length === 1}
                              >
                                -
                              </button>
                              <button
                                type="button"
                                onClick={() => push("")}
                                className="rounded-lg bg-gray-200 px-3 text-sm hover:bg-gray-300 align-self-center"
                              >
                                +
                              </button>
                            </div>
                            <ErrorMessage
                              name={`${name}.${idx}.description.${descIdx}`}
                              component="div"
                              className="justify-self-end text-xs font-medium text-red"
                            />
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
                <div className="flex gap-2 mt-4">
                  <Button
                    type="button"
                    label="Remove"
                    onClick={() => remove(idx)}
                    className=" bg-red text-white text-sm px-2 py-1 rounded"
                  />
                  <Button
                    type="button"
                    label="Add Room"
                    onClick={() =>
                      push({
                        room_type: "",
                        description: [""],
                      })
                    }
                    className="bg-green-500 text-white text-sm px-2 py-1 rounded"
                  />
                </div>
              </div>
            ))}
            {(!form.values[name] || form.values[name].length === 0) && (
              <Button
                type="button"
                label="Add Room"
                onClick={() =>
                  push({
                    room_type: "",
                    description: [""],
                  })
                }
                className="bg-green-500 text-white text-sm px-2 py-1 rounded mt-2"
              />
            )}
          </div>
        )}
      </FieldArray>
      {touched[name] && typeof errors[name] === "string" && (
        <div className="text-red text-xs mt-1">{errors[name]}</div>
      )}
    </div>
  );
};

export default AddRoomDetails;
