export const transitionEase = [0.16, 1, 0.3, 1];

export const pageTransitionTiming = {
  enterDelay: 0.12,
  enterDuration: 0.34,
  exitDuration: 0.18,
};

export const stairTransitionTiming = {
  columns: 6,
  panelDuration: 0.34,
  stagger: 0.055,
};

export const stairTransitionDuration =
  stairTransitionTiming.panelDuration +
  stairTransitionTiming.stagger * (stairTransitionTiming.columns - 1);
