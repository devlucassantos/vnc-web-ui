import Model from './model';
import DTO from "../types/http/DTO";
import {formatCustomDateTime} from "../../utils/dateUtils";
import ArticleType from "@models/ArticleType";
import ArticleSituation from "@models/ArticleSituation";

class Article extends Model {
    private _id: string;
    private _title: string;
    private _content: string;
    private _type: ArticleType;
    private _situation: ArticleSituation;
    private _multimediaUrl: string;
    private _multimediaDescription: string;
    private _viewLater: boolean;
    private _numberOfRatings: number;
    private _averageRating: number;
    private _userRating: number;
    private _referenceDateTime: string;
    private _createdAt: string;
    private _updatedAt: string;

    constructor() {
        super();
        this._id = this._title = this._content = this._multimediaUrl = this._multimediaDescription = this._referenceDateTime = this._createdAt = this._updatedAt = '';
        this._viewLater = false;
        this._numberOfRatings = this._averageRating = this._userRating = 0;
        this._type = new ArticleType()
        this._situation = new ArticleSituation()
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

    get situation(): ArticleSituation {
        return this._situation;
    }

    get createdAt() {
        return this._createdAt;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    get multimediaUrl(): string {
        return this._multimediaUrl;
    }

    get multimediaDescription(): string {
        return this._multimediaDescription;
    }

    get viewLater(): boolean {
        return this._viewLater;
    }

    get numberOfRatings(): number {
        return this._numberOfRatings;
    }

    get averageRating(): number {
        return this._averageRating;
    }

    get userRating(): number {
        return this._userRating;
    }

    get referenceDateTime(): string {
        return this._referenceDateTime;
    }

    toJSON(): DTO {
        let dto = {} as DTO;
        dto['id'] = this._id;
        dto['title'] = this._title;
        dto['content'] = this._content;
        dto['type'] = this._type?.toJSON();
        dto['situation'] = this._situation?.toJSON();
        dto['multimedia_url'] = this._multimediaUrl;
        dto['multimedia_description'] = this._multimediaDescription;
        dto['view_later'] = this._viewLater;
        dto['number_of_ratings'] = this._numberOfRatings;
        dto['average_rating'] = this._averageRating;
        dto['user_rating'] = this._userRating;
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
        obj._situation = json['situation'] ? ArticleSituation.fromJSON(json['situation']) : new ArticleSituation();
        obj._multimediaUrl = String(json['multimedia_url']);
        obj._multimediaDescription = String(json['multimedia_description']);
        obj._viewLater = Boolean(json['view_later']);
        obj._numberOfRatings = Number(json['number_of_ratings']);
        obj._averageRating = Number(json['average_rating']);
        obj._userRating = Number(json['user_rating']);
        obj._createdAt = formatCustomDateTime(String(json['created_at']));
        obj._updatedAt = formatCustomDateTime(String(json['updated_at']));
        return obj;
    }
}

export default Article;
