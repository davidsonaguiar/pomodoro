function secondsToTime(seconds: number) {
  const N_SECONDS_IN_MINUTE = 60;
  const zeroLeft = (num: number) => num.toString().padStart(2, "0");
  const reset = (num: number) => num == N_SECONDS_IN_MINUTE ? 0: num;
  const minutes = Math.floor(seconds / N_SECONDS_IN_MINUTE);
  const restSeconds = seconds - (N_SECONDS_IN_MINUTE * minutes);
  return `${zeroLeft(reset(minutes))}:${zeroLeft(reset(restSeconds))}`;
}

export default secondsToTime;