import React from "react";
import Upload from "./Upload";
import { useState } from "react";
import PowerPointUpload from "./PowerPointUpload";
import DocumentsUpload from "./DocumentsUpload";

const UploadButtons = ({ onClose }) => {
  const [showVideoUploadModal, setShowVideoUploadModal] = useState(false);
  const [showPowerpointUploadModal, setShowPowerpointUploadModal] =
    useState(false);
  const [showDocumentsUploadModal, setShowDocumentsUploadModal] =
    useState(false);
  return (
    <>
      <div>
        <h2 className="text-lg font-bold mb-4">Upload Options</h2>
        <div className="flex flex-col space-y-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => setShowVideoUploadModal(true)}
          >
            Upload Video
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={() => setShowPowerpointUploadModal(true)}
          >
            Upload PowerPoint
          </button>
          <button
            className="bg-purple-500 text-white py-2 px-4 rounded"
            onClick={() => setShowDocumentsUploadModal(true)}
          >
            Upload Document
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      {showVideoUploadModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="rounded-lg p-6 w-[700px] max-h-[90vh]">
            {/* Pass the current page and onClose function to the UploadButtons component */}
            <Upload onClose={() => setShowVideoUploadModal(false)} />{" "}
            {/* Use the UploadButtons component */}
          </div>
        </div>
      )}

      {showPowerpointUploadModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="rounded-lg p-6 w-[700px] max-h-[90vh]">
            {/* Pass the current page and onClose function to the UploadButtons component */}
            <PowerPointUpload
              onClose={() => setShowPowerpointUploadModal(false)}
            />{" "}
            {/* Use the UploadButtons component */}
          </div>
        </div>
      )}

      {showDocumentsUploadModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="rounded-lg p-6 w-[700px] max-h-[90vh]">
            {/* Pass the current page and onClose function to the UploadButtons component */}
            <DocumentsUpload
              onClose={() => setShowDocumentsUploadModal(false)}
            />{" "}
            {/* Use the UploadButtons component */}
          </div>
        </div>
      )}
    </>
  );
};

export default UploadButtons;
