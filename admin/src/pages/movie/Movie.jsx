import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./movie.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useContext, useEffect, useRef, useState } from "react";
import { getMovies, updateMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from "../../firebase";
import axios from "axios";

export default function Movie() {
  const location = useLocation();
  const id = location.state._id;

  const { movies, dispatch } = useContext(MovieContext);
  const [movie, setMovie] = useState(location.state);
  let isMounted = useRef(true);

  const [movieChanges, setMovieChanges] = useState([]);
  const [filesChanges, setFilesChanges] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [navigateToMovieList, setNavigateToMovieList] = useState(false);

  const navigate = useNavigate();

  // to get movie from the state
  useEffect(() => {
    isMounted.current = true;
    if (isMounted) {
      getMovies(dispatch);
    }
    return () => {
      isMounted.current = false;
    };
  }, [dispatch]);

  // to handle the changes in the input fields
  const changesHandler = (e) => {
    const value = e.target.value;
    setMovieChanges({ ...movieChanges, [e.target.id]: value });
  };

  // function to upload files to Firebase
  const upload = async (items) => {
    return Promise.all(
      items.map(async (item) => {
        const fileName = new Date().getTime() + item.label + item.file.name;
        const storageRef = ref(storage, `/items/${fileName}`);
        await uploadBytes(storageRef, item.file);
        const url = await getDownloadURL(storageRef);
        return { [item.label]: url };
      })
    );
  };

  // to get the files to change and store in an array
  const fileHandler = (item, name) => {
    setFilesChanges((prev) => {
      return [...prev, { file: item, label: name }];
    });
  };

  // to  upload files if any and set the uploaded to true which will run the finalUpdateHandler
  const updateHandler = async (e) => {
    e.preventDefault();
    isMounted.current = true;

    try {
      if (isMounted) {
        // console.log(filesChanges);
        if (filesChanges.length > 0) {
          // Upload files and get the URLs
          const uploadedFiles = await upload(filesChanges);

          // to flatten the array of uploadedFiles objects
          const flattenedUploadedFiles = await uploadedFiles.reduce(
            (result, currentObject) => {
              return { ...result, ...currentObject };
            }
          );

          // // Merge the uploaded file URLs with other changes
          setMovieChanges((prev) => {
            return {
              ...prev,
              ...flattenedUploadedFiles,
            };
          });

          // to set the uploaded to true
          await setUploaded(true);

          console.log("Movie updated successfully!");
        }

        if (filesChanges.length <= 0) {
          setUploaded(true);
        }
      }
    } catch (err) {
      console.log("Error:", err);
      console.log("There was a problem updating the movie! Please try again!");
    }

    return () => {
      isMounted.current = false;
    };
  };

  // to set the changes to the movie when the file upload is successfull
  useEffect(() => {
    if (uploaded) {
      isMounted.current = true;

      if (isMounted) {
        const finalUpdateHandler = async () => {
          // No files to upload, update the movie with other changes
          const updatedMovie = await updateMovie(
            movie._id,
            movieChanges,
            dispatch
          );

          await setMovie(updatedMovie);
          console.log("Movie updated successfully!");
        };
        finalUpdateHandler();
        setNavigateToMovieList(true);
      }
    }
  }, [uploaded]);

  // to navigate to moviesList on succesfull movie updation
  useEffect(() => {
    // to make sure whether to navigate now or not
    if (navigateToMovieList) {
      console.log("navigate hook is working!");
      navigate("/movies");
    }
  }, [navigateToMovieList]);

  console.log(movieChanges);

  return (
    <div className="product">
      <div className="product">
        <div className="productTitleContainer">
          <h1 className="productTitle">Movie</h1>

          <Link to="/newmovie">
            <button className="productAddButton">Create</button>
          </Link>
        </div>
        <div className="productTop">
          <div className="productTopRight">
            <div className="productInfoTop">
              <img src={movie.img} alt="Movie img" className="productInfoImg" />

              <span className="productName">{movie.title}</span>
            </div>

            <div className="productInfoBottom">
              <div className="productInfoItem">
                <span className="productInfoKey">ID:</span>
                <span className="productInfoValue">{movie._id}</span>
              </div>

              <div className="productInfoItem">
                <span className="productInfoKey">Genre:</span>
                <span className="productInfoValue">{movie.genre}</span>
              </div>

              <div className="productInfoItem">
                <span className="productInfoKey">Year:</span>
                <span className="productInfoValue">{movie.year}</span>
              </div>

              <div className="productInfoItem">
                <span className="productInfoKey">Age Limit:</span>
                <span className="productInfoValue">{movie.limit}</span>
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
                placeholder={movie.title}
                id="title"
                onChange={changesHandler}
              />

              <label>Movie Description</label>
              <input
                type="text"
                placeholder={movie.desc}
                id="desc"
                onChange={changesHandler}
              />

              <label>Year</label>
              <input
                type="text"
                placeholder={movie.year}
                id="year"
                onChange={changesHandler}
              />

              <label>Genre</label>
              <select
                name="genre"
                id="genre"
                defaultValue={movie.genre}
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
              </select>

              <label>Duration</label>
              <input
                type="text"
                placeholder={movie.duration}
                id="duration"
                onChange={changesHandler}
              />

              <label>Limit</label>
              <input
                type="text"
                placeholder={movie.limit}
                id="limit"
                onChange={changesHandler}
              />

              <label>Is Series?</label>
              <select
                name="isSeries"
                id="isSeries"
                defaultValue={movie.isSeries}
                onChange={changesHandler}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>

              <label>Trailer</label>
              <input
                type="file"
                placeholder={movie.trailer}
                id="trailer"
                onChange={(e) => {
                  fileHandler(e.target.files[0], e.target.id);
                }}
              />

              <label>Video</label>
              <input
                type="file"
                placeholder={movie.video}
                id="video"
                onChange={(e) => {
                  fileHandler(e.target.files[0], e.target.id);
                }}
              />

              <label>Image</label>
              <input
                type="file"
                placeholder={movie.img}
                id="img"
                onChange={(e) => {
                  fileHandler(e.target.files[0], e.target.id);
                }}
              />

              <label>Title Image</label>
              <input
                type="file"
                placeholder={movie.imgSm}
                id="imgTitle"
                onChange={(e) => {
                  fileHandler(e.target.files[0], e.target.id);
                }}
              />

              <label>Thumbnail Image</label>
              <input
                type="file"
                placeholder={movie.imgTitle}
                id="imgSm"
                onChange={(e) => {
                  fileHandler(e.target.files[0], e.target.id);
                }}
              />
            </div>

            <div className="productFormRight">
              <div className="productUpload">
                <img src={movie.img} alt="" className="productUploadImg" />

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
    </div>
  );
}
