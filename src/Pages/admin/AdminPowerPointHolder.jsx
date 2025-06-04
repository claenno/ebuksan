// Language: jsx
import React, { useState, useEffect } from "react";
import supabase from "../../../supabase";

const AdminPowerPointHolder = () => {
  const [powerPoints, setPowerPoints] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [powerPointToDelete, setPowerPointToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [pptToEdit, setPptToEdit] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editType, setEditType] = useState("");

  useEffect(() => {
    const fetchPowerPoints = async () => {
      try {
        const { data, error } = await supabase.from("powerpoints").select("*");
        if (error) throw error;
        setPowerPoints(data);
      } catch (error) {
        console.error("Error fetching powerpoints:", error.message);
      }
    };

    fetchPowerPoints();
  }, []);

  const handleDeleteClick = (ppt) => {
    setShowConfirmation(true);
    setPowerPointToDelete(ppt);
  };

  const handleConfirmDelete = async () => {
    if (powerPointToDelete) {
      try {
        const { error } = await supabase
          .from("powerpoints")
          .delete()
          .eq("id", powerPointToDelete.id);
        if (error) throw error;
        setPowerPoints(
          powerPoints.filter((ppt) => ppt.id !== powerPointToDelete.id)
        );
        setShowConfirmation(false);
        setPowerPointToDelete(null);
      } catch (error) {
        console.error("Error deleting powerpoint:", error.message);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setPowerPointToDelete(null);
  };

  const handleEditClick = (ppt) => {
    setPptToEdit(ppt);
    setEditTitle(ppt.ppt_title);
    setEditDescription(ppt.ppt_description);
    setEditType(ppt.ppt_type);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    if (!pptToEdit) return;
    try {
      const { error } = await supabase
        .from("powerpoints")
        .update({
          ppt_title: editTitle,
          ppt_description: editDescription,
          ppt_type: editType,
        })
        .eq("id", pptToEdit.id);
      if (error) throw error;
      // update the state
      setPowerPoints(
        powerPoints.map((ppt) =>
          ppt.id === pptToEdit.id
            ? {
                ...ppt,
                ppt_title: editTitle,
                ppt_description: editDescription,
                ppt_type: editType,
              }
            : ppt
        )
      );
      setShowEditModal(false);
      setPptToEdit(null);
    } catch (error) {
      console.error("Error updating powerpoint:", error.message);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setPptToEdit(null);
  };

  return (
    <>
      {powerPoints.map((ppt) => (
        <div key={ppt.id} className="pt-5 flex justify-center items-center">
          <div className="w-[617px] h-auto bg-[#90066a] rounded-[5px] flex">
            <div className="w-[80%] h-auto flex items-center py-2 px-3">
              <div className="flex w-[80%] items-center gap-3">
                <div className="flex flex-col gap-1 justify-start text-white">
                  <p className="text-[24px]">
                    <b>Title:</b> {ppt.ppt_title}
                  </p>
                  <hr />
                  <p>
                    <b>Description:</b> {ppt.ppt_description}
                  </p>
                  <hr />
                  <p>
                    <b>Type:</b> {ppt.ppt_type}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[20%] h-auto flex flex-col justify-between p-5 text-white">
              <button
                className="w-auto h-[40px] bg-[#ffcc00] rounded-[5px] p-1"
                onClick={() => handleEditClick(ppt)}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(ppt)}
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
            <h3 className="text-lg font-bold mb-4 text-white">
              Edit PowerPoint
            </h3>
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
                onClick={handleUpdate}
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

export default AdminPowerPointHolder;
