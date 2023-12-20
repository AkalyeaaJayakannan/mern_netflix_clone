//create movie
export const createMovieStart = () => ({
  type: "CREATE_MOVIE_START",
});

export const createMovieSuccess = (movie) => ({
  type: "CREATE_MOVIE_SUCCESS",
  payload: movie,
});

export const createMovieFailure = () => ({
  type: "CREATE_MOVIE_FAILURE",
});

// get movie
export const getMoviesStart = () => ({
  type: "GET_MOVIES_START",
});

export const getMoviesSuccess = (movies) => ({
  type: "GET_MOVIES_SUCCESS",
  payload: movies,
});

export const getMoviesFailure = () => ({
  type: "GET_MOVIES_FAILURE",
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
export const updateMovieStart = () => ({
  type: "UPDATE_MOVIE_START",
});

export const updateMovieSuccess = (movie) => ({
  type: "UPDATE_MOVIE_SUCCESS",
  payload: movie,
});

export const updateMovieFailure = () => ({
  type: "UPDATE_MOVIE_FAILURE",
});

// delete movie
export const deleteMovieStart = () => ({
  type: "DELETE_MOVIE_START",
});

export const deleteMovieSuccess = (id) => ({
  type: "DELETE_MOVIE_SUCCESS",
  payload: id,
});

export const deleteMovieFailure = () => ({
  type: "DELETE_MOVIE_FAILURE",
});
