import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, searchUser } from "../../Redux/Auth/Action";
import { createSingleChat, getAllChat } from "../../Redux/Chat/Action";
import { createNewMessage, getAllMessage } from "../../Redux/Message/Action";
import { useNavigate } from "react-router-dom";
import Picker from "emoji-picker-react";
import Profile from "./Profile";
import SimpleSnackbar from "./SimpleSnackbar";
import DropDown from "../DropDown/DropDown";
import CreateGroup from "../Group/CreateGroup";
import UserChat from "./UserChat";
import Message from "./Message";
import { BiCommentDetail } from "react-icons/bi";
import {
  BsThreeDotsVertical,
  BsFilter,
  BsMicFill,
  BsEmojiSmile,
  BsArrowLeft,
} from "react-icons/bs";
import { TbCircleDashed } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import "./Home.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const { auth, chat, message } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const [querys, setQuerys] = useState("");
  const [content, setContent] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const messageRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [open, setOpen] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [isCreateGroup, setIsCreateGroup] = useState(false);

  useEffect(() => {
    if (token) dispatch(currentUser(token));
  }, [token, auth.updatedUser, dispatch]);

  useEffect(() => {
    if (!auth.reqUser) navigate("/signup");
  }, [auth.reqUser, navigate]);

  useEffect(() => {
    connectWebSocket();
  }, []);

  const connectWebSocket = () => {
    const socket = new SockJS("https://localhost:5454/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      {
        Authorization: `Bearer ${token}`,
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      onConnect,
      onError
    );

    setStompClient(stompClient);
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  };

  const onConnect = () => {
    setConnected(true);
    console.log("WebSocket connected successfully.");
    // Subscribe to topics or perform other actions on connection
  };

  const onError = (error) => {
    console.error("WebSocket connection error: ", error);
    // Handle WebSocket connection error
  };

  // Other useEffect hooks and functions remain unchanged

  return (
    <div className="relative">
      {/* Your JSX content */}
    </div>
  );
};

export default HomePage;
