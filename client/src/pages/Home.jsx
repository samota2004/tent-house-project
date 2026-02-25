import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const slides = ["/tent1.jpg", "/tent2.jpg", "/tent3.jpg"];

  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      {/* ================= HERO ================= */}
      <section
        className="min-h-screen flex items-center pt-28 px-4 sm:px-6
                   bg-white dark:bg-black
                   text-black dark:text-white"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Making Every Event <br />

              <span
                className="bg-gradient-to-r from-purple-600 to-pink-500
                           bg-clip-text text-transparent"
              >
                Grand & Memorable
              </span>
            </h1>

            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mb-8">
              Pragati Tent House शादी, पार्टी और corporate events के लिए
              premium tent, decoration, lighting और catering services देता है।
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link
                to="/gallery"
                className="px-6 sm:px-8 py-3 rounded-full text-white
                           bg-gradient-to-r from-purple-600 to-pink-500
                           hover:scale-105 transition shadow-lg"
              >
                View Gallery
              </Link>

              <Link
                to="/contact"
                className="px-6 sm:px-8 py-3 rounded-full
                           border-2 border-purple-600
                           text-purple-600 dark:text-white
                           hover:bg-purple-600 hover:text-white transition"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* SLIDER */}
          <div className="relative w-full">
            <div
              className="absolute inset-0
                          bg-gradient-to-r from-purple-600 to-pink-500
                          blur-3xl opacity-20 rounded-3xl"
            ></div>

            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={slides[current]}
                alt="Tent"
                className="w-full h-[260px] sm:h-[350px] md:h-[500px] object-cover duration-1000"
              />

              {/* Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2
                           bg-black/50 text-white p-2 rounded-full
                           hover:bg-purple-600"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           bg-black/50 text-white p-2 rounded-full
                           hover:bg-purple-600"
              >
                <ChevronRight size={20} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
                      i === current
                        ? "bg-purple-600 scale-110"
                        : "bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6
                   bg-gradient-to-br from-pink-200 via-purple-200 to-white
                   dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="text-purple-600">Pragati Tent House</span>
          </h2>

          <div className="w-24 h-1 bg-purple-600 mx-auto mt-4"></div>
        </div>

        <div
          className="max-w-5xl mx-auto
                     bg-white/90 dark:bg-gray-900
                     backdrop-blur-xl
                     rounded-3xl p-6 sm:p-12 shadow-xl
                     border dark:border-gray-800"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-10">
            <img
              src="/owner.jpg"
              alt="Owner"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full
                         border-4 border-purple-600"
            />

            <div className="text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                Tarachand Samota
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Founder & Creative Director
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Card 1 */}
                <div
                  className="p-5 rounded-xl
                             bg-gradient-to-br from-pink-100 to-purple-100
                             dark:bg-black
                             border border-purple-200 dark:border-gray-800
                             text-center"
                >
                  <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                    🏅 18+
                  </p>

                  <p className="text-sm text-gray-900 dark:text-gray-900">
                    Years Experience
                  </p>
                </div>

                {/* Card 2 */}
                <div
                  className="p-5 rounded-xl
                             bg-gradient-to-br from-pink-100 to-purple-100
                             dark:bg-black
                             border border-purple-200 dark:border-gray-800
                             text-center"
                >
                  <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                    🎉 2410+
                  </p>

                  <p className="text-sm text-gray-900 dark:text-gray-900">
                    Happy Events
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}