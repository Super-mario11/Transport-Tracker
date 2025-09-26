import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function useWebSocket(url) {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socketRef.current = io(url);

    socketRef.current.on("connect", () => setConnected(true));
    socketRef.current.on("vehicle:update", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    socketRef.current.on("disconnect", () => setConnected(false));

    return () => socketRef.current.disconnect();
  }, [url]);

  return { socket: socketRef.current, connected, messages };
}
