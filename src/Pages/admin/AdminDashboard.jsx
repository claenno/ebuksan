import React, { useState, useEffect } from "react";
import Upload from "./Upload";
import AdminMenuBar from "./AdminMenuBar";
import AdminVideoHolder from "./AdminVideoHolder";

const AdminDashboard = () => {
  return (
    <>
      <AdminMenuBar />
      <div className="w-screen min-h-screen bg-[url('../images/loadingBG.png')] bg-cover bg-center bg-no-repeat bg-fixed">
        <AdminVideoHolder />
      </div>
    </>
  );
};

export default AdminDashboard;
