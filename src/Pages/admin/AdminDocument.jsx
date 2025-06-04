import React from 'react'
import AdminMenuBar from './AdminMenuBar'
import AdminDocumentHolder from './AdminDocumentHolder'

const AdminDocument = () => {
  return (
    <>
       
      <AdminMenuBar/>
      <div className="w-screen min-h-screen bg-[url('../images/loadingBG.png')] bg-cover bg-center bg-no-repeat bg-fixed ">
      <AdminDocumentHolder/>
      </div>
    </>
  )
}

export default AdminDocument
