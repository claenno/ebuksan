import React, { useState, useEffect } from "react";
import supabase from "../../../supabase"; // Ensure correct Supabase import

const Upload = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [lessonTitle, setLessonTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailurl, setThumbnailurl] = useState("");

  // Cleanup old file previews
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileType(selectedFile.type);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setFileType(droppedFile.type);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!file || !lessonTitle || !description) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // **Check if file already exists and overwrite**
      const filePath = `public/${file.name}`;
      const { data: existingFile, error: existingError } =
        await supabase.storage
          .from("videos")
          .list("public", { search: file.name });

      if (existingFile?.length > 0) {
        await supabase.storage.from("videos").remove([filePath]); // Delete existing file
      }

      // **Upload file to Supabase Storage**
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("videos")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // **Get Public URL**
      const { data } = supabase.storage.from("videos").getPublicUrl(filePath);
      const publicURL = data.publicUrl;

      // **Insert video details into Supabase Database**
      const { error } = await supabase.from("videos").insert([
        {
          video_name: lessonTitle,
          video_description: description,
          video_url: publicURL,
          video_thumbnail: thumbnailurl || publicURL, // Use video as thumbnail if none provided
        },
      ]);

      if (error) throw error;

      alert("Video uploaded successfully 🎉");
      onClose(); // Close modal after upload
    } catch (error) {
      console.error("Error uploading video:", error.message);
      alert("Failed to upload video ❌");
    }
  };

  return (
    <div className="w-[670px] h-auto bg-[#fe6462] rounded-[5px] p-6">
      <div className="flex justify-center space-x-4 mb-6 font-semibold">
        <p>Videos</p>
      </div>
      <p className="font-bold text-black text-lg mb-6">Add a new Lesson</p>
      <div className="flex flex-col md:flex-row gap-5">
        <div
          className="flex-1 mx-auto relative border-2 border-gray-300 border-dashed rounded-lg p-6"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
            onChange={handleFileChange}
            accept="video/*"
          />
          {!file && (
            <div className="text-center">
              <img
                className="mx-auto h-12 w-12"
                src="https://www.svgrepo.com/show/357902/image-upload.svg"
                alt="Upload"
              />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer"
                >
                  <span>Drag and drop</span>
                  <span className="text-indigo-600"> or browse</span>
                  <span> to upload</span>
                </label>
              </h3>
              <p className="mt-1 text-xs text-gray-500">Videos</p>
            </div>
          )}
          {file && (
            <div className="mt-4 mx-auto max-h-40">
              {fileType.startsWith("video/") ? (
                <video controls className="w-full">
                  <source src={preview} type={fileType} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-900 break-words">{preview}</p>
                  <p className="text-xs text-gray-500">{fileType}</p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex-1">
          <input
            className="w-full h-11 bg-white rounded-[5px] border border-black mb-4 px-3"
            type="text"
            placeholder="Lesson Title"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
          />
          <textarea
            className="w-full min-h-[142px] bg-white rounded-[5px] border border-black px-3 py-2 align-top resize-y"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="w-full h-11 bg-white rounded-[5px] border border-black mt-4 px-3"
            type="text"
            placeholder="Thumbnail URL"
            value={thumbnailurl}
            onChange={(e) => setThumbnailurl(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="items-center justify-center flex"></div>
        <div className="flex gap-16 pt-5">
          <button
            className="w-[106px] h-[42px] bg-white rounded-[5px] border border-black"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="w-[106px] h-[42px] bg-[#81c548] rounded-[5px] border border-black"
            onClick={handleUpload}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
