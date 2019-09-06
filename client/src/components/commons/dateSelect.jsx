import React, { Component } from "react";
import DatePicker from "react-datepicker";

class DateSelect extends Component {
  state = {
    dateFormat: "ww/yyyy",
    date: new Date(),
    selectedDateObj: {}
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.freq !== prevProps.freq) {
      this.handleDateFormatChange();
    }
    if (this.state.date !== prevState.date) {
      await this.createDateObj();
      this.props.getSelectDate(this.state.selectedDateObj);
    }
  }

  handleDateFormatChange = () => {
    const { freq } = this.props;
    if (freq === "Week") {
      this.setState({ dateFormat: "ww/yyyy" });
    } else if (freq === "Month") {
      this.setState({ dateFormat: "MM/yyyy" });
    } else {
      this.setState({ dateFormat: "yyyy" });
    }
  };

  handleDateSelect = async date => {
    await this.setState({
      date: date
    });
    // Send selected date to graph
    this.props.getSelectDate(this.state.selectedDateObj);
  };

  getInputValue = () => {
    var input = document.querySelector(".datePicker");
    return input.value;
  };

  createDateObj = () => {
    var rawDate = this.getInputValue();
    const { freq } = this.props;
    var chars = rawDate.split("");

    if (freq === "Week") {
      let dateObj = {
        week: chars[0] + chars[1],
        year: chars[3] + chars[4] + chars[5] + chars[6]
      };
      this.setState({ selectedDateObj: dateObj });
    }

    if (freq === "Month") {
      let dateObj = {
        month: chars[0] + chars[1],
        year: chars[3] + chars[4] + chars[5] + chars[6]
      };
      this.setState({ selectedDateObj: dateObj });
    }

    if (freq === "Year") {
      let dateObj = {
        year: rawDate
      };
      this.setState({ selectedDateObj: dateObj });
    }
  };

  render() {
    const { date, dateFormat } = this.state;
    return (
      <DatePicker
        className="datePicker"
        selected={date}
        onChange={this.handleDateSelect}
        dateFormat={dateFormat}
      />
    );
  }
}

export default DateSelect;
