import { form, field } from 'svelte-forms';
import { email as emailVal } from 'svelte-forms/validators';
import { lengthBetween } from './validator';

export type LoginFormType = {
  email: string;
  password: string;
};

export const initialValues: LoginFormType = {
  email: '',
  password: '',
};

export const email = field('email', initialValues.email, [emailVal()]);
export const password = field('password', initialValues.password, [
  lengthBetween(6, 100),
]);

const loginForm = form(email, password);

export default loginForm;
