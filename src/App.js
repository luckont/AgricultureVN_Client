import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { rfToken } from "./redux/actions/authAction";

import RoutePage from "./RoutePage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage"
import Header from "./components/Header";
import Notify from "./components/notify/Notify";

function App() {
  const auth  = useSelector((state) => state.auth?.token)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(rfToken())
  }, [dispatch])

  return (
    <Router>
      <Notify />
      <input type="checkbox" id="theme"></input>
      <div className="App">
        <div className="main">
          {auth && <Header/>}
          <Routes>
            <Route exact path="/" element={auth ? <HomePage /> : <LoginPage />} />
            <Route exact path="/:page" element={<RoutePage />} />
            <Route exact path="/:page/:id" element={<RoutePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
