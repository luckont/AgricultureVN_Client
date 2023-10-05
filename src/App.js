import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { rfToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";

import RoutePage from "./customRouter/RoutePage";
import LoginPage from "./pages/login";
import HomePage from "./pages/home"
import RegisterPage from "./pages/register";
import Header from "./components/header/Header";
import Notify from "./components/notify/Notify";
import StatusModal from "./components/StatusModal";
import { getSuggestions } from "./redux/actions/suggestionAction";

function App() {
  const auth  = useSelector((state) => state.auth?.token)
  const status = useSelector((state) => state.status)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(rfToken())
  }, [dispatch])

  useEffect(() => {
    if(auth) {
      dispatch(getPosts(auth))
      dispatch(getSuggestions(auth))
    }
  }, [dispatch, auth])

  return (
    <Router>
      <Notify />
      <input type="checkbox" id="theme"></input>
      <div className="App">
        <div className="main">
          {auth && <Header/>}
          {status && <StatusModal/>}
          <Routes>
            <Route exact path="/" element={auth ? <HomePage /> : <LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route path = "/:page" element={<RoutePage/>} />
            <Route path = "/:page/:id" element={<RoutePage/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
