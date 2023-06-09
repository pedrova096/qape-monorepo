import type { FieldValidation } from 'svelte-forms';

export const lengthBetween =
  (min: number, max: number) =>
  (value: string = ''): FieldValidation => ({
    valid: value.length >= min && value.length <= max,
    name: 'length_between',
  });

export const optionalLengthBetween =
  (min: number, max: number) =>
  (value: string = ''): FieldValidation => ({
    valid: value === '' || (value.length >= min && value.length <= max),
    name: 'length_between',
  });
