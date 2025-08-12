import React from "react";
import HotelGrid from "./HotelGrid";
import Jumbotron from "@/components/molecules/Jumbotron";
import PageDetails from "@/components/organisams/PageDetails";

export default function Hotels() {
  return (
    <section className="py-16 px-4 md:px-16">
      <Jumbotron
        title="Accommodation"
        description="Discover our range of hotels."
        imageUrl="/hotels/Hotels Main.jpg"
      />
      <PageDetails
        title="Sri Lanka Tours"
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
      <HotelGrid />
    </section>
  );
}
