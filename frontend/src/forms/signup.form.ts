import { form, field } from 'svelte-forms';
import {
  required,
  email as emailVal,
  matchField,
  between,
} from 'svelte-forms/validators';
import { lengthBetween } from './validator';

export type SignupFormType = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const initialValues: SignupFormType = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

export const name = field('name', initialValues.name, [required()]);
export const email = field('email', initialValues.email, [emailVal()]);
export const password = field('password', initialValues.password, [
  lengthBetween(6, 100),
]);
export const passwordConfirmation = field(
  'passwordConfirmation',
  initialValues.passwordConfirmation,
  [lengthBetween(6, 100), matchField(password)]
);

const signupForm = form(name, email, password, passwordConfirmation);

export default signupForm;
