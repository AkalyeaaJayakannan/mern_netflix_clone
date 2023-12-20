import { useContext, useEffect, useState } from "react";
import "./newList.css";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage functions
import storage from "../../firebase";
import { createMovie, getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { ListContext } from "../../context/listContext/ListContext";
import { createList } from "../../context/listContext/apiCalls";
import { useHistory, useNavigate } from "react-router-dom";

export default function NewList() {
  const [list, setList] = useState(null);
  const [listType, setListType] = useState(null);
  const [listGenre, setListGenre] = useState(null);

  const { lists, dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  const [moviesList, setMoviesList] = useState(movies);
  const navigate = useNavigate();

  useEffect(() => {
    getMovies(dispatchMovie);
    setMoviesList(movies);
  }, [dispatchMovie]);
  console.log(movies);

  // to handle changes in the input fields
  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const selectHandler = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setList({ ...list, [e.target.name]: value });
    console.log(value);
  };

  // useEffect(() => {
  //   const getMoviesByTypeAndGenre = async () => {
  //     console.log("getmoviesbytypeandgenre function is running!");
  //     let items = [...movies];

  //     if (listType) {
  //       listType === "movies" &&
  //         (items = items.filter((item) => item.isSeries === false));
  //       listType === "series" &&
  //         (items = items.filter((item) => item.isSeries === true));
  //       // : (items = items.filter((item) => item.isSeries === true));

  //       // if (listType === "Please select an option") items = movies;
  //     }

  //     if (listGenre) {
  //       items = items.filter((item) => item.genre === listGenre);
  //       // if (listGenre === "Please select an option") items = movies;
  //     }

  //     console.log(items);
  //     setMoviesList(items);
  //   };

  //   if (listType || listGenre) {
  //     getMoviesByTypeAndGenre();
  //   }
  // }, [listType, listGenre]);

  // useEffect(() => {
  //   // Update moviesList when movies context changes
  //   setMoviesList(movies);
  //   console.log("I'm changing with movies!");
  // }, [movies]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await createList(list, dispatch);
    await console.log("List Created successfully!");
    await navigate("/lists");
  };

  console.log(list);
  console.log(moviesList);
  console.log(listType);
  console.log(listGenre);

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>

      <form className="addProductForm">
        <div className="formLeftContainer">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
            />
          </div>

          <div className="addProductItem">
            <label>Type</label>
            <select
              placeholder="type"
              name="type"
              onChange={(e) => {
                handleChange(e);
                setListType(e.target.value);
              }}
              required
            >
              <option>Please select an option</option>
              <option value="movies">Movies</option>
              <option value="series">Series</option>
              <option value="newAndPopular">New and Popular</option>
            </select>
          </div>

          <div className="addProductItem">
            <label>Genre</label>
            <select
              name="genre"
              id="genre"
              onChange={(e) => {
                handleChange(e);
                setListGenre(e.target.value);
              }}
            >
              <option value="adventure">Adventure</option>
              <option value="action">Action</option>
              <option value="childrenAndFamily">Children & Family</option>
              <option value="crime">Crime</option>
              <option value="comedy">Comedy</option>
              <option value="fantasy">Fantasy</option>
              <option value="historical">Historical</option>
              <option value="hollywood">Hollywood</option>
              <option value="horror">Horror</option>
              <option value="independant">Independant</option>
              <option value="romance">Romance</option>
              <option value="sci-fi">Sci-fi</option>
              <option value="thriller">Thriller</option>
              <option value="western">Western</option>
              <option value="animation">Animation</option>
              <option value="drama">Drama</option>
              <option value="documentary">Documentary</option>
              <option value="newAndPopular">New and popular</option>
            </select>
          </div>
        </div>

        <div className="formRightContainer">
          <div className="addProductItem">
            <label>Content</label>
            <select
              name="content"
              id="content"
              onChange={selectHandler}
              required
              multiple
              style={{ height: "250px" }}
            >
              {
                // moviesList &&
                movies.map((movie) => (
                  <option
                    key={movie._id}
                    value={movie._id}
                    className="selectMovieOptions"
                  >
                    {movie.title}
                  </option>
                ))
              }
            </select>
          </div>
        </div>

        <button className="addProductButton" onClick={submitHandler}>
          Create
        </button>
      </form>
    </div>
  );
}
