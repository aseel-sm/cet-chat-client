import React, { useContext, useState, useEffect, useRef } from "react";
import { SocketContext } from "../context/socket";
// import Header from "../components/Header";
import styled from "styled-components";
import Message from "../components/Message";
import chatBg from "../images/chat-bg-10.png";
import Header from "../components/Header";
import { withCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 100%;
  background-color: #f0f5f9;
  box-sizing: border-box;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%;
`;
const ChatWrapper = styled.div`
  height: 90%;
  border: 1px solid #c9d6df;
  border-radius: 10px;
  background: url(${(props) => props.bg});
  margin: 5px 10px;
`;
const MessageWrapper = styled.div`
  height: 90%;

  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  padding: 10px 20px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ChatFooter = styled.div`
  display: flex;
  height: 10%;
  opacity: 1;
  padding: 5px;
  align-items: stretch;
`;

const SendBtn = styled.button`
  background-color: #369b40;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  width: fit-content;
  padding: 0px 10px;
  /* border-left: none;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px; */
  color: white;
  &:hover {
    background-color: #369b40cc;
  }
`;
const NewChatButton = styled.button`
  width: fit-content;
  border-radius: 10px;

  border: none;
  font-weight: 500;
  color: white;
  padding: ${(props) => {
    if (props.isConnected) return "0px 15px";
  }};
  background-color: ${(props) => (props.isConnected ? "#d9534f" : "#428bca")};
  /* border-right: none;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px; */
  &:hover {
    background-color: ${(props) =>
      props.isConnected ? "#d9534fd4" : "#428bcad4"};
  }
`;
const MessageInput = styled.input`
  flex: 1;
  background-color: white;
  border: 1px solid gray;
  border-radius: 10px;
  margin: 0px 10px;
`;

const StatusContainer = styled.div`
  text-align: center;
  font-weight: 600;
`;

const Chat = ({ cookies }) => {
  const socket = useContext(SocketContext);
  const [statusMessage, setStatusMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState("");
  const [roomId, setRoomId] = useState("");
  const [msgInput, setMsgInput] = useState("");
  const [inboxMessages, setInboxMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const messagesEndRef = useRef(null);

  const handleInput = (e) => {
    setMsgInput(e.target.value);
  };

  const navigate = useNavigate();
  // console.log("render", inboxMessages);
  useEffect(() => {
    const agreement = cookies.cookies.agreement_;
    if (agreement !== "accepted") {
      navigate("/");
    }
    // console.log("Cookies", cookies.agreement_);
  }, []);
  useEffect(() => {
    socket.on("wait", (data) => setStatusMessage(data.message));

    socket.on("user-count", (data) => {
      // console.log("Getting count:", data.length);
      setOnlineUsers(data.length);
    });
    socket.on("found", (data) => {
      setIsConnected(true);
      setIsConnecting(false);
      setStatusMessage(data.message);
      setRoomId(data.room);
    });
    socket.on("stranger-disconnected", (data) => {
      setStatusMessage(data.message);
      setIsConnected(false);
    });
    socket.on("create-message", (message) => {
      console.log(message);
      setInboxMessages([...inboxMessages, message]);
    });

    socket.on("stranger-typing", (data) => {
      console.log("Started typing");
      setStatusMessage("Stranger typing");
    });
    socket.on("stranger-not-typing", (data) => {
      setStatusMessage("");
    });
    scrollToBottom();
    return () => {
      socket.removeAllListeners();
    };
  }, [inboxMessages]);

  const handleNewChat = () => {
    if (isConnected) {
      socket.emit("chat-stopped-by-user");

      setIsConnected(false);
      setStatusMessage("You disconnected.");
    } else if (isConnecting) {
      setIsConnecting(false);
      setStatusMessage("You disconnected.");
      socket.emit("stopped-connecting");
    } else {
      setInboxMessages([]);

      socket.emit("new-chat");
      setIsConnecting(true);
    }
  };
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const typingTimeoutFn = () => {
    setIsTyping(false);
    socket.emit("not-typing", { roomId: roomId });
  };
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef();

  const onKeyDown = (e) => {
    // console.log(e);
    if (e.which === 13) {
      sendMessage();

      return;
    }
    if (isTyping === false) {
      setIsTyping(true);
      socket.emit("typing", { roomId: roomId });
      typingTimeout.current = setTimeout(typingTimeoutFn, 5000);
    } else {
      clearTimeout(typingTimeout.current);
      typingTimeout.current = setTimeout(typingTimeoutFn, 5000);
    }
  };

  const sendMessage = (params) => {
    if (msgInput !== "") {
      let data = {
        roomId: roomId,
        msg: msgInput,
        type: "outgoing",
      };

      setInboxMessages([...inboxMessages, data]);

      socket.emit("send-message", {
        roomId: roomId,
        msg: msgInput,
      });
      clearTimeout(typingTimeout.current);

      typingTimeoutFn();
      setMsgInput("");
      setStatusMessage("");
    }
  };
  return (
    <Container>
      {/* <div>Online:{onlineUsers}</div> */}
      <Header />

      <ChatContainer>
        <ChatWrapper bg={chatBg}>
          <MessageWrapper>
            {inboxMessages.map((data, i) => (
              <Message key={i} data={data} />
            ))}
            <div ref={messagesEndRef}></div>
          </MessageWrapper>
          <StatusContainer>{statusMessage}</StatusContainer>
        </ChatWrapper>

        <ChatFooter>
          <NewChatButton isConnected={isConnected} onClick={handleNewChat}>
            {isConnected
              ? "Stop"
              : isConnecting
              ? "Stop Connecting"
              : "New Chat"}
          </NewChatButton>
          <MessageInput
            disabled={!isConnected}
            type="text"
            onKeyDown={(e) => onKeyDown(e)}
            value={msgInput}
            onChange={(e) => handleInput(e)}
          />
          <SendBtn onClick={sendMessage} disabled={!isConnected}>
            Send
          </SendBtn>
        </ChatFooter>
      </ChatContainer>
    </Container>
  );
};

export default withCookies(Chat);
