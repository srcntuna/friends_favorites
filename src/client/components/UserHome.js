import "../styles/UserHome.css";
import UserFeed from "./UserFeed";
import React, { useState } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";

function UserHome() {
  const [postDetails, setPostDetails] = useState({
    location: "",
    menuItem: "",
  });

  const params = useParams();

  console.log(params);

  //NOT WORKING NOW , WAITING FOR USERNAME AUTHENTICATION
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("SUBMITTING");
    Axios.post("http://localhost:3001/api/favorites", { postDetails }).then(
      (response) => {
        console.log(response);
      }
    );
  };

  return (
    <div className="userPage">
      <div>
        <form onSubmit={submitHandler}>
          <div className="formFavorite">
            <label htmlFor="Location">What is your fav location?:</label>
            <input
              type="text"
              id="favLocation"
              name="location"
              placeholder="Write your fav location"
              onChange={(e) =>
                setPostDetails({ ...postDetails, location: e.target.value })
              }
            />
            <label htmlFor="MenuItem">What is your fav food/drink?:</label>
            <input
              type="text"
              id="favMenuItem"
              name="menuItem"
              placeholder="Write your fav food/drink"
              onChange={(e) =>
                setPostDetails({ ...postDetails, menuItem: e.target.value })
              }
            />
          </div>
          <input type="submit" value="Add to Favorites" />
        </form>
      </div>
      <h2>Your and Your Friends Favs</h2>
      <UserFeed />
    </div>
  );
}

export default UserHome;
