import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";

export default function UserList() {
  const { users, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const deleteHandler = (id) => {
    console.log("delete clicked");
    deleteUser(id, dispatch);
  };

  const editHandler = (id, user) => {
    navigate("/user/" + id, { state: { user } });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      renderCell: (params) => {
        return <span>{params.row._id}</span>;
      },
    },
    {
      field: "user",
      headerName: "User",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.profilePic} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },

    {
      field: "isAdmin",
      headerName: "Is Admin?",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button
              className="userListEdit"
              onClick={() => editHandler(params.row._id, params.row)}
            >
              Edit
            </button>
            <DeleteOutline
              className="userListDelete"
              onClick={() => deleteHandler(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <div className="linkContainer">
        <Link to="/newuser">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
