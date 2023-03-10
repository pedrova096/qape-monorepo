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

export const getUserItems = () => {
  return apiService.get<ItemResponse[]>({
    endpoint: `items`,
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
