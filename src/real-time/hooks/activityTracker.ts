import throttle from "lodash.throttle";
import { socket } from "../context/signals";

const handleActivity = throttle(
  () => {
    socket.value.emit("visitor:activity");
  },
  5000,
  { leading: false, trailing: true }
);

const handleVisibility = () => {
  if (document.visibilityState === "hidden") {
    socket.value.emit("visitor:inactive");
  } else {
    socket.value.emit("visitor:active");
  }
};

export const activityTracker = () => {
  window.addEventListener("mousemove", handleActivity);
  window.addEventListener("keydown", handleActivity);

  window.addEventListener("touchstart", handleActivity, { passive: true });
  window.addEventListener("touchmove", handleActivity, { passive: true });
  window.addEventListener("scroll", handleActivity, { passive: true });

  document.addEventListener("visibilitychange", handleVisibility);
};

export const stopActivityTracker = () => {
  handleActivity.cancel();
  window.removeEventListener("mousemove", handleActivity);
  window.removeEventListener("keydown", handleActivity);

  window.removeEventListener("touchstart", handleActivity);
  window.removeEventListener("touchmove", handleActivity);
  window.removeEventListener("scroll", handleActivity);

  document.removeEventListener("visibilitychange", handleVisibility);
};
