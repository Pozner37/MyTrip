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

  socket.on("receive-message", (message) => {
    if (message.fromUser === location.state.toUser) {
      message.sendTime = new Date(message.sendTime);
      console.log(`got new message from ${message.fromUser}`);
      setMessages([...messages, message]);
    }
  });

  useEffect(() => {
    // fetch messages from db
    username &&
      getChatFromDB({
        firstUser: username,
        secondUser: location.state.toUser,
      }).then(({ data: oldMessages }) => {
        oldMessages.forEach((msg) => (msg.sendTime = new Date(msg.sendTime)));
        return setMessages(
          oldMessages.sort((msg1, msg2) => msg1.sendTime - msg2.sendTime)
        );
      });

    // establish live updates from socket
    socket.emit("new-user", username);
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
        {messages?.map((message, index) => (
          <Typography key={index}>{`${message.sendTime.toLocaleString()} - ${
            message.fromUser
          }: ${message.messageContent}`}</Typography>
        ))}
      </Grid>
    </Grid>
  );
};

export default ChatPage;
