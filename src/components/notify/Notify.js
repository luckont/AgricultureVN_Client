import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTyles";
import Alert from "./Alert";
import Loading from "./Loading";

function Notify() {
  const dispatch = useDispatch();
  const notify = useSelector((state) => state.notify);

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (notify.err || notify.success) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: {} });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [notify.err, notify.success, dispatch]);

  return (
    <div>
      {notify.loading && <Loading />}
      {showAlert && (
        <Alert
          msg={{
            title: notify.err ? "Error" : "Success",
            body: notify.err || notify.success,
          }}
          handleShow={() => {
            setShowAlert(false);
            dispatch({ type: GLOBALTYPES.NOTIFY, payload: {} });
          }}
          bgColor={notify.err ? "bg-danger" : "bg-success"}
        />
      )}
    </div>
  );
}

export default Notify;
