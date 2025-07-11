import Model from "./model";
import DTO from "../types/http/DTO";
import { formatCustomDateTime } from "../../utils/dateUtils";
import ArticleType from "@models/ArticleType";
import ArticleSituation from "@models/ArticleSituation";
import LegislativeBody from "@models/LegislativeBody";
import Article from "@models/Article";
import EventAgendaItem from "@models/EventAgendaItem";

class Event extends Model {
    private _id: string;
    private _title: string;
    private _descriptionContent: string;
    private _createdAt: string;
    private _updatedAt: string;
    private _startsAt: string;
    private _endsAt: string;
    private _situation: ArticleSituation;
    private _type: ArticleType;
    private _averageRating: number;
    private _numberOfRatings: number;
    private _userRating: number;
    private _location: string;
    private _videoUrl: string;
    private _viewLater: boolean;
    private _isInternal: boolean;
    private _requirements: Article[];
    private _newsletter: Article | null;
    private _legislativeBodies: LegislativeBody[];
    private _agendaItems: EventAgendaItem[];

    constructor() {
        super();
        this._id = this._title = this._descriptionContent = this._createdAt = this._updatedAt = this._startsAt = this._endsAt = this._location = this._videoUrl = "";
        this._situation = new ArticleSituation();
        this._type = new ArticleType();
        this._averageRating = this._numberOfRatings = this._userRating = 0;
        this._viewLater = this._isInternal = false;
        this._requirements = [];
        this._newsletter = null;
        this._legislativeBodies = [];
        this._agendaItems = [];
    }

    get id() { return this._id; }
    get title() { return this._title; }
    get descriptionContent() { return this._descriptionContent; }
    get createdAt() { return this._createdAt; }
    get updatedAt() { return this._updatedAt; }
    get startsAt() { return this._startsAt; }
    get endsAt() { return this._endsAt; }
    get situation() { return this._situation; }
    get type() { return this._type; }
    get averageRating() { return this._averageRating; }
    get numberOfRatings() { return this._numberOfRatings; }
    get userRating() { return this._userRating; }
    get location() { return this._location; }
    get videoUrl() { return this._videoUrl; }
    get viewLater() { return this._viewLater; }
    get isInternal() { return this._isInternal; }
    get requirements() { return this._requirements; }
    get newsletter() { return this._newsletter; }
    get legislativeBodies() { return this._legislativeBodies; }
    get agendaItems() { return this._agendaItems; }

    toJSON(): DTO {
        return {
            id: this._id,
            title: this._title,
            description_content: this._descriptionContent,
            created_at: this._createdAt,
            updated_at: this._updatedAt,
            starts_at: this._startsAt,
            ends_at: this._endsAt,
            situation: this._situation.toJSON(),
            type: this._type.toJSON(),
            average_rating: this._averageRating,
            number_of_ratings: this._numberOfRatings,
            user_rating: this._userRating,
            location: this._location,
            video_url: this._videoUrl,
            view_later: this._viewLater,
            is_internal: this._isInternal,
            requirements: this._requirements.map(r => r.toJSON()),
            newsletter: this._newsletter?.toJSON() || null,
            legislative_bodies: this._legislativeBodies.map(lb => lb.toJSON()),
            agenda_items: this._agendaItems.map(ai => ai.toJSON()),
        };
    }

    static fromJSON(json: DTO<any>): Event {
        const obj = new Event();
        obj._id = String(json['id']);
        obj._title = String(json['title']);
        obj._descriptionContent = String(json['description_content']);
        obj._createdAt = formatCustomDateTime(String(json['created_at']));
        obj._updatedAt = formatCustomDateTime(String(json['updated_at']));
        obj._startsAt = json['starts_at'] ? formatCustomDateTime(String(json['starts_at'])) : '';
        obj._endsAt = json['ends_at'] ? formatCustomDateTime(String(json['ends_at'])) : '';
        obj._situation = json['situation'] ? ArticleSituation.fromJSON(json['situation']) : new ArticleSituation();
        obj._type = json['type'] ? ArticleType.fromJSON(json['type']) : new ArticleType();
        obj._averageRating = Number(json['average_rating']);
        obj._numberOfRatings = Number(json['number_of_ratings']);
        obj._userRating = Number(json['user_rating']);
        obj._location = String(json['location']);
        obj._videoUrl = String(json['video_url']);
        obj._viewLater = Boolean(json['view_later']);
        obj._isInternal = Boolean(json['is_internal']);
        obj._requirements = json['requirements']?.map((r: DTO) => Article.fromJSON(r)) || [];
        obj._newsletter = json['newsletter'] ? Article.fromJSON(json['newsletter']) : null;
        obj._legislativeBodies = json['legislative_bodies']?.map((lb: DTO) => LegislativeBody.fromJSON(lb)) || [];
        obj._agendaItems = json['agenda_items']?.map((ai: DTO) => EventAgendaItem.fromJSON(ai)) || [];
        return obj;
    }
}

export default Event;
