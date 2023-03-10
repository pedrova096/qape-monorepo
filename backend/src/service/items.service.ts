import { Op, WhereOptions } from 'sequelize';
import DB from '../database';
import type { Item } from '../database/models/items.model';
import { isEmpty } from '../utility/common';
import { RequestError } from '../utility/errorClass';

class ItemService {
  public items = DB.Items;

  _NOT_DELETED: WhereOptions<Item> = { status: { [Op.not]: 'DEL' } };

  public async findItemsByUserId(userId: number): Promise<Item[]> {
    const findItems = await this.items.findAll({
      where: {
        ...this._NOT_DELETED,
        userId,
      },
    });

    if (!findItems) {
      throw new RequestError({
        status: 404,
        message: 'Item no existe',
        code: 'ITEM_NOT_EXISTS',
      });
    }

    return findItems;
  }

  public async findItemById(itemId: number, userId?: number): Promise<Item> {
    let having = this._NOT_DELETED;
    if (!isEmpty(userId)) {
      having = { ...having, userId };
    }

    const findItem = await this.items.findOne({
      where: {
        id: itemId,
        ...having,
      },
    });

    if (!findItem) {
      throw new RequestError({
        status: 404,
        message: 'Item no existe',
        code: 'ITEM_NOT_EXISTS',
      });
    }

    return findItem;
  }

  public async createItem(itemData: Item): Promise<Item> {
    if (isEmpty(itemData)) {
      throw new RequestError({
        status: 400,
        message: 'data recibida esta vacía',
        code: 'ITEM_PAYLOAD_EMPTY',
      });
    }

    if (itemData.isNew) {
      itemData.hasLeft = true;
      itemData.hasRight = true;
      itemData.hasCharger = true;
    }

    const item = await this.items.create(itemData);

    return item;
  }

  public async updateItem(
    itemId: number,
    userId: number,
    itemData: Partial<Item>
  ): Promise<Item> {
    if (isEmpty(itemData)) {
      throw new RequestError({
        status: 400,
        message: 'data recibida esta vacía',
        code: 'ITEM_PAYLOAD_EMPTY',
      });
    }

    const findItem = await this.findItemById(itemId, userId);

    const [countRowsEdited, [updatedItemData]] = await this.items.update(
      { ...itemData, userId: findItem.userId },
      {
        where: {
          id: findItem.id,
        },
        returning: true,
      }
    );

    return updatedItemData;
  }

  public async deleteItem(itemId: number, userId: number): Promise<Item> {
    const findItem = await this.updateItem(itemId, userId, { status: 'DEL' });

    return findItem;
  }

  public async searchItemsByFilters(
    {
      brand,
      minPrice,
      maxPrice,
      hasRight,
      hasLeft,
      hasCharger,
    }: Partial<{
      brand: string;
      minPrice: number;
      maxPrice: number;
      hasRight: boolean;
      hasLeft: boolean;
      hasCharger: boolean;
    }>,
    from = 0,
    limit = 10
  ): Promise<Item[]> {
    const whereFilter: WhereOptions<Item> = {
      status: 'AVL',
    };

    if (brand) {
      whereFilter.brand = {
        [Op.like]: `%${brand}%`,
      };
    }

    if (minPrice) {
      whereFilter.price = {
        [Op.gte]: minPrice,
      };
    }

    if (maxPrice) {
      whereFilter.price = {
        ...(whereFilter.price as object),
        [Op.lte]: maxPrice,
      };
    }

    if (!isEmpty(hasRight)) {
      whereFilter.hasRight = hasRight;
    }

    if (!isEmpty(hasLeft)) {
      whereFilter.hasLeft = hasLeft;
    }

    if (!isEmpty(hasRight)) {
      whereFilter.hasCharger = hasCharger;
    }

    const findItems = await this.items.findAll({
      where: whereFilter,
      limit,
      offset: from,
    });

    return findItems;
  }

  public async getItemsByUserId(userId: number): Promise<Item[]> {
    if (isEmpty(userId)) {
      throw new RequestError({
        status: 400,
        message: 'user id recibido esta vacío',
        code: 'USER_ID_PAYLOAD_EMPTY',
      });
    }

    const findItems = await this.items.findAll({
      where: {
        userId,
        ...this._NOT_DELETED,
      },
    });

    return findItems;
  }
}

export default new ItemService();
