const KeyframeGenerator = require("./KeyframeGenerator.bs");

module.exports.generateKeyframes = KeyframeGenerator.generateKeyframes;

module.exports.EasingType = {
  linear: KeyframeGenerator.linear,
  easeIn: KeyframeGenerator.easeIn,
  easeOut: KeyframeGenerator.easeOut,
  easeInEaseOut: KeyframeGenerator.easeInEaseOut
};
