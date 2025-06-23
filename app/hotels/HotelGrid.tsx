import Card from "../components/Card";

const hotels = [
    { description: 'Wild', count: 5, imageUrl: '/hotels/Wild.jpg' },
    { description: 'Nature', count: 6, imageUrl: '/hotels/Nature.jpg' },
    { description: 'Country Side', count: 7, imageUrl: '/hotels/Country Side.jpg' },
    { description: 'Galle Fort', count: 5, imageUrl: '/hotels/Galle Fort.jpg' },
    { description: 'City', count: 6, imageUrl: '/hotels/City.jpg' },
];

const HotelGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {hotels.map((hotel, index) => (
                <Card key={index} {...hotel} title="In The" isTitleHighlighted={false} slug="wild" parentRoute="hotels" />
            ))}
        </div>
    );
};

export default HotelGrid;