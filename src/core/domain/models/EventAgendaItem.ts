import Model from "./model";
import DTO from "../types/http/DTO";
import Article from "@models/Article";
import Voting from "@models/Voting";
import Deputy from "@models/Deputy";

class EventAgendaItem extends Model {
    private _id: string;
    private _title: string;
    private _regime: string;
    private _situation: string;
    private _topic: string;
    private _proposition: Article | null;
    private _voting: Article | null;
    private _relatedProposition: Article | null;
    private _rapporteur: Deputy | null;

    constructor() {
        super();
        this._id = this._title = this._regime = this._situation = this._topic = "";
        this._proposition = new Article();
        this._voting = new Article();
        this._relatedProposition = new Article();
        this._rapporteur = new Deputy();
    }

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get regime(): string {
        return this._regime;
    }

    get situation(): string {
        return this._situation;
    }

    get topic(): string {
        return this._topic;
    }

    get proposition(): Article | null {
        return this._proposition;
    }

    get voting(): Article | null {
        return this._voting;
    }

    get relatedProposition(): Article | null {
        return this._relatedProposition;
    }

    get rapporteur(): Deputy | null {
        return this._rapporteur;
    }

    toJSON(): DTO {
        return {
            id: this._id,
            title: this._title,
            regime: this._regime,
            situation: this._situation,
            topic: this._topic,
            proposition: this._proposition?.toJSON(),
            voting: this._voting?.toJSON(),
            related_proposition: this._relatedProposition?.toJSON(),
            rapporteur: this._rapporteur?.toJSON()
        };
    }

    static fromJSON(json: DTO<any>): EventAgendaItem {
        const obj = new EventAgendaItem();
        obj._id = String(json['id']);
        obj._title = String(json['title']);
        obj._regime = String(json['regime']['description']);
        obj._situation = json['situation'] ? String(json['situation']) : '';
        obj._topic = String(json['topic']);
        obj._proposition = json['proposition'] ? Article.fromJSON(json['proposition']) : null;
        obj._voting = json['voting'] ? Article.fromJSON(json['voting']) : null;
        obj._relatedProposition = json['related_proposition'] ? Article.fromJSON(json['related_proposition']) : null;
        obj._rapporteur = json['rapporteur'] ? Deputy.fromJSON(json['rapporteur']) : null;
        return obj;
    }
}

export default EventAgendaItem;
