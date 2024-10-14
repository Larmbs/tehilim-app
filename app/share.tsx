import React from "react";
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

interface ShareModalProps {
  isOpen: boolean;                     // Modal open state
  onRequestClose: () => void;          // Function to close the modal
  currentUrl: string | null;           // URL to share
  perekNumber: number;                 // Chapter number for sharing
}

/**
 * A modal component for sharing the Tehilim chapter via social media.
 *
 * @param isOpen - Indicates if the modal is open.
 * @param onRequestClose - Function to call to close the modal.
 * @param currentUrl - The URL to share.
 * @param perekNumber - The chapter number being shared.
 */
const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onRequestClose,
  currentUrl,
  perekNumber,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
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
          onClick={onRequestClose}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200 ease-in-out"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ShareModal;
