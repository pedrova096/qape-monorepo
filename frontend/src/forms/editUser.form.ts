import { form, field } from 'svelte-forms';
import {
  required,
  email as emailVal,
  matchField,
  between,
} from 'svelte-forms/validators';
import { lengthBetween, optionalLengthBetween } from './validator';

export type EditUserFormType = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const initialValues: EditUserFormType = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

export const name = field('name', initialValues.name, [required()]);
export const email = field('email', initialValues.email, [emailVal()]);
export const password = field('password', initialValues.password, [
  optionalLengthBetween(6, 100),
]);
export const passwordConfirmation = field(
  'passwordConfirmation',
  initialValues.passwordConfirmation,
  [optionalLengthBetween(6, 100), matchField(password)]
);

const editUserForm = form(name, email, password, passwordConfirmation);

export default editUserForm;
