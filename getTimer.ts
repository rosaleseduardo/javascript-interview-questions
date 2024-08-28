/**
 * @description Create a function `getTime`. This functions takes in a string
 * that is in ISO Format (2011-10-05T14:48:00.000Z) and it should return an
 * object that could be used for a timer functionality (a humand readable timer).
 * So, this object specifically is gonna have
 * { hours:number, minutes: number, seconds: number } and it is going to describe
 * how many hours, minutes and seconds there are from the moment you run the
 * function unil the date being passed.
 */
const timerInfo = { hours: 0, minutes: 0, seconds: 0 };

const getTimer = (
  isoDate: string,
  timerInfo: Record<"hours" | "minutes" | "seconds", number>
) => {
  const currentDate = new Date(isoDate);
  const timeTillDate = currentDate.getMilliseconds() - Date.now();

  const seconds = Math.floor(timeTillDate / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  timerInfo.seconds = seconds % 60;
  timerInfo.minutes = minutes % 60;
  timerInfo.hours = hours;

  return timerInfo;
};

console.log(
  getTimer("2022-04-30T00:00:00.000", {
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
);
