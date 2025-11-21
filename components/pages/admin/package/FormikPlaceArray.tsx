import React from "react";
import { FieldArray, Field, ErrorMessage, useFormikContext } from "formik";
import { FormikInput } from "@/components/atoms/FormikInput";
import Button from "@/components/atoms/Button";

interface PlaceOption {
  value: string;
  label: string;
}

interface FormikPlaceArrayProps {
  name: string;
  label?: string;
  placeOptions: PlaceOption[];
}

const FormikPlaceArray: React.FC<FormikPlaceArrayProps> = ({
  name,
  label,
  placeOptions,
}) => {
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Place Name:</label>
                    <Field
                      as="select"
                      name={`${name}.${idx}.place_id`}
                      className="w-full text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none"
                    >
                      <option value="">Select Place</option>
                      {placeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name={`${name}.${idx}.place_id`}
                      component="div"
                      className="text-red text-xs justify-self-end"
                    />
                  </div>
                  <FormikInput
                    label="Place Description:"
                    name={`${name}.${idx}.description`}
                    placeholder="Enter place description"
                  />
                  <Field type="hidden" name={`${name}.${idx}.order`} />
                  <FormikInput
                    label="Day No:"
                    name={`${name}.${idx}.day_no`}
                    type="number"
                    placeholder="Enter day number"
                    min={1}
                  />
                </div>

                <FieldArray name={`${name}.${idx}.events`}>
                  {({ push, remove, form }) => {
                    const events = form.values[name][idx].events || [];
                    return (
                      <div>
                        <label className="text-sm font-medium">Events:</label>
                        {events.map((event: string, eventIdx: number) => (
                          <div key={eventIdx}>
                            <div className="flex gap-2 mb-2">
                              <Field
                                name={`${name}.${idx}.events.${eventIdx}`}
                                placeholder="Enter event"
                                className="w-full text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => remove(eventIdx)}
                                className="rounded-lg bg-gray-200 px-3 text-sm hover:bg-gray-300 align-self-center"
                                disabled={events.length === 1}
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
                              name={`${name}.${idx}.events.${eventIdx}`}
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
                    label="Add Place"
                    onClick={() =>
                      push({
                        place_id: "",
                        description: "",
                        order: 1,
                        day_no: 1,
                        events: [""],
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
                label="Add Place"
                onClick={() =>
                  push({
                    place_id: "",
                    description: "",
                    order: 1,
                    day_no: 1,
                    events: [""],
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

export default FormikPlaceArray;
