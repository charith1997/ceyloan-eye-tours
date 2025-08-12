import DetailCardGrid from "@/app/components/DetailCardGrid";
import Jumbotron from "@/components/molecules/Jumbotron";
import PageDetails from "@/components/organisams/PageDetails";
import { notFound } from "next/navigation";

const validHotelTypes = [
  "wild",
  "nature",
  "country-side",
  "galle-fort",
  "city",
];

const hotelPackages = [
  {
    title: "Tamaravila Wilpattu",
    imageUrl: "/family tours/Secrets of lanka.jpg",
    duration: "Wilpattu",
    price: "1500",
    slug: "tamaravila-wilpattu",
  },
  {
    title: "Wild Coast Tented Lodge",
    imageUrl: "/family tours/Wildlife.jpg",
    duration: "Yala",
    price: "1500",
    slug: "wild-coast-tented-lodge",
  },
  {
    title: "Back of Beyond - Dune Camp",
    imageUrl: "/family tours/Love Island.jpg",
    duration: "Yala",
    price: "1500",
    slug: "back-of-beyond-dune-camp",
  },
  {
    title: "Gaga Bees Yala",
    imageUrl: "/family tours/Soft Adventure.jpg",
    duration: "Thissamaharama",
    price: "1500",
    slug: "gaga-bees-yala",
  },
  {
    title: "The Elephant Corridor",
    imageUrl: "/family tours/Mini adventure.jpg",
    duration: "Sigiriya",
    price: "1500",
    slug: "the-elephant-corridor",
  },
];

interface PageProps {
  params: Promise<{ type: string }>;
}

export default async function HotelTypesPage({ params }: PageProps) {
  const { type } = await params;

  if (!validHotelTypes.includes(type)) {
    return notFound();
  }

  return (
    <section className="py-16 px-4 md:px-16">
      <Jumbotron
        title="In The Wild"
        description="Experience the beauty of wildlife."
        imageUrl="/round tours/Family Tour.jpg"
      />
      <PageDetails
        title="In The Wild"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum."
      />
      <div className="min-h-screen">
        <DetailCardGrid packages={hotelPackages} />
      </div>
    </section>
  );
}
