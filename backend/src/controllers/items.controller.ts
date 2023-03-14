import { RequestHandler } from 'express';
import itemsService from '../service/items.service';

export const getItemById: RequestHandler = async (req, res, next) => {
  try {
    const itemId = parseInt(req.params.id);

    const item = await itemsService.findItemById(itemId);

    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const getItems: RequestHandler = async (req, res, next) => {
  try {
    const filters = req.query;

    const limit = filters.limit ? parseInt(filters.limit as string) : undefined;
    const offset = filters.Offset
      ? parseInt(filters.offset as string)
      : undefined;

    const filtersParsed = {
      brand: filters.brand ? (filters.brand as string) : undefined,
      minPrice: filters.minPrice
        ? parseInt(filters.minPrice as string)
        : undefined,
      maxPrice: filters.maxPrice
        ? parseInt(filters.maxPrice as string)
        : undefined,
      hasRight: filters.hasRight ? filters.hasRight === 'true' : undefined,
      hasLeft: filters.hasLeft ? filters.hasLeft === 'true' : undefined,
      hasCharger: filters.hasCharger
        ? filters.hasCharger === 'true'
        : undefined,
    };

    const result = await itemsService.searchItemsByFilters(
      filtersParsed,
      limit,
      offset
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createItem: RequestHandler = async (req, res, next) => {
  try {
    const newItem = req.body;

    newItem.userId = req.user.id;

    const result = await itemsService.createItem(newItem);

    res.json({ created: result });
  } catch (error) {
    next(error);
  }
};

export const updateItemById: RequestHandler = async (req, res, next) => {
  try {
    const itemId = parseInt(req.params.id);
    const itemData = req.body;
    const userId = req.user.id;

    const item = await itemsService.updateItem(itemId, userId, itemData);

    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const deleteItemById: RequestHandler = async (req, res, next) => {
  try {
    const itemId = parseInt(req.params.id);
    const userId = req.user.id;

    const item = await itemsService.deleteItem(itemId, userId);

    res.json({ deleted: item });
  } catch (error) {
    next(error);
  }
};

export const getItemsByUserId: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const items = await itemsService.getItemsByUserId(userId);

    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const buyItemById: RequestHandler = async (req, res, next) => {
  try {
    const itemId = parseInt(req.params.id);
    const userId = req.user.id;

    const item = await itemsService.buyItem(itemId, userId);

    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const getBoughtItems: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const items = await itemsService.getBoughtItems(userId);

    res.json(items);
  } catch (error) {
    next(error);
  }
};
