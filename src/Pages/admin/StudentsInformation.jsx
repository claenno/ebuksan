import React, { useState, useEffect } from "react";
import supabase from "../../../supabase";

const StudentsInformation = () => {
  const [students, setStudents] = useState([]);
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("All");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [editForm, setEditForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    approved: false,
  });

  // Fetch students
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

  // Fetch schools
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const { data, error } = await supabase.from("schools").select("*");
        if (error) throw error;
        setSchools(data);
      } catch (error) {
        console.error("Error fetching schools:", error.message);
      }
    };
    fetchSchools();
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

  // Edit logic
  const handleEditClick = (student) => {
    setEditStudent(student);
    setEditForm({
      firstname: student.firstname,
      lastname: student.lastname,
      username: student.username,
      approved: student.approved,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSave = async () => {
    try {
      await supabase.from("users").update(editForm).eq("id", editStudent.id);

      setStudents(
        students.map((s) =>
          s.id === editStudent.id ? { ...s, ...editForm } : s
        )
      );
      setEditStudent(null);
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  // Filtering
  const filteredStudents =
    selectedSchool === "All"
      ? students
      : students.filter((s) => s.school === selectedSchool);

  return (
    <>
      <div className="pt-5 flex flex-col items-center gap-5">
        <div className="mb-4 flex gap-2 items-center">
          <label htmlFor="schoolFilter" className="text-white">
            Salain ayon sa Paaralan:
          </label>
          <select
            id="schoolFilter"
            className="rounded p-1"
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
          >
            <option value="All">Lahat</option>
            {schools.map((school) => (
              <option key={school.id} value={school.school_name}>
                {school.school_name}
              </option>
            ))}
          </select>
        </div>
        <table className="min-w-[800px] bg-[#90066a] text-white rounded">
          <thead>
            <tr>
              <th className="p-2">Pangalan</th>
              <th className="p-2">Username</th>
              <th className="p-2">Paaralan</th>
              <th className="p-2">Aprubado</th>
              <th className="p-2">Mga Gawain</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-t border-[#fff2]">
                <td className="p-2">
                  {student.firstname} {student.lastname}
                </td>
                <td className="p-2">{student.username}</td>
                <td className="p-2">{student.school}</td>
                <td className="p-2">{student.approved ? "Oo" : "Hindi"}</td>
                <td className="p-2 flex gap-2">
                  <button
                    className="bg-[#ffcc00] text-black rounded px-2 py-1"
                    onClick={() => handleToggleApproved(student)}
                  >
                    {student.approved ? "I-alis ang Pagpayag" : "Payagan"}
                  </button>
                  <button
                    className="bg-blue-500 rounded px-2 py-1"
                    onClick={() => handleEditClick(student)}
                  >
                    I-edit
                  </button>
                  <button
                    className="bg-[#e63363] rounded px-2 py-1"
                    onClick={() => handleDeleteClick(student.id)}
                  >
                    Burahin
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  Walang nahanap na estudyante.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#90066a] p-5 rounded-[5px] text-white">
            <p>Sigurado ka bang gusto mong burahin ang user na ito?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="w-14 h-[30px] bg-[#e63363] rounded-[5px] px-1"
                onClick={handleConfirmDelete}
              >
                Oo
              </button>
              <button
                className="w-14 h-[30px] bg-[#ffcc00] rounded-[5px] px-1"
                onClick={handleCancelDelete}
              >
                Hindi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
            <h2 className="text-lg font-bold mb-4 text-black">
              I-edit ang Estudyante
            </h2>
            <div className="flex flex-col gap-2">
              <input
                className="border rounded p-1"
                type="text"
                name="firstname"
                value={editForm.firstname}
                onChange={handleEditChange}
                placeholder="Pangalan"
              />
              <input
                className="border rounded p-1"
                type="text"
                name="lastname"
                value={editForm.lastname}
                onChange={handleEditChange}
                placeholder="Apelyido"
              />
              <input
                className="border rounded p-1"
                type="text"
                name="username"
                value={editForm.username}
                onChange={handleEditChange}
                placeholder="Username"
              />
              <label className="flex items-center gap-2 text-black">
                <input
                  type="checkbox"
                  name="approved"
                  checked={editForm.approved}
                  onChange={handleEditChange}
                />
                Aprubado
              </label>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-blue-500 text-white rounded px-3 py-1"
                onClick={handleEditSave}
              >
                I-save
              </button>
              <button
                className="bg-gray-300 rounded px-3 py-1"
                onClick={() => setEditStudent(null)}
              >
                Kanselahin
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentsInformation;
