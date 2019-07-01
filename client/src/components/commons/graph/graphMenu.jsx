import React, { Component } from "react";
import line from "../../../img/graphLine.svg";
import bar from "../../../img/graphBar.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/graphMenu.css";

class GraphMenu extends Component {
  state = {
    selectedType: "Week",
    dateFormat: "dd/MM/yyyy",
    startDate: new Date()
  };

  handleDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleFreqTime = (freq, dateFormat) => {
    this.setState({
      selectedType: freq,
      dateFormat: dateFormat
    });
  };

  render() {
    return (
      <div className="graphMenu">
        <div className="btn-group freq-btn">
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.state.selectedType}
          </button>

          <div className="dropdown-menu">
            <a
              onClick={async () => {
                await this.handleFreqTime("Week", "dd/MM/yyyy");
                this.props.handleChangeFreq(this.state.selectedType);
              }}
              className="dropdown-item"
            >
              Week
            </a>
            <a
              onClick={async () => {
                await this.handleFreqTime("Month", "MM/yyyy");
                this.props.handleChangeFreq(this.state.selectedType);
              }}
              className="dropdown-item"
            >
              Month
            </a>
            <a
              onClick={async () => {
                await this.handleFreqTime("Year", "yyyy");
                this.props.handleChangeFreq(this.state.selectedType);
              }}
              className="dropdown-item"
            >
              Year
            </a>
          </div>
        </div>
        <DatePicker
          className="datePicker"
          selected={this.state.startDate}
          onChange={this.handleDateChange}
          dateFormat={this.state.dateFormat}
        />
        <div className="graphType-btn-cont">
          <img className="graphType-btn" src={line} alt="linesGraph" />
          <img className="graphType-btn" src={bar} alt="barGraph" />
        </div>
      </div>
    );
  }
}

export default GraphMenu;
