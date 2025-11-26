import { Facebook, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1E1E1E]/80 text-white py-12 px-6 md:px-16">
      <div className="max-w-[1200px] mx-auto grid gap-10 md:grid-cols-4 grid-cols-1">
        <div>
          <h2 className="font-[Carattere] text-3xl text-white mb-4">
            Jwing Tours
          </h2>
          <p className="text-sm leading-relaxed text-gray-300 mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
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
              <a href="#">Menu</a>
            </li>
            <li>
              <a href="#">Features</a>
            </li>
            <li>
              <a href="#">News & Blogs</a>
            </li>
            <li>
              <a href="#">Help & Supports</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <a href="#">How we work</a>
            </li>
            <li>
              <a href="#">Terms of service</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>No 5/5 Negombo Road, Dankotuwa</li>
            <li>+94 76 393 9000</li>
            <li>ceyloneyetours@gmail.com</li>
            <li>www.jwingtours.com</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
