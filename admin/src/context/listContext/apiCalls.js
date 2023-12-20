import axios from "axios";
import {
  createListFailure,
  createListStart,
  createListSuccess,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
  updateListFailure,
  updateListStart,
  updateListSuccess,
} from "./ListAction";

// create list
export const createList = async (list, dispatch) => {
  dispatch(createListStart());
  try {
    const res = await axios.post("/api/lists/", list, {
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
      },
    });
    dispatch(createListSuccess(res.data));
  } catch (err) {
    dispatch(createListFailure());
  }
};

// get lists
export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axios.get("/api/lists/all", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getListsSuccess(res.data));
  } catch (err) {
    dispatch(getListsFailure());
  }
};

// // // get movie by ID
// export const getMovieById = async (id) => {
//   // dispatch(getMovieByIdStart());
//   try {
//     const res = await axios.get(`/api/movies/find/${id}`, {
//       headers: {
//         token: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
//       },
//     });
//     return res.data;
//     // dispatch(getMovieByIdSuccess(res.data));
//   } catch (err) {
//     // dispatch(getMovieByIdFailure());
//     console.log(err);
//   }
// };

// update movies
export const updateList = async (id, changes, dispatch) => {
  dispatch(updateListStart());
  try {
    const res = await axios.put(`/api/lists/${id}`, changes, {
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
      },
    });
    dispatch(updateListSuccess(res.data));
    return res.data; // Return the updated movie from the API
  } catch (err) {
    dispatch(updateListFailure());
    throw err; // Rethrow the error for handling in the component
  }
};

// delete movie
export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());
  try {
    await axios.delete("/api/lists/" + id, {
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}
        `,
      },
    });
    dispatch(deleteListSuccess(id));
  } catch (err) {
    dispatch(deleteListFailure());
  }
};
