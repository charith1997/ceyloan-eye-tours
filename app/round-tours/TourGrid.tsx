import Card from "../components/Card";

const tours = [
    { title: 'FAMILY', count: 5, imageUrl: '/round tours/Family Tours.jpg', slug: 'family' },
    { title: 'ADVENTURE', count: 6, imageUrl: '/round tours/Adventure Tours.jpg', slug: 'adventure' },
    { title: 'ROMANTIC', count: 7, imageUrl: '/round tours/Romantic Tours.jpg', slug: 'romantic' },
    { title: 'CULTURAL', count: 5, imageUrl: '/round tours/Cultural Tours.jpg', slug: 'cultural' },
    { title: 'AYURVEDA', count: 6, imageUrl: '/round tours/Ayurveda Tours.jpg', slug: 'ayurveda' },
    { title: 'WILDLIFE', count: 7, imageUrl: '/round tours/Wildlife Tours.jpg', slug: 'wildlife' },
    { title: 'LUXURY', count: 6, imageUrl: '/round tours/Luxury Tours.jpg', slug: 'luxury' },
    { title: 'GENERAL', count: 7, imageUrl: '/round tours/General Tours.jpg', slug: 'general' },
];

const TourGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {tours.map((tour, index) => (
                <Card key={index} {...tour} description="Tours" isTitleHighlighted={true} parentRoute="round-tours" />
            ))}
        </div>
    );
};

export default TourGrid;