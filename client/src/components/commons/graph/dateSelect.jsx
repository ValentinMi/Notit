import React, { Component } from "react";
import DatePicker from "react-datepicker";

class DateSelect extends Component {
  state = {
    dateFormat: "ww/yyyy",
    startDate: new Date()
  };

  componentDidUpdate(prevProps) {
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
      startDate: date
    });
  };

  render() {
    const { startDate, dateFormat } = this.state;
    return (
      <DatePicker
        className="datePicker"
        selected={startDate}
        onChange={this.handleDateSelect}
        dateFormat={dateFormat}
      />
    );
  }
}

export default DateSelect;
