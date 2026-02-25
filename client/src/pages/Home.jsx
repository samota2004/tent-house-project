import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {

  const slides = [
    "/tent1.jpg",
    "/tent2.jpg",
    "/tent3.jpg"
  ];

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
      <section className="min-h-screen flex items-center pt-24 px-6
                          bg-white dark:bg-black
                          text-black dark:text-white
                          transition-all duration-300">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Making Every Event <br />

              <span className="bg-gradient-to-r from-purple-600 to-pink-500
                               bg-clip-text text-transparent">
                Grand & Memorable
              </span>
            </h1>

            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              Pragati Tent House शादी, पार्टी और corporate events के लिए
              premium tent, decoration, lighting और catering services देता है।
            </p>

            <div className="flex gap-4">

              <Link
                to="/gallery"
                className="px-8 py-3 rounded-full text-white
                           bg-gradient-to-r from-purple-600 to-pink-500
                           hover:scale-105 transition shadow-lg"
              >
                View Gallery
              </Link>

              <Link
                to="/contact"
                className="px-8 py-3 rounded-full
                           border-2 border-purple-600
                           text-purple-600 dark:text-white
                           hover:bg-purple-600 hover:text-white transition"
              >
                Contact Us
              </Link>

            </div>
          </div>


          {/* SLIDER */}
          <div className="relative">

            <div className="absolute inset-0
                            bg-gradient-to-r from-purple-600 to-pink-500
                            blur-3xl opacity-20 rounded-3xl"></div>

            <div className="relative overflow-hidden rounded-3xl shadow-2xl">

              <img
                src={slides[current]}
                alt="Tent"
                className="w-full h-[600px] object-cover duration-1000"
              />

              {/* Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2
                           bg-black/50 text-white p-2 rounded-full
                           hover:bg-purple-600"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2
                           bg-black/50 text-white p-2 rounded-full
                           hover:bg-purple-600"
              >
                <ChevronRight size={22} />
              </button>


              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-3 h-3 rounded-full cursor-pointer ${
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
      <section className="py-28 px-6
           bg-gradient-to-br from-pink-200 via-purple-200 to-white
           dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black
           transition"> 

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold">
            <span className="text-purple-600">
              Pragati Tent House
            </span>
          </h2>

          <div className="w-24 h-1 bg-purple-600 mx-auto mt-4"></div>
        </div>


        <div className="max-w-5xl mx-auto
                        bg-white/90 dark:bg-gray-900
                        backdrop-blur-xl
                        rounded-3xl p-12 shadow-xl
                        border dark:border-gray-800">

          <div className="flex flex-col md:flex-row items-center gap-10">

            <img
              src="/owner.jpg"
              alt="Owner"
              className="w-40 h-40 rounded-full border-4 border-purple-600"
            />

            <div>

              <h3 className="text-2xl font-semibold mb-2">
                Tarachand Samota
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Founder & Creative Director
              </p>


              <div className="grid grid-cols-2 gap-6">

                <div className="p-6 rounded-xl
                bg-gradient-to-br from-pink-100 to-purple-100
                dark:bg-black
                border border-purple-200 dark:border-gray-800">

  <p className="text-3xl font-bold text-purple-600">
    🏅 18+
  </p>

  <p className="text-sm text-gray-700 dark:text-gray-900">
    Years Experience
  </p>
                </div>


                <div className="p-6 rounded-xl
                bg-gradient-to-br from-pink-100 to-purple-100
                dark:bg-black
                border border-purple-200 dark:border-gray-800">

                  <p className="text-3xl font-bold text-purple-600">🎉 2410+</p>
                  <p className="text-sm text-gray-700 dark:text-gray-900">Happy Events</p>
                </div>

              </div>

            </div>

          </div>
        </div>

      </section>

    </>
  );
}