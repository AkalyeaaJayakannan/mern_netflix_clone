import { useContext, useState } from "react";
import "./newUser.css";
import { UserContext } from "../../context/userContext/UserContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from "../../firebase";
import { createUser } from "../../context/userContext/apiCalls";
import { useNavigate } from "react-router-dom";

export default function NewUser() {
  const { users, dispatch } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const navigate = useNavigate();

  // to handle changes in the input fields
  const changesHandler = (e) => {
    const value = e.target.value;
    setUserDetails({ ...userDetails, [e.target.name]: value });
  };

  // to get the file and set it to the state
  const fileHandler = (item) => {
    setFile(item);
  };

  // to upload the file to the firebase
  const uploadHandler = async (e) => {
    e.preventDefault();
    try {
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `/profilePicture/${fileName}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await setUserDetails((prev) => {
        return { ...prev, ["profilePic"]: url };
      });
      await setUploaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  // to create a user with the user details that we have in the state
  const createHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("submit clicked");
      await createUser(userDetails, dispatch);
      await console.log("User Created successfully!");
      await navigate("/users");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={changesHandler}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={changesHandler}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={changesHandler}
          />
        </div>
        <div className="newUserItem">
          <label>Profile Picture</label>
          <input
            type="file"
            name="profilePic"
            onChange={(e) => fileHandler(e.target.files[0])}
          />
        </div>
        <div className="newUserItem">
          <label>Are you an admin?</label>
          <div className="newUserGender">
            <select name="isAdmin" id="isAdmin" onChange={changesHandler}>
              <option>Please select an option</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </div>

        {/* to display the create button on successfull profile upload */}
        {uploaded ? (
          <button className="newUserButton" onClick={createHandler}>
            Create
          </button>
        ) : (
          <button className="newUserButton" onClick={uploadHandler}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
