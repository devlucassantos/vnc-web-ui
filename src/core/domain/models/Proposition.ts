import Model from './model';
import DTO from "../types/http/DTO";
import { formatCustomDateTime } from "../../utils/dateUtils";
import Deputy from "./Deputy";
import ExternalAuthor from "./ExternalAuthor";
import Article from "@models/Article";
import ArticleType from "@models/ArticleType";

class Proposition extends Model {
    private _id: string;
    private _originalTextUrl: string;
    private _title: string;
    private _content: string;
    private _imageUrl: string;
    private _imageDescription: string;
    private _viewLater: boolean;
    private _numberOfRatings: number;
    private _averageRating: number;
    private _userRating: number;
    private _submittedAt: string;
    private _referenceDateTime: string;
    private _deputies: Deputy[];
    private _externalAuthors: ExternalAuthor[];
    private _newsletter: Article | null;
    private _type: ArticleType;
    private _events: Article[];
    private _votes: Article[];
    private _createdAt: string;
    private _updatedAt: string;

    constructor() {
        super();
        this._id = this._title = this._content = this._imageUrl = this._imageDescription = this._originalTextUrl = this._referenceDateTime = this._submittedAt = this._createdAt = this._updatedAt = '';
        this._deputies = this._externalAuthors = [];
        this._newsletter = null;
        this._viewLater = false;
        this._numberOfRatings = this._averageRating = this._userRating = 0;
        this._type = new ArticleType()
        this._events = this._votes = []
    }

    get id() {
        return this._id;
    }

    get originalTextUrl() {
        return this._originalTextUrl;
    }

    get title() {
        return this._title;
    }

    get content() {
        return this._content;
    }

    get submittedAt() {
        return this._submittedAt;
    }

    get deputies() {
        return this._deputies;
    }

    get externalAuthors() {
        return this._externalAuthors;
    }

    get newsletter() {
        return this._newsletter;
    }

    get createdAt(): string {
        return this._createdAt;
    }

    get updatedAt(): string {
        return this._updatedAt;
    }

    get imageUrl(): string {
        return this._imageUrl;
    }

    get imageDescription(): string {
        return this._imageDescription;
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

    get type(): ArticleType {
        return this._type;
    }

    get events(): Article[] {
        return this._events;
    }

    get votes(): Article[] {
        return this._votes;
    }

    toJSON(): DTO {
        let dto = {} as DTO;
        dto['id'] = this._id;
        dto['original_text_url'] = this._originalTextUrl;
        dto['title'] = this._title;
        dto['content'] = this._content;
        dto['image_url'] = this._imageUrl;
        dto['image_description'] = this._imageDescription;
        dto['view_later'] = this._viewLater;
        dto['number_of_ratings'] = this._numberOfRatings;
        dto['average_rating'] = this._averageRating;
        dto['user_rating'] = this._userRating;
        dto['submitted_at'] = this._submittedAt;
        dto['deputies'] = this._deputies?.map(deputy => deputy.toJSON());
        dto['external_authors'] = this._externalAuthors?.map(externalAuthor => externalAuthor.toJSON());
        dto['newsletter'] = this._newsletter?.toJSON();
        dto['type'] = this._type?.toJSON();
        dto['events'] = this._events?.map(event => event.toJSON());
        dto['votes'] = this._votes?.map(voting => voting.toJSON());
        return dto;
    }

    static fromJSON(json: DTO<any>): Proposition {
        const obj = new Proposition();
        obj._id = String(json['id']);
        obj._originalTextUrl = String(json['original_text_url']);
        obj._title = String(json['title']);
        obj._content = String(json['content']);
        obj._imageUrl = String(json['image_url']);
        obj._imageDescription = String(json['image_description']);
        obj._viewLater = Boolean(json['view_later']);
        obj._numberOfRatings = Number(json['number_of_ratings']);
        obj._averageRating = Number(json['average_rating']);
        obj._userRating = Number(json['user_rating']);
        obj._submittedAt = formatCustomDateTime(String(json['submitted_at']));
        obj._deputies = json['deputies']?.map((deputyJSON: DTO) => Deputy.fromJSON(deputyJSON));
        obj._externalAuthors = json['external_authors']?.map((externalAuthorJSON: DTO) => ExternalAuthor.fromJSON(externalAuthorJSON));
        obj._createdAt = formatCustomDateTime(String(json['created_at']));
        obj._updatedAt = formatCustomDateTime(String(json['updated_at']));
        obj._newsletter = json['newsletter'] ? Article.fromJSON(json['newsletter']) : null;
        obj._type = ArticleType.fromJSON(json['type']);
        obj._events = json['events']?.map((eventJSON: DTO) => Article.fromJSON(eventJSON));
        obj._votes = json['votes']?.map((votingJSON: DTO) => Article.fromJSON(votingJSON));
        return obj;
    }
}

export default Proposition;
