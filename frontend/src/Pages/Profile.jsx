import React from 'react'
import { FaRegEdit } from "react-icons/fa";
function Profile() {
  return (
    <div className='w-screen h-screen'>
        <h1 className='text-center text-3xl'>Profile</h1>
        <div className='flex justify-center items-center w-15 h-15 mx-auto bg-gray-700 rounded-full text-2xl mt-3'>A</div>
        <div
        className='flex justify-center items-center gap-4'>
            <h2>Username</h2>
            <p>Ashish</p>
            <span><FaRegEdit /></span>
        </div>
    </div>
  )
}

export default Profile