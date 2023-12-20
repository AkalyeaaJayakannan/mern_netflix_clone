import React, { useContext, useEffect, useRef, useState } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { AuthContext } from "../../context/authContext/AuthContext";
import { getUser, logout } from "../../context/authContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const { users, dispatch: dispatchUser } = useContext(UserContext);
  let isMounted = useRef(true);

  const [currentUser, setCurrentUser] = useState(user);

  const logoutHandler = (e) => {
    e.preventDefault();
    console.log("Logged out!");
    logout(dispatch);
  };

  useEffect(() => {
    isMounted.current = true;
    if (isMounted) {
      const userHandler = async () => {
        const updatedCurrentUser = users.filter((u) => u._id === user._id)[0];
        await setCurrentUser(updatedCurrentUser);
      };
      userHandler();
      console.log("hello from useEffect in topbar");
    }
    return () => {
      isMounted.current = false;
    };
  }, [user]);

  console.log(user);
  console.log(users);

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">youradmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div className="wrapper">
            <img src={user.profilePic} className="topAvatar" />
            <div className="options">
              <span onClick={logoutHandler}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
