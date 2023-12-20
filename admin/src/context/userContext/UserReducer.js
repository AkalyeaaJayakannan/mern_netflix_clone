const UserReducer = (state, action) => {
  switch (action.type) {
    // create user
    case "CREATE_USER_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };

    case "CREATE_USER_SUCCESS":
      return {
        users: [...state.users, action.payload],
        isFetching: false,
        error: false,
      };

    case "CREATE_USER_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    // get user
    case "GET_USERS_START":
      return {
        users: [],
        // ...state,
        isFetching: true,
        error: false,
      };
    case "GET_USERS_SUCCESS":
      return {
        users: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_USERS_FAILURE":
      return {
        users: [],
        // ...state,
        isFetching: false,
        error: true,
      };

    // update user
    case "UPDATE_USER_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };

    case "UPDATE_USER_SUCCESS":
      return {
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
        isFetching: false,
        error: false,
      };

    case "UPDATE_USER_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    // delete user
    case "DELETE_USER_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_USER_SUCCESS":
      return {
        users: state.users.filter((user) => user._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_USER_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default UserReducer;
