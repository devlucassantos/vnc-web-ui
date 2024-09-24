import Model from './model';
import DTO from "../types/http/DTO";
import {formatCustomDate, formatCustomDateTime} from "../../utils/dateUtils";
import Article from "@models/Article";

class Newsletter extends Model {
    private _id: string;
    private _title: string;
    private _content: string;
    private _viewLater: boolean;
    private _numberOfRatings: number;
    private _averageRating: number;
    private _userRating: number;
    private _referenceDate: string;
    private _referenceDateTime: string;
    private _propositionArticles: Article[];
    private _createdAt: string;
    private _updatedAt: string;

    constructor() {
        super();
        this._id = this._title = this._content = this._referenceDate = this._referenceDateTime = this._createdAt = this._updatedAt = '';
        this._propositionArticles = [];
        this._viewLater = false;
        this._numberOfRatings = this._averageRating = this._userRating = 0;
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


    get viewLater(): boolean {
        return this._viewLater;
    }

    get referenceDate() {
        return this._referenceDate;
    }

    get propositionArticles() {
        return this._propositionArticles;
    }

    set setTitle(title: string) {
        this._title = title;
    }

    set setContent(content: string) {
        this._content = content;
    }

    set setReferenceDate(referenceDate: string) {
        this._referenceDate = referenceDate;
    }

    set setPropositionArticles(propositionArticles: Article[]) {
        this._propositionArticles = propositionArticles;
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
        dto['view_later'] = this._viewLater;
        dto['number_of_ratings'] = this._numberOfRatings;
        dto['average_rating'] = this._averageRating;
        dto['user_rating'] = this._userRating;
        dto['reference_date'] = this._referenceDate;
        dto['reference_date_time'] = this._referenceDateTime;
        dto['proposition_articles'] = this._propositionArticles.map(propositionArticle => propositionArticle.toJSON());
        return dto;
    }

    static fromJSON(json: DTO<any>): Newsletter {
        const obj = new Newsletter();
        obj._id = String(json['id']);
        obj._title = String(json['title']);
        obj._content = String(json['content']);
        obj._viewLater = Boolean(json['view_later']);
        obj._numberOfRatings = Number(json['number_of_ratings']);
        obj._averageRating = Number(json['average_rating']);
        obj._userRating = Number(json['user_rating']);
        obj._referenceDate = formatCustomDate(String(json['reference_date']));
        obj._referenceDateTime = formatCustomDateTime(String(json['reference_date_time']));
        obj._propositionArticles = json['proposition_articles']?.map((propositionArticleJSON: DTO) => Article.fromJSON(propositionArticleJSON));
        obj._createdAt = formatCustomDateTime(String(json['created_at']));
        obj._updatedAt = formatCustomDateTime(String(json['updated_at']));
        return obj;
    }
}

export default Newsletter;
