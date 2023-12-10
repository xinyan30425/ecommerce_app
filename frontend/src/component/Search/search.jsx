import React, { useState, useEffect } from "react";
import { API_KEY } from "./client";
import * as client from "./client";
import { Link, useParams, useHistory } from "react-router-dom";

function SearchAPI() {
  const { search } = useParams();
  const [searchTerm, setSearchTerm] = useState(search);
  const [results, setResults] = useState(null);
  const history = useHistory();

  const fetchAlbums = async (search) => {
    const results = await client.findBooks(search);
    setResults(results);
    setSearchTerm(search);
  };

  useEffect(() => {
    if (search) {
      fetchAlbums(search);
    }
  }, [search]);

  return (
    <div>
      <h1>Search</h1>
      <button
        onClick={() => history.push(`/search/${searchTerm}`)}
        className="btn btn-primary float-end"
      >
        Search
      </button>
      <input
        type="text"
        className="form-control w-75"
        placeholder="Search..."
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <h2>Results</h2>
      <ul className="list-group">
        {results &&
          results.map((book, index) => (
            <li key={index} className="list-group-item">
              {/* <Link to={`/details/${book.id}`}>
                <h3>{album.name}</h3>
                <img
                  src={`https://api.napster.com/imageserver/v2/albums/${album.id}/images/300x300.jpg`}
                  alt={album.name}
                />
              </Link> */}
              <Link to={book.selfLink}></Link>
            </li>
          ))}
      </ul>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}

export default SearchAPI;
