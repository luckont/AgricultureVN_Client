import React from 'react';
import { useSelector } from "react-redux"
import Loading from './Loading';
// import Alert from './Alert';

const Notify = () => {
    const notify = useSelector(state => state.notify?.loading)
    return (
        <div>
            {notify && <Loading />}
            {/* {notify.err && <Alert msg={notify.err} bgColor={"alert-danger"}/>} */}
        </div>
    );
}

export default Notify;
