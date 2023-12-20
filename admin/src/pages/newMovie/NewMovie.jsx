import { useContext, useState } from "react";
import "./newMovie.css";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage functions
import storage from "../../firebase";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function NewMovie() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [video, setVideo] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [navigateToMovieList, setNavigateToMovieList] = useState(false);

  const { dispatch } = useContext(MovieContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const upload = async (items) => {
    console.log("upload clicked");
    console.log(items);
    try {
      for (const item of items) {
        const fileName = new Date().getTime() + item.label + item.file.name;
        const storageRef = ref(storage, `/items/${fileName}`);
        await uploadBytes(storageRef, item.file);
        const url = await getDownloadURL(storageRef);
        setMovie((prev) => {
          return { ...prev, [item.label]: url };
        });
        setUploaded((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadHandler = (e) => {
    e.preventDefault();
    upload([
      {
        file: img,
        label: "img",
      },
      {
        file: imgTitle,
        label: "imgTitle",
      },
      { file: imgSm, label: "imgSm" },
      { file: video, label: "video" },
      { file: trailer, label: "trailer" },
    ]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await createMovie(movie, dispatch);
    setNavigateToMovieList(true);
  };

  useEffect(() => {
    if (navigateToMovieList) {
      navigate("/movies");
    }
  }, [navigateToMovieList]);

  console.log(movie);

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>

      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            onChange={(e) => {
              setImg(e.target.files[0]);
            }}
          />
        </div>

        <div className="addProductItem">
          <label>Title Image</label>
          <input
            type="file"
            id="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>

        <div className="addProductItem">
          <label>Thumbnail Image</label>
          <input
            type="file"
            id="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>

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
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            name="desc"
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label>Genre</label>
          {/* <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={handleChange}
          /> */}
          <select name="genre" id="genre" onChange={handleChange}>
            <option>Genre</option>
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
          </select>
        </div>

        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration"
            name="duration"
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="Limit"
            name="limit"
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label>Is Series?</label>
          <select
            name="isSeries"
            id="isSeries"
            onChange={handleChange}
            required
          >
            <option value="">Please select and option</option>
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>

        <div className="addProductItem">
          <label>Video</label>
          <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
        </div>

        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" onChange={(e) => setTrailer(e.target.files[0])} />
        </div>
        {uploaded === 5 ? (
          <button className="addProductButton" onClick={submitHandler}>
            Create
          </button>
        ) : (
          <button className="addProductButton" onClick={uploadHandler}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
