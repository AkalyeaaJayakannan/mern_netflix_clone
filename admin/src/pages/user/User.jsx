import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  Publish,
} from "@material-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./user.css";
import { useContext, useEffect, useRef, useState } from "react";
import { updateUser } from "../../context/userContext/apiCalls";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { UserContext } from "../../context/userContext/UserContext";
import storage from "../../firebase";

export default function User() {
  const location = useLocation();
  const user = location.state.user;
  const id = user._id;
  let isMounted = useRef(true);

  const [userChanges, setUserChanges] = useState(null);
  const [fileChanges, setFileChanges] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [navigateToUserList, setNavigateToUserList] = useState(false);
  const navigate = useNavigate();

  const { users, dispatch } = useContext(UserContext);

  const date = new Date(user.createdAt);
  const createdDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  const changesHandler = (e) => {
    setUserChanges((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const fileHandler = (item) => {
    setFileChanges(item);
  };

  // to upload the file to the firebase and set the uploaded to true
  const updateHandler = async (e) => {
    e.preventDefault();
    isMounted.current = true;

    try {
      if (isMounted) {
        if (fileChanges) {
          console.log("file changes from update handler ");
          const fileName = new Date().getTime() + fileChanges.name;
          const storageRef = ref(storage, `/profilePic/${fileName}`);
          await uploadBytes(storageRef, fileChanges);
          const url = await getDownloadURL(storageRef);
          await setUserChanges((prev) => {
            return { ...prev, ["profilePic"]: url };
          });

          await setUploaded(true);
        }
        if (!fileChanges) {
          console.log("no file changes from update handler");
          await setUploaded(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
    return () => {
      isMounted.current = false;
    };
  };

  // to update the user changes to user
  useEffect(() => {
    if (isMounted) {
      if (uploaded) {
        const finalUpdateHandler = async () => {
          await updateUser(id, userChanges, dispatch);
          await console.log("user updated successfully");
        };
        finalUpdateHandler();
        setNavigateToUserList(true);
      }
    }
    return () => {
      isMounted.current = false;
    };
  }, [uploaded]);

  // to navigate to userlist on successfull user update
  useEffect(() => {
    if (navigateToUserList) {
      navigate("/users");
    }
  }, [navigateToUserList]);

  console.log(user);
  console.log(userChanges);
  console.log(fileChanges);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={user.profilePic} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">
                {user.isAdmin ? "Admin" : "User"}
              </span>
            </div>

            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>

            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{createdDate}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder={user.username}
                  className="userUpdateInput"
                  onChange={changesHandler}
                />
              </div>

              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder={user.email}
                  className="userUpdateInput"
                  onChange={changesHandler}
                />
              </div>

              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="userUpdateInput"
                  onChange={changesHandler}
                />
              </div>

              <div className="userUpdateItem">
                <label>Is Admin?</label>
                <select
                  name="isAdmin"
                  id="isAdmin"
                  defaultValue={user.isAdmin}
                  onChange={changesHandler}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>

              <div className="userUpdateItem">
                <label>Profile</label>
                <input
                  type="file"
                  name="profilePic"
                  placeholder={user.profilePic}
                  className="userUpdateInput"
                  onChange={(e) => fileHandler(e.target.files[0])}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img className="userUpdateImg" src={user.profilePic} alt="" />

                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>

                <input type="file" id="file" style={{ display: "none" }} />
              </div>

              <button className="userUpdateButton" onClick={updateHandler}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
