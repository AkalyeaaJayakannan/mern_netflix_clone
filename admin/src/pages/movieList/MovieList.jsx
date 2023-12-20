import "./movieList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";

export default function MovieList() {
  const navigate = useNavigate();
  const { movies, dispatch } = useContext(MovieContext);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    console.log(isMounted);
    if (isMounted) {
      getMovies(dispatch);
      console.log("getting movies");
    }
    return () => {
      isMounted.current = false;
    };
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
  };

  // to navigate to single movie page and pass the movie in the state - when clicked on edit
  const editHandler = (id, movie) => {
    navigate("/movie/" + id, { state: { ...movie } });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button
              className="productListEdit"
              onClick={() => editHandler(params.row._id, params.row)}
            >
              Edit
            </button>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  console.log(movies);
  return (
    <div className="productList">
      <div className="linkContainer">
        <Link to="/newmovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
