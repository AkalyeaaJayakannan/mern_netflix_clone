import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { MovieContextProvider } from "./context/movieContext/MovieContext";
import withStyles from "@material-ui/styles/withStyles";
import { ListContextProvider } from "./context/listContext/ListContext";
import { UserContextProvider } from "./context/userContext/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <MovieContextProvider>
          <ListContextProvider>
            <UserContextProvider>
              <App />
            </UserContextProvider>
          </ListContextProvider>
        </MovieContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
