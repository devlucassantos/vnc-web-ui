import Model from './model';
import DTO from "../types/http/DTO";
import {formatCustomDateTime} from "../../utils/dateUtils";
import ArticleType from "@models/ArticleType";

class Article extends Model {
    private _id: string;
    private _title: string;
    private _content: string;
    private _type: ArticleType;
    private _imageUrl: string;
    private _viewLater: boolean;
    private _numberOfRatings: number;
    private _averageRating: number;
    private _userRating: number;
    private _referenceDateTime: string;
    private _createdAt: string;
    private _updatedAt: string;

    constructor() {
        super();
        this._id = this._title = this._content = this._imageUrl = this._referenceDateTime = this._createdAt = this._updatedAt = '';
        this._viewLater = false;
        this._numberOfRatings = this._averageRating = this._userRating = 0;
        this._type = new ArticleType()
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

    get type(): ArticleType {
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

    set setType(value: ArticleType) {
        this._type = value;
    }

    set setUpdatedAt(updatedAt: string) {
        this._updatedAt = updatedAt;
    }

    get imageUrl(): string {
        return this._imageUrl;
    }

    set imageUrl(value: string) {
        this._imageUrl = value;
    }

    get viewLater(): boolean {
        return this._viewLater;
    }

    set viewLater(value: boolean) {
        this._viewLater = value;
    }

    get numberOfRatings(): number {
        return this._numberOfRatings;
    }

    set numberOfRatings(value: number) {
        this._numberOfRatings = value;
    }

    get averageRating(): number {
        return this._averageRating;
    }

    set averageRating(value: number) {
        this._averageRating = value;
    }

    get userRating(): number {
        return this._userRating;
    }

    set userRating(value: number) {
        this._userRating = value;
    }

    get referenceDateTime(): string {
        return this._referenceDateTime;
    }

    set referenceDateTime(value: string) {
        this._referenceDateTime = value;
    }

    toJSON(): DTO {
        let dto = {} as DTO;
        dto['id'] = this._id;
        dto['title'] = this._title;
        dto['content'] = this._content;
        dto['type'] = this._type?.toJSON();
        dto['image_url'] = this._imageUrl;
        dto['view_later'] = this._viewLater;
        dto['number_of_ratings'] = this._numberOfRatings;
        dto['average_rating'] = this._averageRating;
        dto['user_rating'] = this._userRating;
        dto['reference_date_time'] = this._referenceDateTime;
        dto['created_at'] = this._createdAt;
        dto['updated_at'] = this._updatedAt;
        return dto;
    }

    static fromJSON(json: DTO<any>): Article {
        const obj = new Article();
        obj._id = String(json['id']);
        obj._title = String(json['title']);
        obj._content = String(json['content']);
        obj._type = ArticleType.fromJSON(json['type']);
        obj._imageUrl = String(json['image_url']);
        obj._viewLater = Boolean(json['view_later']);
        obj._numberOfRatings = Number(json['number_of_ratings']);
        obj._averageRating = Number(json['average_rating']);
        obj._userRating = Number(json['user_rating']);
        obj._referenceDateTime = formatCustomDateTime(String(json['reference_date_time']));
        obj._createdAt = formatCustomDateTime(String(json['created_at']));
        obj._updatedAt = formatCustomDateTime(String(json['updated_at']));
        return obj;
    }
}

export default Article;
