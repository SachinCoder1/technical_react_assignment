import axios from "axios";

// Function to fetch data from SWAPI

export const fetchPeople = async (page: number = 1) => {
  const res = await axios.get(`https://swapi.dev/api/people?page=${page}`);
  return res.data;
};

export const fetchPersonById = async (id: string) => {
  const res = await axios.get(`https://swapi.dev/api/people/${id}/`);
  return res.data;
};

export const fetchFilms = async (filmUrls: string[]) => {
  const filmRequests = filmUrls.map((url) => axios.get(url));
  const filmResponses = await Promise.all(filmRequests);
  return filmResponses.map((response) => response.data.title); // Extract film titles
};
