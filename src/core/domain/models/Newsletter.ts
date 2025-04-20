import Model from './model';
import DTO from "../types/http/DTO";
import {formatCustomDate, formatCustomDateTime} from "../../utils/dateUtils";
import Article from "@models/Article";
import ArticleType from "@models/ArticleType";

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
    private _type: ArticleType;
    private _propositions: Article[];
    private _events: Article[];
    private _votes: Article[];
    private _createdAt: string;
    private _updatedAt: string;

    constructor() {
        super();
        this._id = this._title = this._content = this._referenceDate = this._referenceDateTime = this._createdAt = this._updatedAt = '';
        this._propositions = this._events = this._votes = [];
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


    get viewLater(): boolean {
        return this._viewLater;
    }

    get referenceDate() {
        return this._referenceDate;
    }

    get propositions() {
        return this._propositions;
    }

    get events() {
        return this._events;
    }

    get votes() {
        return this._votes;
    }

    get createdAt(): string {
        return this._createdAt;
    }

    get updatedAt(): string {
        return this._updatedAt;
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

    get type(): ArticleType {
        return this._type;
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
        dto['type'] = this._type?.toJSON();
        dto['propositions'] = this._propositions?.map(proposition => proposition.toJSON());
        dto['events'] = this._events?.map(event => event.toJSON());
        dto['votes'] = this._votes?.map(voting => voting.toJSON());
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
        obj._referenceDate = json['reference_date'] ? formatCustomDate(String(json['reference_date'])) : '';
        obj._referenceDateTime = json['reference_date_time'] ? formatCustomDateTime(String(json['reference_date_time'])) : '';
        obj._type = ArticleType.fromJSON(json['type']);
        obj._propositions = json['propositions']?.map((propositionJSON: DTO) => Article.fromJSON(propositionJSON));
        obj._events = json['events']?.map((eventJSON: DTO) => Article.fromJSON(eventJSON));
        obj._votes = json['votes']?.map((votingJSON: DTO) => Article.fromJSON(votingJSON));
        obj._createdAt = formatCustomDateTime(String(json['created_at']));
        obj._updatedAt = formatCustomDateTime(String(json['updated_at']));
        return obj;
    }
}

export default Newsletter;
