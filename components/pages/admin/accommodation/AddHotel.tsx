import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import React from "react";

interface AddHotelProps {
  show: boolean;
  onClose: () => void;
}

function AddHotel({ show, onClose }: AddHotelProps) {
  return (
    <Modal isOpen={show} onClose={onClose} title="Hotel Form">
      {/* <form
        id="hotel-form"
        className="space-y-4 flex-1 overflow-y-auto py-2 pr-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Hotel Name:"
            inputClassNames={textFieldClassNames}
            labelClassNames={labelClassNames}
          />
          <Input
            label="Star Rating:"
            inputClassNames={textFieldClassNames}
            labelClassNames={labelClassNames}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Dropdown options={["Option 1", "Option 2"]} label="Hotel Type:" />
          <Input
            label="Location:"
            inputClassNames={textFieldClassNames}
            labelClassNames={labelClassNames}
          />
        </div>

        <TextArea
          label="Description:"
          labelClassNames={labelClassNames}
          textAreaClassNames={`${textFieldClassNames} h-24`}
        />
        <TextArea
          label="Top Facilities:"
          labelClassNames={labelClassNames}
          textAreaClassNames={`${textFieldClassNames} h-24`}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Dropdown
            options={["Option 1", "Option 2"]}
            label="Available Rooms:"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Images:</label>
          <input
            type="file"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Rooms adding area?"
            inputClassNames={textFieldClassNames}
            labelClassNames={labelClassNames}
          />
        </div>
      </form> */}
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

export default AddHotel;
