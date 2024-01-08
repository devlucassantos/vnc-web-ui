import Model from './model';
import DTO from "../types/http/DTO";
import {formatCustomDate} from "../../utils/dateUtils";

class News extends Model {
    private _id: string;
    private _title: string;
    private _content: string;
    private _views: number;
    private _type: string;
    private _createdAt: string;
    private _updatedAt: string;

    constructor() {
        super();
        this._id = this._title = this._content = this._type = this._createdAt = this._updatedAt = '';
        this._views = 0;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get content() {
        return this._content;
    }

    get views() {
        return this._views;
    }

    get type() {
        return this._type;
    }

    get createdAt() {
        return this._createdAt;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    set setTitle(title: string) {
        this._title = title;
    }

    set setContent(content: string) {
        this._content = content;
    }

    set setViews(views: number) {
        this._views = views;
    }

    set setType(type: string) {
        this._type = type;
    }

    set setUpdatedAt(updatedAt: string) {
        this._updatedAt = updatedAt;
    }

    toJSON(): DTO {
        let dto = {} as DTO;
        dto['id'] = this._id;
        dto['title'] = this._title;
        dto['content'] = this._content;
        dto['views'] = this._views;
        dto['type'] = this._type;
        dto['created_at'] = this._createdAt;
        dto['updated_at'] = this._updatedAt;
        return dto;
    }

    static fromJSON(json: DTO): News {
        const obj = new News();
        obj._id = String(json['id']);
        obj._title = String(json['title']);
        obj._content = String(json['content']);
        obj._views = Number(json['views']);
        obj._type = String(json['type']);
        obj._createdAt = formatCustomDate(String(json['created_at']));
        obj._updatedAt = formatCustomDate(String(json['updated_at']));
        return obj;
    }
}

export default News;
