import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserCard from "../UserCard";
import MsgDisplay from "./MsgDisplay";

const RightSide = () => {
  const auth = useSelector((state) => state.auth);
  const message = useSelector((state) => state.message);

  const dispatch = useDispatch();
  const { id } = useParams();

  const [user, setUser] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const newUser = message.users.find((user) => user._id === id);
    if (newUser) {
      setUser(newUser);
    }
  }, [id, message.users]);

  return (
    <>
      <div className="message_header">
        <UserCard user={user} />
      </div>
      <div className="chat_container">
        <div className="chat_display">
          <div className="chat_row other_message">
            <MsgDisplay user={user} />
          </div>
          <div className="chat_row you_message">
            <MsgDisplay user={auth.user} />
          </div>
        </div>
      </div>
      <form className="chat_input">
        <input
          type="text"
          placeholder="Tin nhắn..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="material-icons"
          disabled={text ? false : true}
        >
          send
        </button>
      </form>
    </>
  );
};

export default RightSide;
