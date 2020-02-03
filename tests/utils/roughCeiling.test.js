import { roughCeiling, DEFAULT_CEILING, DEFAULT_VALUE } from '../../src/utils/roughCeiling';

describe('roughCeiling', () => {
  test('Should return the value when below the default ceiling', () => {
    const roughness = DEFAULT_CEILING - 4;
    const result = roughCeiling({ roughness });

    expect(result).toEqual(roughness);
  });

  test('Should return the default ceiling value when above the default ceiling', () => {
    const roughness = DEFAULT_CEILING + 3;
    const result = roughCeiling({ roughness });

    expect(result).toEqual(DEFAULT_CEILING);
  });

  test('Should return the given ceiling when roughness value is above', () => {
    const ceiling = 12;
    const roughness = ceiling + 3;
    const result = roughCeiling({ roughness, ceiling });

    expect(result).toEqual(ceiling);
  });

  test('Should return the default value when no values are provided', () => {
    const result = roughCeiling({});

    expect(result).toEqual(DEFAULT_VALUE);
  });

  test('Should return the given default value when a roughness value is not provided', () => {
    const defaultValue = 4;
    const result = roughCeiling({ defaultValue });

    expect(result).toEqual(defaultValue);
  });

  test('Should return the value when 0', () => {
    const roughness = 0;
    const result = roughCeiling({ roughness, ceiling: 25, defaultValue: 1 });

    expect(result).toEqual(roughness);
  });

  test('Should return the default value when roughness is not a number', () => {
    const roughness = '100';
    const result = roughCeiling({ roughness, ceiling: 25 });

    expect(result).toEqual(DEFAULT_VALUE);
  });
});
