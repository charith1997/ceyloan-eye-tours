import { Facebook, Instagram, Mail, Phone, Globe } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1E1E1E]/80 text-white py-12 px-6 md:px-16">
      <div className="max-w-[1200px] mx-auto gap-10 flex flex-col md:flex-row md:justify-between">
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
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-orange-500 transition-colors duration-200"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-orange-500 transition-colors duration-200"
            >
              <Instagram size={20} />
            </a>
            <a
              href="mailto:jwingtours@gmail.com"
              aria-label="Email"
              className="hover:text-orange-500 transition-colors duration-200"
            >
              <Mail size={20} />
            </a>
            <a
              href="tel:+94763939000"
              aria-label="Phone"
              className="hover:text-orange-500 transition-colors duration-200"
            >
              <Phone size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link
                href="/about-us"
                className="hover:text-orange-500 transition-colors duration-200"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/reviews"
                className="hover:text-orange-500 transition-colors duration-200"
              >
                Reviews
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                className="hover:text-orange-500 transition-colors duration-200"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-orange-500 transition-colors duration-200"
              >
                Privacy & Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <Globe
                size={16}
                className="mt-0.5 flex-shrink-0 text-orange-500"
              />
              <span>No 5/5 Negombo Road, Dankotuwa</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="flex-shrink-0 text-orange-500" />
              <a
                href="tel:+94763939000"
                className="hover:text-orange-500 transition-colors duration-200"
              >
                +94 76 393 9000
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="flex-shrink-0 text-orange-500" />
              <a
                href="mailto:jwingtours@gmail.com"
                className="hover:text-orange-500 transition-colors duration-200"
              >
                jwingtours@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Globe size={16} className="flex-shrink-0 text-orange-500" />
              <a
                href="https://www.jwingtours.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition-colors duration-200"
              >
                www.jwingtours.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
