import axios from "axios";
export const GOOGLE_API = "https://www.googleapis.com/books/v1";
export const API_KEY = process.env.REACT_APP_GOOGLE_BOOK_API_KEY;

export const findBooks = async (searchTerm) => {
  const response = await axios.get(
    `${GOOGLE_API}/volumes?q=${searchTerm}+intitle:keyes&key=${API_KEY}`
  );
  return response.data.items;
};

export const findAlbumById = async (albumId) => {
  const response = await axios.get(
    `${GOOGLE_API}/albums/${albumId}?apikey=${API_KEY}`
  );
  return response.data.albums[0];
};

export const findTracksByAlbumId = async (albumId) => {
  const response = await axios.get(
    `${GOOGLE_API}/albums/${albumId}/tracks?apikey=${API_KEY}`
  );
  return response.data.tracks;
};
