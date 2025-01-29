import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [messages, setMessage] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessage(prevMesages => [...prevMesages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if(messageInput.trim() !== "") {
      socket.emit("message", messageInput);
      setMessageInput("");
    }
  }

  return (
    <div>
      <h1>Simple Chat app</h1>
      <input
        type="text"
        value={messageInput}
        placeholder="Type your message"
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      {/* Render all the message */}
      <section>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </section>
    </div>
  );
}

export default App;
