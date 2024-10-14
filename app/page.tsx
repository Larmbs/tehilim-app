"use client"; // Ensure client-side rendering
import React, { useState, useEffect } from "react";
import ShareModal from "./share"; // Import your new ShareModal component
import gematriya from "gematriya";
import "./globals.css";
import TextComponent, { Lang, getLangSymbol } from "./text"; // Adjust import based on your structure

const TehilimPage: React.FC = () => {
  const [perekNumber, setPerekNumber] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state
  const [currentUrl, setCurrentUrl] = useState<string | null>(null); // Current page URL
  const [lang, setLang] = useState<Lang>(Lang.Hebrew_English);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href); // Set the current URL only on the client side
    }
  }, []);

  const handleNextPerek = () => {
    setPerekNumber((prev) => (prev + 1) % 151);
  };

  const swapLang = () => {
    if (lang === Lang.English) {
      setLang(Lang.Hebrew);
    } else if (lang === Lang.Hebrew) {
      setLang(Lang.Hebrew_English);
    } else {
      setLang(Lang.English);
    }
  };

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        תהילים פרק {gematriya(perekNumber)}
      </h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Psalms Chapter {perekNumber}
      </h2>

      <button
        onClick={swapLang}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        {getLangSymbol(lang)}
      </button>
      <TextComponent lang={lang} chapter={perekNumber} />
      <div className="flex mt-6 space-x-4">
        <button
          onClick={handleNextPerek}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Next Perek
        </button>

        <button
          onClick={openModal}
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
        >
          Share Perek
        </button>
      </div>

      {/* Use the ShareModal component here */}
      <ShareModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        currentUrl={currentUrl}
        perekNumber={perekNumber}
      />
    </div>
  );
};

export default TehilimPage;
