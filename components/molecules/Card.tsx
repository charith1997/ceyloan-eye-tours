import { checkImageUrl } from "@/utils/common";

interface CardProps {
  title: string;
  imageUrl: string;
  children?: React.ReactNode;
}

const Card = ({ title, imageUrl, children }: CardProps) => {
  return (
    <div className="relative h-48 md:h-64 rounded-md overflow-hidden">
      <img
        src={checkImageUrl(imageUrl)}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 rounded-xl z-0" />

      {children}
    </div>
  );
};

export default Card;
