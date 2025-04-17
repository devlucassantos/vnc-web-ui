import Model from "./model";
import DTO from "../types/http/DTO";
import { formatCustomDateTime } from "../../utils/dateUtils";
import ArticleType from "@models/ArticleType";
import LegislativeBody from "@models/LegislativeBody";
import Article from "@models/Article";

class Voting extends Model {
    private _id: string;
    private _title: string;
    private _content: string;
    private _createdAt: string;
    private _updatedAt: string;
    private _isApproved: boolean | null;
    private _averageRating: number;
    private _numberOfRatings: number;
    private _userRating: number;
    private _viewLater: boolean;
    private _result: string;
    private _resultAnnouncedAt: string;
    private _legislativeBody: LegislativeBody;
    private _type: ArticleType;
    private _mainProposition: Article | null;
    private _affectedPropositions: Article[];
    private _events: Article[];
    private _newsletter: Article | null;
    private _relatedPropositions: Article[];

    constructor() {
        super();
        this._id = this._title = this._content = this._result = this._resultAnnouncedAt = this._createdAt = this._updatedAt = "";
        this._isApproved = null;
        this._viewLater = false;
        this._averageRating = this._numberOfRatings = this._userRating = 0;
        this._legislativeBody = new LegislativeBody();
        this._type = new ArticleType();
        this._mainProposition = this._newsletter = new Article();
        this._affectedPropositions = this._relatedPropositions = this._events = [];
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

    get createdAt() {
        return this._createdAt;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    get isApproved(): boolean | null {
        return this._isApproved;
    }

    get averageRating(): number {
        return this._averageRating;
    }

    get numberOfRatings(): number {
        return this._numberOfRatings;
    }

    get userRating(): number {
        return this._userRating;
    }

    get viewLater(): boolean {
        return this._viewLater;
    }

    get result(): string {
        return this._result;
    }

    get resultAnnouncedAt(): string {
        return this._resultAnnouncedAt;
    }

    get legislativeBody(): LegislativeBody {
        return this._legislativeBody;
    }

    get type(): ArticleType {
        return this._type;
    }

    get mainProposition(): Article | null {
        return this._mainProposition;
    }

    get affectedPropositions(): Article[] {
        return this._affectedPropositions;
    }

    get events(): Article[] {
        return this._events;
    }

    get newsletter(): Article | null {
        return this._newsletter;
    }

    get relatedPropositions(): Article[] {
        return this._relatedPropositions;
    }

    toJSON(): DTO {
        let dto = {} as DTO;
        dto['id'] = this._id;
        dto['title'] = this._title;
        dto['content'] = this._content;
        dto['created_at'] = this._createdAt;
        dto['updated_at'] = this._updatedAt;
        dto['is_approved'] = this._isApproved;
        dto['average_rating'] = this._averageRating;
        dto['number_of_ratings'] = this._numberOfRatings;
        dto['user_rating'] = this._userRating;
        dto['view_later'] = this._viewLater;
        dto['result'] = this._result;
        dto['result_announced_at'] = this._resultAnnouncedAt;
        dto['legislative_body'] = this._legislativeBody.toJSON();
        dto['type'] = this._type.toJSON();
        dto['main_proposition'] = this._mainProposition?.toJSON();
        dto['affected_propositions'] = this._affectedPropositions.map(p => p.toJSON());
        dto['events'] = this._events.map(p => p.toJSON());
        dto['newsletter'] = this._newsletter?.toJSON();
        dto['related_propositions'] = this._relatedPropositions.map(p => p.toJSON());
        return dto;
    }

    static fromJSON(json: DTO<any>): Voting {
        const obj = new Voting();
        obj._id = String(json['id']);
        obj._title = String(json['title']);
        obj._content = String(json['content']);
        obj._createdAt = formatCustomDateTime(String(json['created_at']));
        obj._updatedAt = formatCustomDateTime(String(json['updated_at']));
        obj._isApproved = json['is_approved'] !== undefined ? Boolean(json['is_approved']) : null;
        obj._averageRating = Number(json['average_rating']);
        obj._numberOfRatings = Number(json['number_of_ratings']);
        obj._userRating = Number(json['user_rating']);
        obj._viewLater = Boolean(json['view_later']);
        obj._result = String(json['result']);
        obj._resultAnnouncedAt = formatCustomDateTime(String(json['result_announced_at']));
        obj._legislativeBody = LegislativeBody.fromJSON(json['legislative_body']);
        obj._type = json['type'] ? ArticleType.fromJSON(json['type']) : new ArticleType();
        obj._mainProposition = json['main_proposition'] ? Article.fromJSON(json['main_proposition']) : null;
        obj._affectedPropositions = json['affected_propositions']?.map((p: DTO) => Article.fromJSON(p));
        obj._events = json['events']?.map((p: DTO) => Article.fromJSON(p));
        obj._newsletter = json['newsletter'] ? Article.fromJSON(json['newsletter']) : null;
        obj._relatedPropositions = json['related_propositions']?.map((p: DTO) => Article.fromJSON(p));
        return obj;
    }
}

export default Voting;
