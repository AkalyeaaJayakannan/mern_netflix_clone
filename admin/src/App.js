import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import { Route, Navigate, Routes } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext, useEffect } from "react";
import MovieList from "./pages/movieList/MovieList";
import Movie from "./pages/movie/Movie";
// import { Movie } from "@material-ui/icons";
import NewMovie from "./pages/newMovie/NewMovie";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";

function App() {
  const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   g
  // })
  console.log(user);

  return (
    <>
      {!user && <Navigate to="/login" />}
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        ></Route>
      </Routes>
      {user && (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route path="/users" element={<UserList />}></Route>
              <Route path="/user/:userId" element={<User />}></Route>
              <Route path="/newUser" element={<NewUser />}></Route>
              <Route path="/movies" element={<MovieList />}></Route>
              <Route path="/movie/:movieId" element={<Movie />}></Route>
              <Route path="/newmovie" element={<NewMovie />}></Route>
              <Route path="/lists" element={<ListList />}></Route>
              <Route path="/list/:listId" element={<List />}></Route>
              <Route path="/newlist" element={<NewList />}></Route>
            </Routes>
          </div>
        </>
      )}
    </>
  );
}

export default App;

////////////////////////////////////////////////////////////////////////
// import Sidebar from "./components/sidebar/Sidebar";
// import Topbar from "./components/topbar/Topbar";
// import "./app.css";
// import Home from "./pages/home/Home";
// import {
//   BrowserRouter as Router,
//   // Switch,
//   Route,
//   Redirect,
//   Navigate,
// } from "react-router-dom";
// import UserList from "./pages/userList/UserList";
// import User from "./pages/user/User";
// import NewUser from "./pages/newUser/NewUser";
// import Login from "./pages/login/Login";
// import { AuthContext } from "./context/authContext/AuthContext";
// import { useContext } from "react";
// // import ListList from "./pages/listList/ListList";
// // import List from "./pages/list/List";
// // import NewList from "./pages/newList/NewList";
// import MovieList from "./pages/movieList/MovieList";
// import { Movie } from "@material-ui/icons";
// import NewMovie from "./pages/newMovie/NewMovie";

// function App() {
//   const { user } = useContext(AuthContext);
//   return (
//     <Router>
//       {/* <Switch> */}
//       <Route path="/login">{user ? <Navigate to="/" /> : <Login />}</Route>
//       {user && (
//         <>
//           <Topbar />
//           <div className="container" element={<Sidebar />}>
//             <Sidebar />
//             <Route exact path="/" element={<Home />}></Route>
//             <Route path="/users" element={<UserList />}></Route>
//             <Route path="/user/:userId" element={<User />}></Route>
//             <Route path="/newUser" element={<NewUser />}></Route>
//             <Route path="/movies" element={<MovieList />}></Route>
//             <Route path="/movie/:movieId" element={<Movie />}></Route>
//             <Route path="/newMovie" element={<NewMovie />}></Route>
//             {/* <Route path="/lists">
//                 <ListList />
//               </Route>
//               <Route path="/list/:listId">
//                 <List />
//               </Route>
//               <Route path="/newlist">
//                 <NewList />
//               </Route> */}
//           </div>
//         </>
//       )}
//       {/* </Switch> */}
//     </Router>
//   );
// }

// export default App;

////////////////////////////////////////////////////////////////////////
// import Sidebar from "./components/sidebar/Sidebar";
// import Topbar from "./components/topbar/Topbar";
// import "./app.css";
// import Home from "./pages/home/Home";
// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import UserList from "./pages/userList/UserList";
// import User from "./pages/user/User";
// import NewUser from "./pages/newUser/NewUser";
// import MovieList from "./pages/movieList/MovieList";
// import Movie from "./pages/movie/Movie";
// import NewMovie from "./pages/newMovie/NewMovie";
// import { useContext, useEffect, useState } from "react";
// import Login from "./pages/login/Login";
// import { AuthContext } from "./context/authContext/AuthContext";

// function App() {
//   console.log("yayyyy! the app is running!");
//   const { user } = useContext(AuthContext);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/login"
//           element={
//             // !user ?
//             <Login />
//             // : <Navigate to="/" />
//           }
//         ></Route>

//         {user && (
//           <Route
//             path="/"
//             element={
//               // user ? (
//               <div className="container">
//                 <Topbar />
//                 <Sidebar />
//                 <Route index element={<Home />} />
//                 <Route path="users" element={<UserList />} />
//                 <Route path="user/:userId" element={<User />} />
//                 <Route path="newUser" element={<NewUser />} />
//                 <Route path="movies" element={<MovieList />} />
//                 <Route path="movie/:movieId" element={<Movie />} />
//                 <Route path="newmovie" element={<NewMovie />} />
//               </div>
//               // ) : (
//               //   <Navigate to="/login" />
//               // )
//             }
//           />
//         )}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
