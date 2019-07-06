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
function getAllNotes() {
  return http.get(apiEndPoint);
}

// GET NOTES FROM CURRENT USER
function getUserNotes() {
  return http.get(apiEndPoint + "/mine");
}

//////////////////
// CURRENT DATA //
//////////////////

// GET CURRENT WEEK NOTES
function getCurrentWeekNotes() {
  return http.get(apiEndPoint + "/mine/week");
}

// GET CURRENT MONTH NOTES
function getCurrentMonthNotes() {
  return http.get(apiEndPoint + "/mine/month");
}

// GET CURRENT YEAR NOTES
function getCurrentYearNotes() {
  return http.get(apiEndPoint + "/mine/year");
}

///////////////////
// SPECIFIC DATA //
///////////////////

// GET SPECIFIC WEEK NOTES
function getSpecificWeekNotes(week, year) {
  return http.get(`${apiEndPoint}/mine/${year}/${week}`);
}

// GET SPECIFIC MONTH NOTES
function getSpecificMonthNotes(month, year) {
  return http.get(`${apiEndPoint}/mine/${year}/${month}`);
}

// GET SPECIFIC YEAR NOTES
function getSpecificYearNotes(year) {
  return http.get(`${apiEndPoint}/mine/${year}`);
}

export default {
  getAllNotes,
  getUserNotes,
  getCurrentWeekNotes,
  getCurrentMonthNotes,
  getCurrentYearNotes,
  getSpecificWeekNotes,
  getSpecificMonthNotes,
  getSpecificYearNotes,
  saveNote
};
