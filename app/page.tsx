"use client"; // Ensure client-side rendering

import React, { useState, useEffect } from "react";
import Modal from "react-modal"; // Import react-modal
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon,
} from "react-share";
import "./globals.css";

import "gematriya";
import gematriya from "gematriya";

import TextComponent, { Lang, getLangSymbol } from "./text"; // Import Lang and getLangSymbol

// Set the app element for accessibility (recommended by react-modal)
Modal.setAppElement("html"); // Make sure to set this to the root element of your app

const TehilimPage: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const number = Number(params.get("chapter") || "1") || 1;

  const [perekNumber, setPerekNumber] = useState<number>(number);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state
  const [currentUrl, setCurrentUrl] = useState<string | null>(null); // Current page URL
  const [lang, setLang] = useState<Lang>(Lang.Hebrew_English);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href); // Set the current URL only on the client side
    }
  }, []);

  const handleNextPerek = () => {
    setPerekNumber((prev) => (prev < 150 ? prev + 1 : 1)); // Ensure it loops back
  };

  const swapLang = () => {
    setLang((prevLang) => {
      if (prevLang === Lang.English) return Lang.Hebrew;
      if (prevLang === Lang.Hebrew) return Lang.Hebrew_English;
      return Lang.English;
    });
  };

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-r from-blue-100 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
        תהילים פרק {gematriya(perekNumber)}
      </h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Psalms Chapter {perekNumber}
      </h2>

      <button
        onClick={swapLang}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition duration-200 ease-in-out"
      >
        {getLangSymbol(lang)}
      </button>

      <TextComponent lang={lang} chapter={perekNumber} />

      <div className="flex mt-8 space-x-6">
        <button
          onClick={handleNextPerek}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition duration-200 ease-in-out"
        >
          Next Perek
        </button>

        <button
          onClick={openModal}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition duration-200 ease-in-out"
        >
          Share Perek
        </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Share Perek Modal"
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Share this Perek</h2>
          <div className="flex justify-center space-x-4 mb-6">
            {/* WhatsApp */}
            <WhatsappShareButton url={currentUrl || ""}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>

            {/* Facebook */}
            <FacebookShareButton
              url={currentUrl || ""}
              title={`Tehilim Perek ${perekNumber}`}
            >
              <FacebookIcon size={40} round />
            </FacebookShareButton>

            {/* Twitter */}
            <TwitterShareButton
              url={currentUrl || ""}
              title={`Tehilim Perek ${perekNumber}`}
            >
              <TwitterIcon size={40} round />
            </TwitterShareButton>

            {/* Telegram */}
            <TelegramShareButton
              url={currentUrl || ""}
              title={`Tehilim Perek ${perekNumber}`}
            >
              <TelegramIcon size={40} round />
            </TelegramShareButton>

            {/* Email */}
            <EmailShareButton
              url={currentUrl || ""}
              subject={`Tehilim Perek ${perekNumber}`}
              body={""}
            >
              <EmailIcon size={40} round />
            </EmailShareButton>
          </div>

          <button
            onClick={closeModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200 ease-in-out"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TehilimPage;
