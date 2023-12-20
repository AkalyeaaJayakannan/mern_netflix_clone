import axios from "axios";
import {
  getUserFailure,
  getUserStart,
  getUserSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logoutStart,
} from "./AuthAction";

// login
export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/api/auth/login", user);
    if (res.data.isAdmin) {
      dispatch(loginSuccess(res.data));
      // localStorage.setItem("user", JSON.stringify(res.data));
    }
  } catch (err) {
    dispatch(loginFailure());
  }
};

// logout
export const logout = async (dispatch) => {
  dispatch(logoutStart());
};

// get User
export const getUser = async (id, dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get("/api/users/find/" + id);
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};
