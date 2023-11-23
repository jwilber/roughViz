export const DEFAULT_CEILING = 20;
export const DEFAULT_VALUE = 1;

export const roughCeiling = ({
  roughness,
  ceiling = DEFAULT_CEILING,
  defaultValue = DEFAULT_VALUE,
}) => {
  if (roughness === undefined || typeof roughness !== "number")
    return defaultValue;

  return roughness > ceiling ? ceiling : roughness;
};
