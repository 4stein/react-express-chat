import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import isToday from "date-fns/isToday";

const Time = ({ date }) => {
  let timeNow = "";
  if (isToday(date)) {
    timeNow = format(date, "HH:mm");
  } else {
    timeNow = format(date, "dd.MM.yyyy");
  }
  return <>{timeNow}</>;
};

Time.propTypes = {
  date: PropTypes.instanceOf(Date) || PropTypes.string,
};

export default Time;
