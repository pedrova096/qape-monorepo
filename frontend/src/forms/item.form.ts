import { field, form } from 'svelte-forms';
import { required } from 'svelte-forms/validators';
import type { ItemRequest } from '~/services/item.services';

const initialValues: ItemRequest = {
  brand: '',
  model: '',
  price: null as unknown as number,
  description: '',
  hasLeft: false,
  hasRight: false,
  hasCharger: false,
  isNew: false,
};

export const brand = field('brand', initialValues.brand, [required()]);
export const model = field('model', initialValues.model, [required()]);
export const price = field('price', initialValues.price, [required()]);
export const description = field('description', initialValues.description, [
  required(),
]);
export const hasLeft = field('hasLeft', initialValues.hasLeft, [required()]);
export const hasRight = field('hasRight', initialValues.hasRight, [required()]);
export const hasCharger = field('hasCharger', initialValues.hasCharger, [
  required(),
]);
export const isNew = field('isNew', initialValues.isNew, [required()]);

export const createItemForm = form(
  brand,
  model,
  price,
  description,
  hasLeft,
  hasRight,
  hasCharger,
  isNew
);
