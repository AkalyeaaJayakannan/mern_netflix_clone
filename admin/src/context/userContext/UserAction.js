//create movie
export const createUserStart = () => ({
  type: "CREATE_USER_START",
});

export const createUserSuccess = (user) => ({
  type: "CREATE_USER_SUCCESS",
  payload: user,
});

export const createUserFailure = () => ({
  type: "CREATE_USER_FAILURE",
});

// get movie
export const getUsersStart = () => ({
  type: "GET_USERS_START",
});

export const getUsersSuccess = (users) => ({
  type: "GET_USERS_SUCCESS",
  payload: users,
});

export const getUsersFailure = () => ({
  type: "GET_USERS_FAILURE",
});

// // get movie by ID
// export const getMovieByIdStart = () => ({
//   type: "GET_MOVIE_BY_ID_START",
// });

// export const getMovieByIdSuccess = (movie) => ({
//   type: "GET_MOVIE_BY_ID_SUCCESS",
//   payload: movie,
// });

// export const getMovieByIdFailure = () => ({
//   type: "GET_MOVIE_BY_ID_FAILURE",
// });

// update movie
export const updateUserStart = () => ({
  type: "UPDATE_USER_START",
});

export const updateUserSuccess = (user) => ({
  type: "UPDATE_USER_SUCCESS",
  payload: user,
});

export const updateUserFailure = () => ({
  type: "UPDATE_USER_FAILURE",
});

// delete movie
export const deleteUserStart = () => ({
  type: "DELETE_USER_START",
});

export const deleteUserSuccess = (id) => ({
  type: "DELETE_USER_SUCCESS",
  payload: id,
});

export const deleteUserFailure = () => ({
  type: "DELETE_USER_FAILURE",
});
