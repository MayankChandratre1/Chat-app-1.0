"use client";

import useSocket from "@/hooks/useSocket";
import React, { useEffect, useState } from "react";
import MessageBox from "./MessageBox";

const InputBox = ({ roomId, name }: { roomId: string; name: string }) => {
  const socket = useSocket(roomId, name);
  const [inputMessage, setInputMessage] = useState("");
  const [Messages, setMessages] = useState<String[]>([]);

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (message) => {
      setMessages((prev) => [...prev, message.data]);
    };
  }, [socket]);

  if (!socket) {
    return (
      <div className="h-screen bg-gray-800 grid place-items-center text-white font-bold text-3xl ">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col gap-3 text-white py-5 px-12 relative">
      <div>Room ID: {roomId}</div>

      <MessageBox
        messages={Messages}
        className="flex-1 flex flex-col justify-end"
      />

      <div className="w-full grid grid-cols-8 gap-2">
        <input
          type="text"
          placeholder="Type here..."
          className="col-span-7 px-3 py-2 bg-gray-600 rounded-md outline-none"
          value={inputMessage}
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
        />
        <button
          className="bg-gray-900 rounded-md px-3 py-2"
          onClick={() => {
            socket?.send(name + ":" + inputMessage);
            setInputMessage("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default InputBox;
