import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/notes";

function noteUrl(id) {
  return `${apiEndPoint}/${id}`;
}

// GET NOTES FROM ALL USERS
export function getAllNotes() {
  return http.get(apiEndPoint);
}

// GET NOTES FROM CURRENT USER
export function getUserNotes() {
  return http.get(apiEndPoint + "/mine");
}

// POST NEW NOTE
export function saveNote(note) {
  return http.post(apiEndPoint, note);
}

export default {
  getAllNotes,
  getUserNotes,
  saveNote
};
