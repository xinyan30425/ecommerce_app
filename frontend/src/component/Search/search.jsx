import React, { useState, useEffect } from "react";
import { API_KEY } from "./client";
import * as client from "./client";
import { Link, useParams, useHistory } from "react-router-dom";
import ProductCard from "../Home/ProductCard";
import axios from "axios";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

function SearchAPI() {
  const { search } = useParams();
  const [searchTerm, setSearchTerm] = useState(search);
  const [results, setResults] = useState([]);
  const history = useHistory();
  const { pathname } = useLocation();

  const fetchAlbums = async (search) => {
    const results = await client.findBooks(search);
    const selfLinks = await Promise.all(results.map(async (book) => {
      const response = await axios.get(book.selfLink);
      return response.data;
    }));
    setResults(selfLinks);
    setSearchTerm(search);
  };

  useEffect(() => {
    if (search) {
      fetchAlbums(search);
    }
  }, [search]);

  // console.log(results)
  // if (results) {
  //   results.map((book) => {
  //     console.log(book)
  //   })
  // }

  return (
    <div>
      {pathname.includes('search') && <h1>Search</h1>}
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
      {pathname.includes('search') &&
        <>
          <h2>Results</h2>
          <div className={results.length < 2 ? "products1" : "products"}>
            {results &&
              results.map((book, index) => (
                <ProductCard key={book.id}
                  product={{
                    name: book.volumeInfo.title,
                    description: book.volumeInfo.description ? book.volumeInfo.description : "No description",
                    price: book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount : "?",
                    images: [{ product_id: book.id, url: book.volumeInfo.imageLinks.large }]
                  }} />
              ))}
          </div>
        </>
      }

      {/* <pre>{JSON.stringify(results, null, 2)}</pre> */}
    </div>
  );
}

export default SearchAPI;
