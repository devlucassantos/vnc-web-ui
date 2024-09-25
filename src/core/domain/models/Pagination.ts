import DTO from '@typing/http/DTO';
import Model from './model';

class Pagination<T extends Model> {
    private _page: number;
    private _itemsPerPage: number;
    private _total: number;
    private _data: T[];

    constructor(page: number, perPage: number, total: number, data: T[]) {
        this._page = page;
        this._itemsPerPage = perPage;
        this._total = total;
        this._data = data;
    }

    static fromJSON<T extends Model>(
        json: DTO,
        itemFactory: (json: DTO) => T
    ): Pagination<T> {
        return new Pagination(
            Number(json['page']),
            Number(json['items_per_page']),
            Number(json['total']),
            (json['data'] as DTO[])?.map(itemFactory)
        );
    }

    get page(): number {
        return this._page;
    }

    get itemsPerPage(): number {
        return this._itemsPerPage;
    }

    get total(): number {
        return this._total;
    }

    get data(): T[] {
        return this._data;
    }

    get maxPageCount(): number {
        return Math.ceil(this.total / this.itemsPerPage);
    }
}

export { Pagination };