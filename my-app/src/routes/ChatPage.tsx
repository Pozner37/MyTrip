import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { MessageType } from "../components";
import { socket } from "../utils/socket";
import store from "../redux/store";
import { useLocation } from "react-router-dom";
import { getChatFromDB } from "../utils/chatUtils";

const ChatPage = () => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const location = useLocation();
  const username = store.getState().userName;

  useEffect(() => {
    // fetch messages from db
    username && getChatFromDB({ firstUser: username, secondUser: location.state.toUser }).then(
      ({data: oldMessages}) => {
        return setMessages(oldMessages);
      }
    );

    // establish live updates from socket
    socket.emit("new-user", username);
    socket.on("receive-message", (message) =>
      setMessages([...messages, message])
    );
  }, []);

  const sendMessage = () => {
    if (username) {
      const message: MessageType = {
        fromUser: username,
        toUser: location.state.toUser,
        messageContent: input,
        sendTime: new Date(),
      };
      setMessages([...messages, message]);
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
      <Grid item>
        {messages?.map((message) => (
          <Typography>{`${message.fromUser}: ${message.messageContent}`}</Typography>
        ))}
      </Grid>
    </Grid>
  );
};

export default ChatPage;
