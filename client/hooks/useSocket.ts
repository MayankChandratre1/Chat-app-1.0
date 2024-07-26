import { useEffect, useState } from "react";

const useSocket = (roomId: string, name: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket(`ws://localhost:8080/${roomId}/${name}`);
    newSocket.onopen = () => {
      setSocket(newSocket);
    };
    newSocket.onerror = (err) => {
      console.log(err);
      newSocket.close();
    };
  }, []);

  return socket;
};

export default useSocket;
