import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "../styles/UserHome.css";

function UserFeed() {
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3001/api/favorites").then((response) => {
      setFavorites(response.data);
    });
  }, []);

  return (
    <div className="posts-main">
      {favorites.map((item, key) => {
        return (
          <div
            className="post"
            onClick={() => {
              navigate(`/post/${item.idFavorites}`);
            }}
          >
            <div className="userFullName" key={key}>
              {item.userFullName}
            </div>
            <div className="location">Location: {item.location}</div>
            <div className="menuItem">Favorite Food/Drink: {item.menuItem}</div>
            <div className="timestamp">{item.created_at}</div>
            <i>Comment</i>
            <i>Add to your Follow List</i>
          </div>
        );
      })}
    </div>
  );
}

export default UserFeed;
