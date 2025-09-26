import React from "react";
import Sidebar from "../components/UI/Sidebar";

export default function Contact() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <form className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
        />
        <textarea
          placeholder="Your Message"
          rows="4"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
