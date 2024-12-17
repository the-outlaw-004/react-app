import React from "react";

const Like = ({ movie, onLike }) => {
  return (
    <button className="btn btn-link text-black" onClick={onLike}>
      <svg
        style={{ height: "20px", width: "20px" }}
        viewBox="0 0 24 24"
        fill={movie.isLiked === true ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
};

export default Like;