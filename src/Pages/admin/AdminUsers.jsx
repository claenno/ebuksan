import React from 'react'
import AdminMenuBar from './AdminMenuBar'
import AdminDocumentHolder from './AdminDocumentHolder'
import StudentsInformation from "./StudentsInformation.jsx";

const AdminDocument = () => {
  return (
    <>
       
      <AdminMenuBar/>
      <div className="w-screen min-h-screen bg-[url('../images/loadingBG.png')] bg-cover bg-center bg-no-repeat bg-fixed ">

        <StudentsInformation
        />

      </div>
    </>
  )
}

export default AdminDocument
