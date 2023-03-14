import { apiService } from './api';

export type ItemResponse = {
  id: number;
  type?: 'earphones' | 'headphones' | 'speakers';
  brand: string;
  model: string;
  price: number;
  description: string;
  hasLeft: boolean;
  hasRight: boolean;
  hasCharger: boolean;
  isNew: boolean;
  userId: number;
  status: 'AVL' | 'SLD' | 'RSV' | 'DEL';
};

export type ItemRequest = Omit<ItemResponse, 'id' | 'userId' | 'status'>;

export type QuerySearchItem = {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  hasRight?: boolean;
  hasLeft?: boolean;
  hasCharger?: boolean;
};

export const getSearchItem = (query?: QuerySearchItem) => {
  return apiService.get<ItemResponse[]>({
    endpoint: `items/search?${
      query ? new URLSearchParams(query as Record<string, string>) : ''
    }`,
  });
};

export const getUserItems = () => {
  return apiService.get<ItemResponse[]>({
    endpoint: `items`,
  });
};

export const getBoughtItems = () => {
  return apiService.get<ItemResponse[]>({
    endpoint: `items/bought`,
  });
};

export const createItem = (item: ItemRequest) => {
  return apiService.post<{ created: ItemResponse }>({
    endpoint: `items`,
    data: { ...item, type: 'earphones' },
  });
};

export const getItemById = (id: number | string) => {
  return apiService.get<ItemResponse>({
    endpoint: `items/${id}`,
  });
};

export const buyItem = (id: number | string) => {
  return apiService.post<ItemResponse>({
    endpoint: `items/${id}/buy`,
  });
};
