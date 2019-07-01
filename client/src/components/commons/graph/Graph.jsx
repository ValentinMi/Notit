import { Component } from "react";
import noteService from "../../../services/noteService";

class Graph extends Component {
  ////////////
  // METHOD //
  ////////////

  changeGraphType = freq => {
    this.setState({ freq: freq });
  };

  // Get notes from current week
  getWeekNotes = async () => {
    const data = await noteService.getCurrentWeekNotes();
    const notes = this.pushNotesInArray(data);
    const notesValue = [];
    notes.forEach(note => {
      notesValue.push(note.value);
    });
    const weekBarGraphData = {
      labels: ["M", "Th", "W", "T", "F", "S", "Sn"],
      datasets: [
        {
          data: notesValue,
          backgroundColor: this.assignColor(notesValue)
        }
      ]
    };
    this.setState({ weekGraph: weekBarGraphData });
  };

  // Get notes from current month and make an average from each weeks notes
  getMonthNotes = async () => {
    // Fetch month's notes from db
    const data = await noteService.getCurrentMonthNotes();
    const notes = this.pushNotesInArray(data);
    const notesValue = [];
    notes.forEach(note => {
      notesValue.push(note.value);
    });

    const weeksNotesAverage = this.splitNotesInWeekAverageArray(notesValue);
    const monthBarGraphData = {
      labels: ["1st", "2nd", "3rd", "4th"],
      datasets: [
        {
          data: weeksNotesAverage,
          backgroundColor: this.assignColor(weeksNotesAverage)
        }
      ]
    };
    this.setState({ monthGraph: monthBarGraphData });
  };

  // Get notes from current year and make an average from each months notes
  getYearNotes = async () => {
    // Fetch notes from current year
    const data = await noteService.getCurrentYearNotes();
    const notes = this.pushNotesInArray(data);
    const monthsAverages = this.splitNotesInMonthAverageArray(notes);
    const yearBarGraphData = {
      labels: ["J", "F", "M", "A", "M", "J", "Jl", "A", "S", "O", "N", "D"],
      datasets: [
        {
          data: monthsAverages,
          backgroundColor: this.assignColor(monthsAverages)
        }
      ]
    };
    this.setState({ yearGraph: yearBarGraphData });
  };

  // Split notes in months Arrays and get average of them
  splitNotesInMonthAverageArray = notes => {
    // Split year's notes into 12 months Arrays
    const jan = [];
    const feb = [];
    const mar = [];
    const apr = [];
    const may = [];
    const jun = [];
    const jul = [];
    const aug = [];
    const sep = [];
    const oct = [];
    const nov = [];
    const dec = [];

    // Push note in the good month array based on their month number
    notes.forEach(note => {
      switch (note.month) {
        case 1:
          jan.push(note.value);
          break;
        case 2:
          feb.push(note.value);
          break;
        case 3:
          mar.push(note.value);
          break;
        case 4:
          apr.push(note.value);
          break;
        case 5:
          may.push(note.value);
          break;
        case 6:
          jun.push(note.value);
          break;
        case 7:
          jul.push(note.value);
          break;
        case 8:
          aug.push(note.value);
          break;
        case 9:
          sep.push(note.value);
          break;
        case 10:
          oct.push(note.value);
          break;
        case 11:
          nov.push(note.value);
          break;
        case 12:
          dec.push(note.value);
          break;
        default:
          break;
      }
    });

    // Push month Array into new year Array
    const yearNotesPerMonth = [
      jan,
      feb,
      mar,
      apr,
      may,
      jun,
      jul,
      aug,
      sep,
      oct,
      nov,
      dec
    ];
    // Make an average for each month and push it into new Array
    const monthsAverages = [];
    yearNotesPerMonth.forEach(array => {
      monthsAverages.push(Math.round(this.createAverage(array)));
    });

    return monthsAverages;
  };

  // Split notes in weeks Arrays and get average of them
  splitNotesInWeekAverageArray = notes => {
    // Split month's notes into 4 weeks Arrays
    const firstWeekNotes = [];
    const secondWeekNotes = [];
    const thirdWeekNotes = [];
    const fourthWeekNotes = [];
    for (let i = 0; i < notes.length; i++) {
      if (i <= 6) {
        firstWeekNotes.push(notes[i]);
      } else if (i <= 13) {
        secondWeekNotes.push(notes[i]);
      } else if (i <= 20) {
        thirdWeekNotes.push(notes[i]);
      } else {
        fourthWeekNotes.push(notes[i]);
      }
    }
    // Make an month Array with the 4 weeks Arrays average in
    const weeksNotesAverage = [
      Math.round(this.createAverage(firstWeekNotes)),
      Math.round(this.createAverage(secondWeekNotes)),
      Math.round(this.createAverage(thirdWeekNotes)),
      Math.round(this.createAverage(fourthWeekNotes))
    ];

    return weeksNotesAverage;
  };

  // Make an average from array's value
  createAverage = array => {
    var sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum = sum + array[i];
    }
    var average = sum / array.length;
    return average;
  };

  // Push all notes in an array
  pushNotesInArray = data => {
    data = data.data;
    const notes = [];
    data.forEach(note => {
      notes.push(note);
    });
    return notes;
  };

  // Assign color to value
  assignColor = notes => {
    var colors = [];
    notes.forEach(note => {
      switch (note) {
        case 1:
          colors.push("#f44242");
          break;
        case 2:
          colors.push("#f49b41");
          break;
        case 3:
          colors.push("#f4ee41");
          break;
        case 4:
          colors.push("#a0f441");
          break;
        case 5:
          colors.push("#20b419");
          break;
        default:
          colors.push("red");
          break;
      }
    });
    return colors;
  };
}

export default Graph;
