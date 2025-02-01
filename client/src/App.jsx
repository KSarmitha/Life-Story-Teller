import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { Landing } from "./Components/Landing";
import { Login } from "./Components/Login";
import { Navbar } from "./Components/Navbar";
import { NotFound } from "./Components/NotFound";
import { Signup } from "./Components/Signup";
import UserProfile from "./Components/UserProfile";
import { ViewStory } from "./Components/ViewStory";
import { API_PATHS } from "./utils/constants/api";

export const IsLoggedInContext = createContext();
export const SetIsLoggedInContext = createContext();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    axiosInstance
      .get(API_PATHS.USER, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <>
      <IsLoggedInContext.Provider value={isLoggedIn}>
        <SetIsLoggedInContext.Provider value={setIsLoggedIn}>
          <BrowserRouter>
            {isLoggedIn ? <Navbar /> : null}
            <Routes>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/login" element={<Login />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/view" element={<ViewStory />} />
              <Route path="/" element={<Navigate to="/signup" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SetIsLoggedInContext.Provider>
      </IsLoggedInContext.Provider>
    </>
  );
}

export default App;
