import React from 'react'

const MessageBox = ({messages, className}:{
    messages: String[],
    className? : string
}) => {

  if(!messages.length){
    return (
        <div className={className+" italic text-gray-600 text-center justify-center"}>
            No Messages Yet . . .
        </div>
      )
  }

  return (
    <div className={className}>
        {messages.map(msg => (
            <div className='py-1'>
                <span className='text-green-400 font-semibold'>{msg.split(":")[0]}:</span>{msg.split(":")[1]}
            </div>
        ))}
    </div>
  )
}

export default MessageBox