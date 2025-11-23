import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import RequestedImages from "./RequestedImages";
import ApprovedImages from "./ApprovedImages";
import ActionModal from "./ActionModal";
import {
  useDeleteGalleryImageMutation,
  useUpdateGalleryStatusMutation,
} from "@/services/galleryApi";
import toast from "react-hot-toast";
import ImageModal from "./ImageModal";
import DeleteModal from "./DeleteModal";
import { approveBtnColor, declineBtnColor } from "@/styles/colors";
import AddImage from "./AddImage";

const AdminGalleryPage = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [viewImageUrl, setViewImageUrl] = useState<string | null>(null);
  const [addImage, setAddImage] = useState(false);
  const [updateGalleryStatus] = useUpdateGalleryStatusMutation();
  const [deleteGalleryImage] = useDeleteGalleryImageMutation();

  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder="Search Gallery..."
          title="Gallery"
          buttonName="Add Image"
          onClick={() => setAddImage(true)}
        />

        <div className="w-full ">
          <div className="md:max-w-xs flex">
            <Button
              label="Requested"
              className={`flex-1 p-2 text-center text-sm cursor-pointer ${
                activeTab === "tab1" ? "border-b-2 text-red" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("tab1")}
            />
            <Button
              label="Approved"
              className={`flex-1 p-2 text-center text-sm cursor-pointer ${
                activeTab === "tab2" ? "border-b-2 text-red" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("tab2")}
            />
          </div>

          <div className="pt-8">
            {activeTab === "tab1" && (
              <RequestedImages
                displayApproveModal={(id) => {
                  setShowApproveModal(true);
                  setSelectedImageId(id);
                }}
                setViewImageUrl={setViewImageUrl}
                displayDeleteModal={(id) => {
                  setShowDeleteModal(true);
                  setSelectedImageId(id);
                }}
              />
            )}
            {activeTab === "tab2" && (
              <ApprovedImages
                setViewImageUrl={setViewImageUrl}
                displayCancelModal={(id) => {
                  setShowCancelModal(true);
                  setSelectedImageId(id);
                }}
                displayDeleteModal={(id) => {
                  setShowDeleteModal(true);
                  setSelectedImageId(id);
                }}
              />
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
        show={showApproveModal || showCancelModal}
        onClose={() => {
          setShowApproveModal(false);
          setShowCancelModal(false);
          setSelectedImageId(null);
        }}
        title={showApproveModal ? "Approve Image" : "Reject Image"}
        description={
          showApproveModal
            ? "Are you sure you want to approve this image?"
            : "Are you sure you want to reject this image?"
        }
        handleSubmit={async () => {
          if (selectedImageId) {
            try {
              if (showApproveModal) {
                const response = await updateGalleryStatus({
                  id: selectedImageId,
                  data: { isApproved: true },
                }).unwrap();
                toast.success(response.message);
              } else {
                const response = await updateGalleryStatus({
                  id: selectedImageId,
                  data: { isApproved: false },
                }).unwrap();
                toast.success(response.message);
              }
              setShowApproveModal(false);
              setShowCancelModal(false);
            } catch (err: any) {
              toast.error(err?.data?.message);
            }
          }
        }}
        buttonLabel={showApproveModal ? "Cancel" : "Cancel"}
        submitLabel={showApproveModal ? "Approve" : "Reject"}
        // submitLabelColor={showApproveModal ? "bg-[#4CAF50]" : "bg-red"}
        submitLabelColor={
          showApproveModal
            ? `w-full ${approveBtnColor}`
            : `w-full ${declineBtnColor}`
        }
      />

      <DeleteModal
        title="Delete Image"
        description="Are you sure you want to delete this image?"
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedImageId(null);
        }}
        handleDelete={async () => {
          if (selectedImageId) {
            try {
              const response = await deleteGalleryImage(
                selectedImageId
              ).unwrap();
              toast.success(response.message);
              setShowDeleteModal(false);
            } catch (err: any) {
              toast.error(err?.data?.message);
            }
          }
        }}
      />
      <AddImage onClose={() => setAddImage(false)} show={addImage} />
    </>
  );
};

export default AdminGalleryPage;
