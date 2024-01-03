import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { MessageType } from "../components";
import { socket } from "../utils/socket";
import store from "../redux/store";
import { useLocation } from "react-router-dom";

const ChatPage = () => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  const username = store.getState().userName;

  useEffect(() => {
    socket.emit("new-user", username);
    socket.on("receive-message", (message) =>
      setMessages([...messages, message])
    );

    return () => {
      socket.emit("leave-chat", username);
    };
  }, []);

  const location = useLocation();

  const sendMessage = () => {
    if (username) {
      const message: MessageType = {
        fromUser: username,
        toUser: location.state.toUser,
        messageContent: input,
        sendTime: new Date(),
      };
      socket.emit("send-message", message);
    }
  };

  return (
    <Grid container>
      <Grid item>
        <TextField
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInput(event.target.value);
          }}
        />
        <Button onClick={sendMessage}>Send</Button>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default ChatPage;
