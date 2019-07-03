import React, { Component } from "react";
import line from "../../../img/graphLine.svg";
import bar from "../../../img/graphBar.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/graphMenu.css";

class GraphMenu extends Component {
  state = {
    selectedType: "bar",
    selectedFreq: "Week",
    dateFormat: "ww/yyyy",
    startDate: new Date()
  };

  handleDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleFreqTime = async (freq, dateFormat) => {
    await this.setState({
      selectedFreq: freq,
      dateFormat: dateFormat
    });
    this.props.handleChangeFreq(this.state.selectedFreq);
  };

  handleType = async type => {
    await this.setState({ selectedType: type });
    this.props.handleChangeType(this.state.selectedType);
  };

  render() {
    // Object distructuring
    const { selectedFreq, startDate, dateFormat } = this.state;
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
            {selectedFreq}
          </button>

          <div className="dropdown-menu">
            <a
              onClick={() => {
                this.handleFreqTime("Week", "ww/yyyy");
              }}
              className="dropdown-item"
            >
              Week
            </a>
            <a
              onClick={() => {
                this.handleFreqTime("Month", "MM/yyyy");
              }}
              className="dropdown-item"
            >
              Month
            </a>
            <a
              onClick={() => {
                this.handleFreqTime("Year", "yyyy");
              }}
              className="dropdown-item"
            >
              Year
            </a>
          </div>
        </div>
        <DatePicker
          className="datePicker"
          selected={startDate}
          onChange={this.handleDateChange}
          dateFormat={dateFormat}
        />
        <div className="graphType-btn-cont">
          <button
            onClick={() => {
              this.handleType("line");
            }}
          >
            <img className="graphType-btn" src={line} alt="linesGraph" />
          </button>
          <button
            onClick={() => {
              this.handleType("bar");
            }}
          >
            <img className="graphType-btn" src={bar} alt="barGraph" />
          </button>
        </div>
      </div>
    );
  }
}

export default GraphMenu;
