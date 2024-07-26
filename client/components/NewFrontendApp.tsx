"use client"
import React, { FormEventHandler, useEffect, useRef, useState } from 'react'

const NewFrontendApp = () => {
    const [step, setStep] = useState('landing')
    const [msg, setMsg] = useState('')
    const [messages, setMessages] = useState<string[]>(["Mayank: Hi","yash"])
    const ws = useRef<WebSocket | null>(null)
    const [roomId, setRoomId] = useState('')
    const [name, setName] = useState('')

    useEffect(()=>{
        if(step == 'chat'){
            ws.current = new WebSocket("ws://localhost:8080")

            ws.current.onopen = () => {
                console.log("Coonected to Websocket");
                if(roomId){
                    ws.current?.send(JSON.stringify({type:"join-room", name, roomId}))
                }
            }

            ws.current.onmessage = (message)=>{
                const data = JSON.parse(message.data)
                console.log(data);
                
                if(data.type == 'chat'){
                    setMessages(prev => [...prev, `${data.name}: ${data.message}`])
                }else if(data.type === 'room-created'){
                    setRoomId(data.roomId)
                    console.log("connected to room "+data.roomId);
                }else if(data.type == 'room-joined'){
                    console.log("connected to room "+roomId);
                }else if(data.type == 'error'){
                    alert(data.message)
                    setStep('landing')
                }
            }

            ws.current.onclose = () => {
                console.log("disconnected from ws");
            }
            return () => {
               if(ws.current) ws.current.close()
            }
        }

    },[step,name,roomId])

    const createRoom =  ()=>{
        ws.current = new WebSocket("ws://localhost:8080")
        ws.current.onopen = () => {
            ws.current?.send(JSON.stringify({
                type:"create-room",
                name:name
            }))
        }
        ws.current.onmessage = (message) => {
            const data = JSON.parse(message.data)
            if(data.type = 'room-created'){
                setRoomId(data.roomId)
                setStep('chat')
            }
        }
    }

    const joinRoom:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        setStep('chat')
    }

    const sendMessage = ()=>{
        if(ws.current && ws.current.readyState === WebSocket.OPEN){
            ws.current.send(JSON.stringify({
                type:'chat',
                message:msg
            }))
            setMsg('')
            console.log("Messages sendimg");
            
        }
    }


    if(step == 'landing'){
        return (
            <div className='h-screen grid place-items-center bg-gray-700 text-white p-5'>
                <h1 className='text-2xl font-bold'>The Chat App</h1>
                <div className='grid grid-cols-3'>
                    <div className='flex flex-col gap-4'>
                       <div>Create Room</div>
                       <div>
                           <input type="text" onChange={(e)=> setName(e.target.value)} placeholder="Name" required
                           className='p-2 bg-transparent border-b mb-3'
                           />
                           <button onClick={createRoom}
                           className='block px-3 text-center bg-gray-900 py-2 rounded-xl'
                           >Create</button>
                       </div>
                    </div>
                    <div className='flex justify-center'>
                        <div className='h-full border-r'></div>
                    </div>
                    <div>
                        <div>Join Room</div>
                        <form onSubmit={joinRoom}>
                            <input type="text" name="name" id="name" onChange={(e)=> setName(e.target.value)}  required placeholder="Name"
                            className='p-2 bg-transparent border-b mb-3'
                            />
                            <input type="text" name="roomId" id="roomId" onChange={(e)=> setRoomId(e.target.value)} required placeholder="Room Id"
                            className='block p-2 bg-transparent border-b mb-3'
                            />
                            <button type='submit'
                            className='px-3 text-center bg-gray-900 py-2 rounded-xl'
                            >Join</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div>
        <div>Chat Room {roomId}</div>
        <div>
            {messages.map((msg, index)=>{
                return (
                    <div key={index}>
                        {msg}
                    </div>
                )
            })}
        </div>
        <div>
            <input type="text" name="message" id="message" required 
                onChange={(e)=> setMsg(e.target.value)}
                value={msg}
            />
            <button
                onClick={sendMessage}
            >Send</button>
        </div>
    </div>
  )
}

export default NewFrontendApp