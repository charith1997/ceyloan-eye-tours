import DetailCard from "./DetailCard";

interface Package {
    title: string;
    imageUrl: string;
    duration: string;
    price: string;
    slug: string;
}

interface DetailCardGridProps {
    packages: Package[];
}

export default function DetailCardGrid({ packages }: DetailCardGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-8">
            {packages.map((tour, index) => (
                <DetailCard key={index} {...tour} />
            ))}
        </div>
    );
}
