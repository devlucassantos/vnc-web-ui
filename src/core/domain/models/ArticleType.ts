import Model from "./model";
import {convertToISODate, formatCustomDateTime} from "../../utils/dateUtils";
import DTO from "@typing/http/DTO";
import Article from "@models/Article";

class ArticleType extends Model {
    private _id: string;
    private _description: string;
    private _color: string;
    private _sortOrder: number;
    private _createdAt: string;
    private _updatedAt: string;
    private _propositionArticles: Article[];

    constructor() {
        super();
        this._id = this._description = this._color = this._createdAt = this._updatedAt = '';
        this._sortOrder = 0;
        this._propositionArticles = [];
    }

    get id() {
        return this._id;
    }

    get description() {
        return this._description;
    }

    get color() {
        return this._color;
    }

    set setDescription(description: string) {
        this._description = description;
    }

    set setColor(color: string) {
        this._color = color;
    }

    get createdAt(): string {
        return this._createdAt;
    }

    get updatedAt(): string {
        return this._updatedAt;
    }

    set updatedAt(value: string) {
        this._updatedAt = value;
    }

    get sortOrder(): number {
        return this._sortOrder;
    }

    set sortOrder(value: number) {
        this._sortOrder = value;
    }

    get propositionArticles(): Article[] {
        return this._propositionArticles ?? [];
    }

    set propositionArticles(value: Article[]) {
        this._propositionArticles = value;
    }

    toJSON(): DTO {
        let dto = {} as DTO;
        dto['id'] = this._id;
        dto['description'] = this._description;
        dto['color'] = this._color;
        dto['sort_order'] = this._sortOrder;
        dto['articles'] = this.propositionArticles?.map(propositionArticle => propositionArticle.toJSON());
        dto['created_at'] = convertToISODate(this._createdAt);
        dto['updated_at'] = convertToISODate(this._updatedAt);
        return dto;
    }

    static fromJSON(json: DTO<any>): ArticleType {
        const obj = new ArticleType();
        obj._id = String(json['id']);
        obj._description = String(json['description']);
        obj._color = String(json['color']);
        obj._sortOrder = Number(json['sort_order']);
        obj._propositionArticles = json['articles']?.map((propositionArticleJSON: DTO) => Article.fromJSON(propositionArticleJSON));
        obj._createdAt = formatCustomDateTime(String(json['created_at']));
        obj._updatedAt = formatCustomDateTime(String(json['updated_at']));
        return obj;
    }
}

export default ArticleType;