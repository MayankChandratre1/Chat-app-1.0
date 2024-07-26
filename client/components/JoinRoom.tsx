"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const JoinRoom = () => {
    const [roomId, setRoomId] = useState("")
    const [name, setName] = useState("Anonymus")
    const router = useRouter()
  return (
    <div className='flex flex-col gap-5 bg-gray-700 p-5 rounded-xl'>
        <h3 className='text-2xl'>Join Room</h3>
        <div className='flex flex-col gap-3'>
          <input type="text" placeholder="Room Id" onChange={(e)=>{
            setRoomId(e.target.value)
          }} className='bg-transparent border-b border-b-gray-600 px-2 py-1 outline-none' />
          <div>
          <input type="text" placeholder="Your Name" onChange={(e)=>{
            setName(e.target.value.split(" ").join("_"))
          }} className='bg-transparent border-b border-b-gray-600 px-2 py-1 outline-none'/>
          <button onClick={()=>{
                router.push(`room/${roomId}/${name}`)
          }} className='bg-gray-900 p-3 rounded-xl ml-2'>Join</button>
          </div>
        </div>
      </div>
  )
}

export default JoinRoom