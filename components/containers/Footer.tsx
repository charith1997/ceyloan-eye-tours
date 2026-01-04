import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1E1E1E]/80 text-white py-12 px-6 md:px-16">
      <div className="max-w-[1200px] mx-auto  gap-10 flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col max-w-sm">
          <h2 className="font-[Carattere] text-3xl text-white mb-4">
            Jwing Tours
          </h2>
          <p className="text-sm leading-relaxed text-gray-300 mb-4">
            Your gateway to extraordinary adventures and unforgettable journeys.
            We specialize in curating travel experiences that ignite passion,
            explore the unseen, and create stories worth telling—every step of
            the way.
          </p>
          <div className="flex space-x-4 mt-4 text-white">
            <a href="#" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="YouTube">
              <Mail size={20} />
            </a>
            <a href="#" aria-label="Twitter">
              <Phone size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/reviews">Reviews</Link>
            </li>
            <li>
              <Link href="/gallery">Gallery</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy & Policy</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>No 5/5 Negombo Road, Dankotuwa</li>
            <li>+94 76 393 9000</li>
            <li>jwingtours@gmail.com</li>
            <li>www.jwingtours.com</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
