import { field, form } from 'svelte-forms';
import type { QuerySearchItem } from '~/services/item.services';

const initialValues: QuerySearchItem = {
  brand: '',
  minPrice: null as unknown as number,
  maxPrice: null as unknown as number,
  hasRight: undefined,
  hasLeft: undefined,
  hasCharger: undefined,
};

export const brand = field('brand', initialValues.brand);
export const minPrice = field('minPrice', initialValues.minPrice);
export const maxPrice = field('maxPrice', initialValues.maxPrice);
export const hasRight = field('hasRight', initialValues.hasRight);
export const hasLeft = field('hasLeft', initialValues.hasLeft);
export const hasCharger = field('hasCharger', initialValues.hasCharger);

const filterForm = form(
  brand,
  minPrice,
  maxPrice,
  hasRight,
  hasLeft,
  hasCharger
);

export default filterForm;
