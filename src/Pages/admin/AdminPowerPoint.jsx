import React from 'react'
import AdminMenuBar from './AdminMenuBar'
import AdminPowerPointHolder from './AdminPowerPointHolder'

const AdminPowerPoint = () => {
  return (
    <>
       
      <AdminMenuBar/>
      <div className="w-screen min-h-screen bg-[url('../images/loadingBG.png')] bg-cover bg-center bg-no-repeat bg-fixed ">
        <AdminPowerPointHolder/>
      </div>
    </>
  )
}

export default AdminPowerPoint
