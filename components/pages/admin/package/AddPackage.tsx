import Button from "@/components/atoms/Button";
import Dropdown from "@/components/atoms/Dropdown";
import { FormikInput } from "@/components/atoms/FormikInput";
import { Input } from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import Modal from "@/components/molecules/Modal";
import React from "react";

interface AddPackageProps {
  show: boolean;
  onClose: () => void;
}

function AddPackage({ show, onClose }: AddPackageProps) {
  return (
    <Modal isOpen={show} onClose={onClose} title="Package Form">
      <form
        id="tour-form"
        className="space-y-4 flex-1 overflow-y-auto py-2 pr-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormikInput label="Category Name:" name="category" />
          <FormikInput label="Day count:" name="day_count" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Dropdown options={["Option 1", "Option 2"]} label="Tour Type:" />
          <Dropdown
            options={["Option 1", "Option 2"]}
            label="Places to visit:"
          />
        </div>
        <FormikInput label="Category Name:" name="category" />
        <FormikInput label="Day count:" name="day_count" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormikInput label="Category Name:" name="category" />
          <FormikInput label="Day count:" name="day_count" />
        </div>

        <div>
          <label className="block text-sm font-medium">Images:</label>
          <input
            type="file"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormikInput label="Category Name:" name="category" />
        </div>
      </form>
      <div className="flex justify-center gap-6 mt-4 bg-white">
        <Button
          onClick={onClose}
          className="w-full text-white px-8 py-2 rounded-lg cursor-pointer bg-[#1976D2] text-lg font-semibold uppercase"
          label="Cancel"
        />
        <Button
          type="submit"
          form="tour-form"
          className="w-full text-white px-8 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-red to-orange text-lg font-semibold uppercase"
          onClick={() => {}}
          label="Save"
        />
      </div>
    </Modal>
  );
}

export default AddPackage;
