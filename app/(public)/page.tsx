import React from "react";

const Page = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen text-white"
        style={{ backgroundImage: "url(/hero-bg.jpg)" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto h-full flex flex-col justify-center items-center text-center relative z-10">
          <h1 className="text-5xl font-bold">Book Your Futsal Game Today!</h1>
          <p className="mt-4 text-xl">
            Convenient, Affordable, and Easy Futsal Bookings
          </p>
          <div className="mt-8 space-x-4">
            <a
              href="#booking"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-lg"
            >
              Book Now
            </a>
            <a
              href="#pricing"
              className="bg-transparent border border-white hover:bg-white hover:text-black px-6 py-3 rounded-md text-lg"
            >
              View Pricing
            </a>
            <a
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-lg"
            >
              Login
            </a>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-white text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="text-lg mb-4">
            We provide a seamless platform for booking futsal games, with
            real-time availability and multiple venues to choose from.
          </p>
          <div className="flex justify-center mt-8 space-x-8">
            <div className="max-w-xs">
              <img
                src="/feature1.png"
                alt="Feature 1"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Online Booking</h3>
            </div>
            <div className="max-w-xs">
              <img
                src="/feature2.png"
                alt="Feature 2"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Real-Time Availability</h3>
            </div>
            <div className="max-w-xs">
              <img
                src="/feature3.png"
                alt="Feature 3"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Multiple Venues</h3>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-100 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <div className="flex justify-center space-x-8">
            <div className="max-w-xs">
              <img src="/step1.png" alt="Step 1" className="mx-auto mb-4" />
              <p className="text-lg">Choose a Venue</p>
            </div>
            <div className="max-w-xs">
              <img src="/step2.png" alt="Step 2" className="mx-auto mb-4" />
              <p className="text-lg">Select a Time Slot</p>
            </div>
            <div className="max-w-xs">
              <img src="/step3.png" alt="Step 3" className="mx-auto mb-4" />
              <p className="text-lg">Confirm Booking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Availability Section */}
      <section id="booking" className="py-16 bg-white text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Check Availability</h2>
          <p className="text-lg mb-4">
            Find the perfect time to play at your favorite venue.
          </p>
          <div className="mt-8">
            <input
              type="date"
              className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-xs mx-auto mb-4"
              placeholder="Select Date"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
              Check Availability
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-100 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Pricing</h2>
          <div className="flex justify-center space-x-8">
            <div className="max-w-xs bg-white p-6 rounded-md shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Standard</h3>
              <p className="text-2xl font-bold mb-4">$20 / Hour</p>
              <p className="text-gray-600 mb-4">Access to all futsal courts.</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
                Book Now
              </button>
            </div>
            <div className="max-w-xs bg-white p-6 rounded-md shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Premium</h3>
              <p className="text-2xl font-bold mb-4">$30 / Hour</p>
              <p className="text-gray-600 mb-4">Includes locker and parking.</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
          <div className="flex justify-center space-x-8">
            <div className="max-w-md">
              <p className="text-lg italic">
              &quot;Amazing experience! Booking was easy and the venue was
                top-notch.&quot;
              </p>
              <p className="mt-4 font-semibold">- John Doe</p>
            </div>
            <div className="max-w-md">
              <p className="text-lg italic">
              &quot;Great service and excellent facilities. Will definitely book
                again!&quot;
              </p>
              <p className="mt-4 font-semibold">- Jane Smith</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 bg-gray-100 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg mb-4">Have questions? We’re here to help.</p>
          <form className="max-w-lg mx-auto mt-8">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
            />
            <textarea
              placeholder="Your Message"
              className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
              rows={5}
            ></textarea>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 bg-blue-600 text-white text-center">
        <div className="container mx-auto">
          <p>&copy; 2024 Futsal Management. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="mx-2">
              Privacy Policy
            </a>
            <a href="#" className="mx-2">
              Terms of Service
            </a>
            <a href="#" className="mx-2">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
