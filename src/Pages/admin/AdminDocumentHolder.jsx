// Language: jsx
import React, { useState, useEffect } from "react";
import supabase from "../../../supabase";

const AdminDocumentHolder = () => {
  const [documents, setDocuments] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [docToEdit, setDocToEdit] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editType, setEditType] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const { data, error } = await supabase.from("documents").select("*");
        if (error) throw error;
        setDocuments(data);
      } catch (error) {
        console.error("Error fetching documents:", error.message);
      }
    };

    fetchDocuments();
  }, []);

  const handleDeleteClick = (doc) => {
    setShowConfirmation(true);
    setDocToDelete(doc);
  };

  const handleConfirmDelete = async () => {
    if (docToDelete) {
      try {
        const { error } = await supabase
          .from("documents")
          .delete()
          .eq("id", docToDelete.id);
        if (error) throw error;
        setDocuments(documents.filter((d) => d.id !== docToDelete.id));
        setShowConfirmation(false);
        setDocToDelete(null);
      } catch (error) {
        console.error("Error deleting document:", error.message);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setDocToDelete(null);
  };

  const handleEditClick = (doc) => {
    setDocToEdit(doc);
    setEditTitle(doc.docs_title);
    setEditDescription(doc.docs_description);
    setEditType(doc.docs_type);
    setShowEditModal(true);
  };

  const handleUpdateDocument = async () => {
    if (!docToEdit) return;
    try {
      const { error } = await supabase
        .from("documents")
        .update({
          docs_title: editTitle,
          docs_description: editDescription,
          docs_type: editType,
        })
        .eq("id", docToEdit.id);
      if (error) throw error;
      setDocuments(
        documents.map((d) =>
          d.id === docToEdit.id
            ? {
                ...d,
                docs_title: editTitle,
                docs_description: editDescription,
                docs_type: editType,
              }
            : d
        )
      );
      setShowEditModal(false);
      setDocToEdit(null);
    } catch (error) {
      console.error("Error updating document:", error.message);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setDocToEdit(null);
  };

  return (
    <>
      {documents.map((doc) => (
        <div key={doc.id} className="p-5 flex justify-center items-center">
          <div className="w-[617px] h-auto bg-[#90066a] rounded-[5px] flex">
            <div className="w-[80%] h-auto flex items-center py-2 px-3">
              <div className="flex w-[80%] items-center gap-2">
                <div className="flex flex-col gap-1 justify-start text-white">
                  <p className="text-[24px]">
                    <b>Title:</b> {doc.docs_title}
                  </p>
                  <hr />
                  <p>
                    <b>Description:</b> {doc.docs_description}
                  </p>
                  <hr />
                  <p>
                    <b>Type:</b> {doc.docs_type}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[20%] h-auto flex flex-col justify-between p-5 text-white">
              <button
                className="w-auto h-[40px] bg-[#ffcc00] rounded-[5px] p-1"
                onClick={() => handleEditClick(doc)}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(doc)}
                className="w-auto h-[40px] bg-[#e63363] rounded-[5px] px-1"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#90066a] p-5 rounded-[5px] text-white">
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="w-14 h-[30px] bg-[#e63363] rounded-[5px] px-1"
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
              <button
                className="w-14 h-[30px] bg-[#ffcc00] rounded-[5px] px-1"
                onClick={handleCancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#90066a] p-5 rounded-[5px] text-black w-[400px]">
            <h3 className="text-lg font-bold mb-4 text-white">Edit Document</h3>
            <div className="mb-3">
              <label className="block mb-1 text-white">Title:</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full p-1 rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 text-white">Description:</label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full p-1 rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 text-white">Type:</label>
              <input
                type="text"
                value={editType}
                onChange={(e) => setEditType(e.target.value)}
                className="w-full p-1 rounded"
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="w-auto h-[30px] bg-[#81c548] rounded-[5px] p-1 text-white"
                onClick={handleUpdateDocument}
              >
                Save
              </button>
              <button
                className="w-auto h-[30px] bg-[#e63363] rounded-[5px] p-1 text-white"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDocumentHolder;
