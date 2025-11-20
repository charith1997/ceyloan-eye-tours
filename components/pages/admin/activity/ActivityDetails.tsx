import AdminDetailsContainer from "@/components/containers/AdminDetailsContainer";
import { checkImageUrl } from "@/utils/common";
import React from "react";

interface ActivityDetailsProps {
  activity: any;
  onClose: () => void;
}

function ActivityDetails({ activity, onClose }: ActivityDetailsProps) {
  return (
    <AdminDetailsContainer
      onClose={onClose}
      heading={
        <h3 className="text-xl font-semibold leading-6 text-gray-900">
          Activity Details
        </h3>
      }
    >
      <div className="block md:flex gap-4">
        <img
          src={checkImageUrl(activity.image_url)}
          alt="Category Image"
          className="object-cover rounded-lg w-full md:max-w-60 max-h-60"
        />
        <div className="bg-gray-50 rounded-lg p-4 w-full">
          <h4 className="text-lg text-gray-900 mb-4">Activity Information</h4>
          <div className="flex flex-col gap-4 pb-4 text-sm">
            <SingleInfo title="Name" value={activity.name} />
            <SingleInfo title="Description" value={activity.description} />
          </div>
        </div>
      </div>
    </AdminDetailsContainer>
  );
}

export default ActivityDetails;

interface SingleInfoProps {
  title: string;
  value: string;
}

const SingleInfo = ({ title, value }: SingleInfoProps) => (
  <div className="flex gap-2 text-sm">
    <p className="text-gray-600">{title}:</p>
    <p className="text-gray-900">{value}</p>
  </div>
);
