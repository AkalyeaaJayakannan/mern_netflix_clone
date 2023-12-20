import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./list.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useContext, useEffect, useRef, useState } from "react";
import { getMovies, updateMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from "../../firebase";
import axios from "axios";
import { ListContext } from "../../context/listContext/ListContext";
import { getLists, updateList } from "../../context/listContext/apiCalls";

export default function List() {
  const location = useLocation();
  const id = location.state._id;
  const isMounted = useRef(true);
  const navigate = useNavigate();

  const { lists, dispatch } = useContext(ListContext);

  const [list, setList] = useState(location.state);
  const [listChanges, setListChanges] = useState(null);
  const [navigateToListList, setNavigateToListList] = useState(false);

  // to get movie from the state
  useEffect(() => {
    isMounted.current = true;
    if (isMounted) {
      getLists(dispatch);
    }
    return () => {
      isMounted.current = false;
    };
  }, [dispatch]);

  // to handle the changes in the input fields
  const changesHandler = (e) => {
    isMounted.current = true;
    if (isMounted) {
      const value = e.target.value;
      setListChanges((prev) => {
        return { ...prev, [e.target.id]: value };
      });
    }
    return () => {
      isMounted.current = false;
    };
  };

  // to handle the update list functionality
  const updateHandler = async (e) => {
    e.preventDefault();
    isMounted.current = true;
    if (isMounted) {
      try {
        // to Update the list with the changes
        const updatedList = await updateList(
          list._id,
          {
            ...listChanges,
          },
          dispatch
        );
        console.log("List updated successfully!");

        await setList(updatedList);
        await setNavigateToListList(true);
      } catch (err) {
        console.log("Error:", err);
        console.log(
          "There was a problem in updating the movie! Please try again!"
        );
      }
    }
    return () => {
      isMounted.current = false;
    };
  };

  useEffect(() => {
    if (navigateToListList) {
      navigate("/lists");
    }
  }, [navigateToListList]);

  console.log(listChanges);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>

        <Link to="/newlist">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>

          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">ID:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">Type:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input
              type="text"
              placeholder={list.title}
              id="title"
              onChange={changesHandler}
            />

            <label>Type</label>
            <select
              placeholder="type"
              id="type"
              name="type"
              defaultValue={list.type}
              onChange={changesHandler}
              required
            >
              <option value="movies">Movies</option>
              <option value="series">Series</option>
              <option value="newAndPopular">New and Popular</option>
            </select>

            <label>Genre</label>
            <select
              name="genre"
              id="genre"
              defaultValue={list.genre}
              onChange={changesHandler}
            >
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

          <div className="productFormRight">
            <div className="productUpload">
              <label for="file">
                <Publish />
              </label>

              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton" onClick={updateHandler}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

///////////////////////////////////////////////////////////////////////////////////

// to handle update movie functionality
// const updateHandler = async (e) => {
//   e.preventDefault();
//   try {
//     // filesChanges.length !== 0 && (
//     await upload(filesChanges);
//     // );
//     await updateMovie(movie, movieChanges, dispatch);
//     await console.log("Movie updated succesfully!");
//   } catch (err) {
//     console.log(err);
//     console.log("There was problem in updating the movie! Please try again!");
//   }
// };
////////////////////////////////////////////////////
// const updateHandler = async (e) => {
//   e.preventDefault();
//   // try {
//   const uploadedFiles = await upload(filesChanges);
//   const updatedMovie = await updateMovie(
//     id,
//     {
//       ...movieChanges,
//       ...uploadedFiles, // Merge the uploaded file URLs into the changes
//     },
//     dispatch
//   );
//   console.log("Movie updated successfully!");
//   // Update your state as needed
//   setMovieChanges(updatedMovie);
//   // } catch (err) {
//   //   console.log(err);
//   //   console.log(
//   //     "There was a problem in updating the movie! Please try again!"
//   //   );
//   // }
// };
/////////////////////////////////////////////////////

// function to upload files to the firebase
// const upload = async (items) => {
//   try {
//     for (const item of items) {
//       const fileName = new Date().getTime() + item.label + item.file.name;
//       const storageRef = ref(storage, `/items/${fileName}`);
//       await uploadBytes(storageRef, item.file);
//       const url = await getDownloadURL(storageRef);
//       setMovieChanges((prev) => {
//         return { ...prev, [item.label]: url };
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
///////////////////////////////////////////////////////////////////////////
