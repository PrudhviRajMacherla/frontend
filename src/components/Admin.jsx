import React from 'react'
import Navbar from './Navbar'
import UserList from './UserList'
import AdminPosts from './AdminPosts'

const Admin = () => {
  return (
    <>
    <Navbar/>
    <div className='flex w-full'>
      <UserList />
      <AdminPosts/>
    </div>
    </>
  )
}

export default Admin