"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CreateRoom = () => {
    const [name, setName] = useState("Anonymus")
    const router = useRouter()
  return (
    <div className='flex flex-col gap-5 bg-gray-700 p-5 rounded-xl'>
        <h3 className='text-2xl'>Create Room</h3>
       <div>
         <input type="text" placeholder="Your Name" onChange={(e)=>{
            setName(e.target.value.split(" ").join("_"))
        }} className='bg-transparent border-b border-b-gray-600 px-2 py-1 outline-none'/>
        <button onClick={()=>{
          const roomId = Math.ceil(Math.random()*1000)+""
          router.push(`room/${roomId}/${name}`)
        }} className='bg-gray-900 px-4 py-3 rounded-xl ml-2'>+</button> 
       </div>
      </div>
  )
}

export default CreateRoom