import Image from "next/image";

const ImageModal = ({
  imageUrl,
  onClose,
}: {
  imageUrl: string;
  onClose: () => void;
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 w-fit sm:w-full"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center w-fit"
      onClick={(e) => e.stopPropagation()}
    >
      <Image
        src={imageUrl}
        alt="Gallery Preview"
        width={500}
        height={400}
        className="object-contain rounded-lg max-w-full max-h-[80vh]"
      />
    </div>
  </div>
);

export default ImageModal;
