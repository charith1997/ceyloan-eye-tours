import Link from "next/link";

const CTAButton = () => (
    <div className="flex justify-center mt-6">
        <button className="bg-gradient-to-r from-red to-orange text-white font-semibold px-8 py-3 rounded-md shadow-lg hover:opacity-90 transition cursor-pointer">
            <Link href="/plan-your-trip">
                Plan Your Trip
            </Link>
        </button>
    </div>
);

export default CTAButton;