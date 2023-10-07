import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { POSTTYPES } from './redux/actions/postAction';
import { GLOBALTYPES } from './redux/actions/globalTyles';

const SocketClient = () => {
    const auth = useSelector((state) => state.auth)
    const socket = useSelector((state) => state.socket)

    const dispatch = useDispatch()

    //connect user
    useEffect(() => {
        socket.emit("joinUser", auth.user._id)
    }, [auth.user._id, socket]);

    // like and unlike
    useEffect(() => {
        socket.on("likeToClient", newPost => {
            dispatch({ type: POSTTYPES.UPDATE_POST, payload: newPost })

        })
        return () => socket.off('likeToClient')
    }, [dispatch, socket]);

    useEffect(() => {
        socket.on("unlikeToClient", newPost => {
            dispatch({ type: POSTTYPES.UPDATE_POST, payload: newPost })

        })
        return () => socket.off('unlikeToClient')
    }, [dispatch, socket]);

    // Comments
    useEffect(() => {
        socket.on('createCommentToClient', newPost => {
            dispatch({ type: POSTTYPES.UPDATE_POST, payload: newPost })
        })

        return () => socket.off('createCommentToClient')
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('deleteCommentToClient', newPost => {
            dispatch({ type: POSTTYPES.UPDATE_POST, payload: newPost })
        })

        return () => socket.off('deleteCommentToClient')
    }, [socket, dispatch])


    // Follow
    useEffect(() => {
        socket.on('followToClient', newUser => {
            dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })
        })

        return () => socket.off('followToClient')
    }, [socket, dispatch, auth])

    useEffect(() => {
        socket.on('unFollowToClient', newUser => {
            dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })
        })

        return () => socket.off('unFollowToClient')
    }, [socket, dispatch, auth])

    return (
        <></>
    );
}

export default SocketClient;
