import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "./common/useForm";
import Joi from "joi-browser";

const schema = {
  title: Joi.string().required().label("Title"),
  genre: Joi.string().required().label("Genre"),

  numberInStock: Joi.number()
    .min(0)
    .max(100)
    .required()
    .label("Number In Stock"),
  dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
};

const MovieForm = ({ movies, genres, onSave }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState({
    title: "",
    genre: "",
    numberInStock: "",
    dailyRentalRate: "",
  });
  let options = genres.map((genre) => {
    return {
      label: genre.name,
      value: genre._id,
    };
  });

  const doSubmit = (data) => {
    if (params.id === "new") {
      data = {
        ...data,
        _id: Date.now(),
        genre: genres.find((g) => g._id === data.genre),
      };
      onSave([...movies, data]);
    } else {
      data = {
        ...data,
        genre: genres.find((g) => g._id === data.genre),
      };
      onSave(movies.map((m) => (m._id === data._id ? data : m)));
    }
  };
  useEffect(() => {
    let movie;
    if (params.id !== "new") {
      console.log(movies);
      movie = movies && movies.find((m) => m._id == params.id);
      console.log(movie);
      // console.log(typeof movie._id)
      if (movie) {
        setInitialData({ ...movie, genre: movie.genre._id });
      } else if (movies.length) navigate("/not-found");
    } else setInitialData({ ...initialData, genre: genres[0]?._id });
  }, [params.id, movies, genres]);

  const { handleSubmit, renderInput, renderButton, renderSelect } = useForm(
    schema,
    doSubmit,
    initialData
  );

  return (
    <>
      <h1>{params.id === "new" ? "Add" : "Update"} Movie</h1>
      <form onSubmit={handleSubmit}>
        {renderInput("title", "Title")}
        {renderSelect("genre", "Genre", options)}
        {renderInput("numberInStock", "Number in Stock")}
        {renderInput("dailyRentalRate", "Rate")}
        {renderButton(params.id === "new" ? "Save" : "Update")}
      </form>
    </>
  );
};

export default MovieForm;
