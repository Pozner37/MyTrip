import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { MessageType } from "../components";
import { socket } from "../utils/socket";
import store from "../redux/store";
import { useLocation } from "react-router-dom";
import { getChatFromDB } from "../utils/chatUtils";
import {
  Send
} from "@mui/icons-material";

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
    setInput('');
  };

  return (
    <Grid container direction={"column"} alignContent={'center'}>
      <Grid item>
        <Typography variant="h4" textAlign={'center'}>{location.state.toUser}</Typography>
      </Grid>
      <Grid item sx={{maxHeight: '37em', overflowY: 'scroll'}} width={'30%'}>
        {messages?.map((message, index) => (
          <Card>
            <Typography key={index}>{`${message.sendTime.toLocaleString()} - ${
              message.fromUser
            }: ${message.messageContent}`}</Typography>
          </Card>
        ))}
      </Grid>
      <Grid item>
        <TextField
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInput(event.target.value);
          }}
          value={input}
          fullWidth
          onKeyDown={(e) => {
            if(e.key === 'Enter'){
              sendMessage();
           }
          }}
          InputProps={{endAdornment: <Button onClick={sendMessage}><Send/></Button>}}
        />
      </Grid>
    </Grid>
  );
};

export default ChatPage;
