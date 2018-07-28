let timestepCoefficient = 1.0;
let springFactor = 0.5;
let timestep = 16.667 *. timestepCoefficient;

module StaticEasingFunctions = {
  let linear = (. x) => x;
  let easeIn = BezierEasing.bezier(0.42, 0.0, 1.0, 1.0);
  let easeOut = BezierEasing.bezier(0.0, 0.0, 0.58, 1.0);
  let easeInEaseOut = BezierEasing.bezier(0.42, 0.0, 0.58, 1.0);
};

[@bs.deriving accessors]
type easingType =
  | Linear
  | EaseIn
  | EaseOut
  | EaseInEaseOut;

let generateStaticKeyframes = (ease, duration, delay) => {
  let numSteps = duration /. timestep;
  let timestep = 1.0 /. numSteps;

  let currentX = ref(0.0);
  let keyframes =
    Belt.Array.makeBy(
      int_of_float(numSteps) + 2,
      _ => {
        let curX = currentX^;
        currentX := currentX^ +. timestep;
        ease(. curX);
      },
    );

  Belt.Array.setUnsafe(keyframes, int_of_float(numSteps) + 1, 1.0);
  {"keyframes": keyframes, "duration": duration, "delay": delay};
};

let generateKeyframes = (~ease=EaseInEaseOut, ~delay=0.0, ~duration) => {
  let f =
    switch (ease) {
    | Linear => StaticEasingFunctions.linear
    | EaseIn => StaticEasingFunctions.easeIn
    | EaseOut => StaticEasingFunctions.easeOut
    | EaseInEaseOut => StaticEasingFunctions.easeInEaseOut
    };
  generateStaticKeyframes(f, duration, delay);
};
