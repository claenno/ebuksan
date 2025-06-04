// Language: jsx
import React, { useState, useEffect } from "react";
import supabase from "../../../supabase";

const StudentsInformation = () => {
  const [students, setStudents] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase.from("users").select("*");
        if (error) throw error;
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteClick = (id) => {
    setStudentIdToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await supabase.from("users").delete().eq("id", studentIdToDelete);
      setStudents(students.filter((s) => s.id !== studentIdToDelete));
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleToggleApproved = async (student) => {
    try {
      const newApproved = !student.approved;
      await supabase
        .from("users")
        .update({ approved: newApproved })
        .eq("id", student.id);

      setStudents(
        students.map((s) =>
          s.id === student.id ? { ...s, approved: newApproved } : s
        )
      );
    } catch (error) {
      console.error("Error toggling approval:", error.message);
    }
  };

  return (
    <>
      <div className="pt-5 flex flex-col justify-center items-center gap-5">
        {students.map((student) => (
          <div
            key={student.id}
            className="w-[617px] h-[118px] bg-[#90066a] rounded-[5px] flex"
          >
            <div className="w-[80%] h-auto flex items-center pl-3">
              <div className="flex w-[80%] items-center gap-3">
                <div className="flex flex-col gap-1 justify-start text-white">
                  <h4>
                    Name: {student.firstname} {student.lastname}
                  </h4>
                  <p>Username: {student.username}</p>
                  <p>Approved: {student.approved ? "Yes" : "No"}</p>
                </div>
              </div>
            </div>
            <div className="w-[20%] h-auto flex flex-col justify-between p-5 gap-2 text-white">
              <button
                className="w-auto h-[40px] bg-[#ffcc00] rounded-[5px] p-1"
                onClick={() => handleToggleApproved(student)}
              >
                {student.approved ? "Unaccept" : "Accept"}
              </button>
              <button
                onClick={() => handleDeleteClick(student.id)}
                className="w-auto h-[40px] bg-[#e63363] rounded-[5px] px-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#90066a] p-5 rounded-[5px] text-white">
            <p>Are you sure you want to delete this user?</p>
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
    </>
  );
};

export default StudentsInformation;
