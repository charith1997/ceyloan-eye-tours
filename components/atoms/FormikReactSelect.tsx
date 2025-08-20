import Select from "react-select";
import { ErrorMessage, useFormikContext } from "formik";

interface Option {
  value: string;
  label: string;
}

interface FormikReactSelectProps {
  name: string;
  label?: string;
  options: Option[];
}

interface FormValues {
  [key: string]: any;
}

const FormikReactSelect: React.FC<FormikReactSelectProps> = ({
  name,
  label,
  options,
}) => {
  const { setFieldValue, values } = useFormikContext<FormValues>();

  const selectedValues: string[] = Array.isArray(values[name])
    ? values[name]
    : [];

  return (
    <div className="mb-4">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Select
        isMulti
        name={name}
        options={options}
        value={options.filter((opt) => selectedValues.includes(opt.value))}
        onChange={(selected) =>
          setFieldValue(
            name,
            Array.isArray(selected)
              ? selected.map((opt) => (opt as Option).value)
              : []
          )
        }
        classNamePrefix="react-select"
        classNames={{
          control: (state) =>
            `react-select__control text-sm font-medium ${
              state.isFocused ? "react-select__control--is-focused" : ""
            }`,
          menu: () => "react-select__menu text-sm font-medium",
        }}
        placeholder="Select categories..."
      />
      <ErrorMessage
        name={name}
        component="div"
        className="justify-self-end text-xs font-medium text-red"
      />
    </div>
  );
};

export default FormikReactSelect;
