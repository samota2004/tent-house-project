import { Link } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
<footer
  className="bg-gradient-to-br from-pink-50 via-purple-50 to-white
             dark:bg-gradient-to-br dark:from-gray-950 dark:via-black dark:to-gray-900
             text-gray-700 dark:text-gray-400
             pt-16 border-t
             border-gray-300 dark:border-gray-800"
>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* LEFT */}
        <div>
          <h2 className="text-2xl font-bold text-pink-600 dark:text-purple-400 mb-4">
            Pragati Tent House
          </h2>

          <p className="text-sm leading-relaxed">
            Pragati Tent House शादी, पार्टी और corporate events के लिए
            premium tent & decoration services प्रदान करता है।
          </p>
        </div>


        {/* LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">

            {[
              { name: "Home", path: "/" },
              { name: "Gallery", path: "/gallery" },
              { name: "Services", path: "/services" },
              { name: "Contact", path: "/contact" },
            ].map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  className="block px-3 py-1 rounded-md
                             hover:bg-pink-200 dark:hover:bg-gray-800
                             hover:text-purple-600 dark:hover:text-purple-400
                             transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}

          </ul>
        </div>


        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Contact Info
          </h3>

          <ul className="space-y-3 text-sm">

            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-pink-500 dark:text-purple-400" />
              +91 9982478440
            </li>

            <li className="flex items-center gap-3">
              <FaEnvelope className="text-pink-500 dark:text-purple-400" />
              tarachandsamota946@gmail.com
            </li>

            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-pink-500 dark:text-purple-400" />
              Sikar, Rajasthan
            </li>

          </ul>
        </div>

      </div>


      {/* BOTTOM */}
      <div
        className="mt-12 py-4
                   bg-pink-200/50 dark:bg-gray-950
                   border-t border-gray-300 dark:border-gray-800
                   text-center text-sm text-gray-700 dark:text-gray-400"
      >
        © {new Date().getFullYear()} Pragati Tent House. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;