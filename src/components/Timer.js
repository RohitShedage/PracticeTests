import React from "react";

function formatSecondsToHHMMSS(seconds) {
  var date = new Date(1970, 0, 1);
  date.setSeconds(seconds);
  return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}

function formatSecondsToMMSS(seconds) {
  return (
    (seconds - (seconds %= 60)) / 60 + (9 < seconds ? ":" : ":0") + seconds
  );
}

function Timer(props) {
  return (
    <>
      {props.format === "HHMMSS"
        ? formatSecondsToHHMMSS(props.timeInSeconds)
        : formatSecondsToMMSS(props.timeInSeconds)}
    </>
  );
}

export default Timer;
