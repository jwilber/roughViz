const DEFAULT_CEILING = 20;
const DEFAULT_VALUE = 1;

const roughCeiling = ({ roughness, ceiling = DEFAULT_CEILING, defaultValue = DEFAULT_VALUE }) => {
  if (roughness === undefined || typeof roughness !== 'number') return defaultValue;

  return roughness > ceiling ? ceiling : roughness;
};

module.exports = {
  roughCeiling,
  DEFAULT_CEILING,
  DEFAULT_VALUE,
};
