import React from 'react'
import Navbar from './Navbar'
import MyPosts from './MyPosts'
import AllPosts from './AllPosts'

const User = () => {
  return (
    <div >
      <Navbar/>
      <div className='flex w-full'>
        <MyPosts/>
        <AllPosts/>
        
      </div>
    </div>
  )
}

export default User