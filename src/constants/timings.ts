let timeArray: { name: string }[] = [];
for (let i = 7; i <= 23; i++) {
  for (let j = 0; j < 60; j += 5) {
    if (i === 23 && j > 0) break; // Stop at 23:00 (11:00 م)
    let hours = i < 12 ? i : i === 12 ? 12 : i - 12; // Convert to 12-hour format
    let formattedHours = hours < 10 ? "0" + hours : hours;
    let minutes = j < 10 ? "0" + j : j;
    let time = `${formattedHours}:${minutes}${i < 12 ? " ص" : " م"}`;
    timeArray.push({ name: time });
  }
}

export default timeArray;
