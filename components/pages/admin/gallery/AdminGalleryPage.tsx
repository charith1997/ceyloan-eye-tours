import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import RequestedImages from "./RequestedImages";
import ApprovedImages from "./ApprovedImages";
import ActionModal from "./ActionModal";
import { useUpdateGalleryStatusMutation } from "@/services/galleryApi";
import toast from "react-hot-toast";
import ImageModal from "./ImageModal";

const AdminGalleryPage = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [viewImageUrl, setViewImageUrl] = useState<string | null>(null);

  const [updateGalleryStatus] = useUpdateGalleryStatusMutation();

  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder="Search Gallery..."
          title="Gallery"
          buttonName="Add Image"
          onClick={() => { }}
          isDisplayActionButton={false}
        />

        <div className="w-full ">
          <div className="md:max-w-xs flex">
            <Button
              label="Requested"
              className={`flex-1 p-2 text-center text-sm cursor-pointer ${activeTab === "tab1" ? "border-b-2 text-red" : "text-gray-500"
                }`}
              onClick={() => setActiveTab("tab1")}
            />
            <Button
              label="Approved"
              className={`flex-1 p-2 text-center text-sm cursor-pointer ${activeTab === "tab2" ? "border-b-2 text-red" : "text-gray-500"
                }`}
              onClick={() => setActiveTab("tab2")}
            />
          </div>

          <div className="pt-8">
            {activeTab === "tab1" && (
              <RequestedImages
                displayApproveModal={(id) => {
                  setShowModal(true);
                  setSelectedImage(id);
                }}
                setViewImageUrl={setViewImageUrl}
              />
            )}
            {activeTab === "tab2" && (
              <ApprovedImages setViewImageUrl={setViewImageUrl} />
            )}
          </div>
        </div>
      </NavigationContainer>

      {viewImageUrl && (
        <ImageModal
          imageUrl={viewImageUrl}
          onClose={() => setViewImageUrl(null)}
        />
      )}

      <ActionModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Approve Image"
        description="Are you sure you want to approve this image?"
        handleSubmit={async () => {
          if (selectedImage) {
            try {
              const response = await updateGalleryStatus({
                id: selectedImage,
                data: { isApproved: true },
              }).unwrap();
              toast.success(response.message);
              setShowModal(false);
            } catch (err: any) {
              toast.error(err?.data?.message);
            }
          }
        }}
      />
    </>
  );
};

export default AdminGalleryPage;
