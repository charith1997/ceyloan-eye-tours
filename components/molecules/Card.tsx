import Image from "next/image";

interface CardProps {
  title: string;
  count: number;
  imageUrl: string;
  description: string;
  isTitleHighlighted: boolean;
}

const classNameForTitle =
  "font-work text-white text-4xl md:text-5xl  font-bold leading-none uppercase";
const classNameForDescription =
  "font-work text-white text-lg md:text-4xl tracking-wide uppercase";

const Card = ({
  title,
  count,
  imageUrl,
  description,
  isTitleHighlighted,
}: CardProps) => {
  return (
    <div className="relative h-48 md:h-64 rounded-md overflow-hidden">
      <Image
        src={imageUrl || "/round tours/General Tours.jpg"}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        fill
      />
      <div className="absolute inset-0 bg-black/50 rounded-xl z-0" />

      <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
        <div>
          <h3
            className={
              isTitleHighlighted ? classNameForTitle : classNameForDescription
            }
          >
            {title}
          </h3>
          <p
            className={
              isTitleHighlighted ? classNameForDescription : classNameForTitle
            }
          >
            {description}
          </p>
        </div>
        <span className="font-work self-start px-3 py-2 rounded-xl bg-gradient-to-r from-red to-orange text-white text-sm font-medium mt-2">
          {count.toString().padStart(2, "0")} TOURS
        </span>
      </div>
    </div>
  );
};

export default Card;
