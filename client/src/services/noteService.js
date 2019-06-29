import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/notes";

// function noteUrl(id) {
//   return `${apiEndPoint}/${id}`;
// }

// POST NEW NOTE
export function saveNote(note) {
  return http.post(apiEndPoint, note);
}

// GET NOTES FROM ALL USERS
export function getAllNotes() {
  return http.get(apiEndPoint);
}

// GET NOTES FROM CURRENT USER
export function getUserNotes() {
  return http.get(apiEndPoint + "/mine");
}

// GET CURRENT WEEK NOTES
export function getCurrentWeekNotes() {
  return http.get(apiEndPoint + "/mine/week");
}

export default {
  getAllNotes,
  getUserNotes,
  getCurrentWeekNotes,
  saveNote
};
