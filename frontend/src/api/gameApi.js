import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/game";
const LEADERBOARD_URL = "http://127.0.0.1:8000/api/leaderboard";

export const startGame = async (category) => {
  const res = await axios.post(`${BASE_URL}/start/`, { category });
  return res.data;
};

export const guessLetter = async (gameId, letter) => {
  const res = await axios.post(`${BASE_URL}/guess/${gameId}/`, { letter });
  return res.data;
};

export const guessFullPhrase = async (gameId, phrase) => {
  const res = await axios.post(`${BASE_URL}/guess-full/${gameId}/`, { phrase });
  return res.data;
};

export const getLeaderboard = async () => {
  const res = await axios.get(`${LEADERBOARD_URL}/`);
  return res.data;
};

export const submitScore = async (username, score) => {
  const res = await axios.post(`${LEADERBOARD_URL}/submit/`, { username, score });
  return res.data;
};