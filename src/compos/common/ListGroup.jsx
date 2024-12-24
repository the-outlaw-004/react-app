const ListGroup = ({ genres, onGenreSelect, selectedGenre }) => {
  return (
    <ul className="list-group">
      <li
        key="all"
        onClick={() => onGenreSelect("all")}
        className={`list-group-item
        ${selectedGenre === "all" && "active"}
     `}
      >
        <button className="page-link">All Genres</button>
      </li>
      {genres?.length > 0 &&
        genres.map((genre) => (
          <li
            key={genre._id}
            className={`list-group-item
               ${selectedGenre._id === genre._id && "active"}
            `}
            onClick={() => onGenreSelect(genre)}
          >
            <button className="page-link">{genre.name}</button>
          </li>
        ))}
    </ul>
  );
};

export default ListGroup;
