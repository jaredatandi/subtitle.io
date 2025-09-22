import moment from "moment";

export const convertToDigitalClockFormat = (timestampInSeconds: number) => {
  let duration = moment.duration(timestampInSeconds, "seconds");
  let formattedTime = moment.utc(duration.asMilliseconds()).format("HH:mm:ss");

  return formattedTime;
};
