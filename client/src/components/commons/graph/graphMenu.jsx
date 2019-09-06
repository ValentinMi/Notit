import React, { Component } from "react";
import line from "../../../img/graphLine.svg";
import bar from "../../../img/graphBar.svg";
import DateSelect from "../dateSelect";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/graphMenu.css";

class GraphMenu extends Component {
  state = {
    selectedType: "bar",
    selectedFreq: "Week"
  };

  handleFreqTime = async freq => {
    await this.setState({
      selectedFreq: freq
    });
    this.props.handleChangeFreq(this.state.selectedFreq);
  };

  handleType = async type => {
    await this.setState({ selectedType: type });
    this.props.handleChangeType(this.state.selectedType);
    this.props.fetchData();
  };

  render() {
    // Object distructuring
    const { selectedFreq } = this.state;
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
        <DateSelect
          freq={selectedFreq}
          getSelectDate={this.props.getSelectDate}
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
