import React, { Component } from "react";
import DatePicker from "react-datepicker";
import format from "moment";

class DateSelect extends Component {
  state = {
    dateFormat: "ww/yyyy",
    date: new Date()
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.freq !== prevProps.freq) {
      this.handleDateFormatChange();
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

  handleDateSelect = date => {
    this.setState({
      date: date
    });
  };

  render() {
    const { date, dateFormat } = this.state;
    console.log(date);
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
