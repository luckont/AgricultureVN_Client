import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { POSTTYPES } from "./redux/actions/postAction";
import { GLOBALTYPES } from "./redux/actions/globalTyles";
import { NOTIFY_TYPES } from "./redux/actions/notifyAction";

const spawnNotification = (body, icon, url, title) => {
  let options = {
    body,
    icon,
  };
  let n = new Notification(title, options);

  n.onclick = (e) => {
    e.preventDefault();
    window.open(url, "_blank");
  };
};

const SocketClient = () => {
  const auth = useSelector((state) => state.auth);
  const socket = useSelector((state) => state.socket);
  const notify = useSelector((state) => state.notifyUser);

  const dispatch = useDispatch();

  //connect user
  useEffect(() => {
    socket.emit("joinUser", auth.user._id);
  }, [auth.user._id, socket]);

  // like and unlike
  useEffect(() => {
    socket.on("likeToClient", (newPost) => {
      dispatch({ type: POSTTYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("likeToClient");
  }, [dispatch, socket]);

  useEffect(() => {
    socket.on("unlikeToClient", (newPost) => {
      dispatch({ type: POSTTYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("unlikeToClient");
  }, [dispatch, socket]);

  // Comments
  useEffect(() => {
    socket.on("createCommentToClient", (newPost) => {
      dispatch({ type: POSTTYPES.UPDATE_POST, payload: newPost });
    });

    return () => socket.off("createCommentToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("deleteCommentToClient", (newPost) => {
      dispatch({ type: POSTTYPES.UPDATE_POST, payload: newPost });
    });

    return () => socket.off("deleteCommentToClient");
  }, [socket, dispatch]);

  // Follow
  useEffect(() => {
    socket.on("followToClient", (newUser) => {
      dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });
    });

    return () => socket.off("followToClient");
  }, [socket, dispatch, auth]);

  useEffect(() => {
    socket.on("unFollowToClient", (newUser) => {
      dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });
    });

    return () => socket.off("unFollowToClient");
  }, [socket, dispatch, auth]);

  // Notification
  useEffect(() => {
    socket.on("createNotifyToClient", (msg) => {
      dispatch({ type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg });

      //notify window
      spawnNotification(
        msg.user.username + " " + msg.text,
        msg.user.avatar,
        msg.url,
        "Nông Nghiệp Việt Nam"
      );
    });

    return () => socket.off("createNotifyToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("removeNotifyToClient", (msg) => {
      dispatch({ type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg });
    });

    return () => socket.off("removeNotifyToClient");
  }, [socket, dispatch]);
  return <></>;
};

export default SocketClient;
