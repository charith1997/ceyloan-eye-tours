import DetailCard from "./DetailCard";

const tourPackages = [
    {
        title: "Secrets of Lanka",
        imageUrl: "/family tours/Secrets of lanka.jpg",
        duration: "14 Days | 13 Nights",
        price: "1500",
        slug: "secrets-of-lanka",
    },
    {
        title: "Wildlife",
        imageUrl: "/family tours/Wildlife.jpg",
        duration: "3 Days | 2 Nights",
        price: "1500",
        slug: "wildlife",
    },
    {
        title: "Love Island",
        imageUrl: "/family tours/Love Island.jpg",
        duration: "3 Days | 2 Nights",
        price: "1500",
        slug: "love-island"
    },
    {
        title: "Soft Adventure",
        imageUrl: "/family tours/Soft Adventure.jpg",
        duration: "14 Days | 13 Nights",
        price: "1500",
        slug: "soft-adventure"
    },
    {
        title: "Mini adventure",
        imageUrl: "/family tours/Mini adventure.jpg",
        duration: "3 Days | 2 Nights",
        price: "1500",
        slug: "mini-adventure"
    },
    {
        title: "Down south",
        imageUrl: "/family tours/Down south.jpg",
        duration: "3 Days | 2 Nights",
        price: "1500",
        slug: "down-south"
    },
    {
        title: "Bird watching",
        imageUrl: "/family tours/Bird watching.jpg",
        duration: "3 Days | 2 Nights",
        price: "1500",
        slug: "bird-watching"
    },
];

export default function DetailCardGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-8">
            {tourPackages.map((tour, index) => (
                <DetailCard key={index} {...tour} />
            ))}
        </div>
    );
}
