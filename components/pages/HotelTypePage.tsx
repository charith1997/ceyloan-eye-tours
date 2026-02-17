"use client";

import Jumbotron from "../molecules/Jumbotron";
import PageDetails from "../organisams/PageDetails";
import DetailCardGrid from "@/components/organisams/DetailCardGrid";
import PageContainer from "../containers/PageContainer";
import { HotelCardContent } from "./HotelsPage";

interface HotelTypePageProps {
  heroTitle: string;
  heroDescription: string;
  hotels: any[];
  description: string;
  imageUrl: string;
  title: string;
}

const HotelTypePage = ({
  heroTitle,
  heroDescription,
  hotels,
  description,
  imageUrl,
  title,
}: HotelTypePageProps) => {
  return (
    <PageContainer>
      <Jumbotron
        title={heroTitle}
        description={heroDescription}
        imageUrl={imageUrl}
      />
      <PageDetails title={title} description={description} />
      <div>
        <DetailCardGrid data={hotels}>
          {(item: any) => <HotelCardContent item={item} />}
        </DetailCardGrid>
      </div>
    </PageContainer>
  );
};

export default HotelTypePage;
