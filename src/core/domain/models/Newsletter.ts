import Model from './model';
import DTO from "../types/http/DTO";
import { formatCustomDate } from "../../utils/dateUtils";
import Proposition from "./Proposition";

class Newsletter extends Model {
    private _id: string;
    private _title: string;
    private _content: string;
    private _referenceDate: string;
    private _propositions: Proposition[];
    private _createdAt: string;
    private _updatedAt: string;

    constructor() {
        super();
        this._id = this._title = this._content = this._referenceDate = this._createdAt = this._updatedAt = '';
        this._propositions = [];
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

    get referenceDate() {
        return this._referenceDate;
    }

    get propositions() {
        return this._propositions;
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

    set setPropositions(propositions: Proposition[]) {
        this._propositions = propositions;
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

    toJSON(): DTO {
        let dto = {} as DTO;
        dto['id'] = this._id;
        dto['title'] = this._title;
        dto['content'] = this._content;
        dto['reference_date'] = this._referenceDate;
        dto['propositions'] = this._propositions.map(proposition => proposition.toJSON());
        return dto;
    }

    static fromJSON(json: DTO<any>): Newsletter {
        const obj = new Newsletter();
        obj._id = String(json['id']);
        obj._title = String(json['title']);
        obj._content = String(json['content']);
        obj._referenceDate = formatCustomDate(String(json['reference_date']));
        obj._propositions = json['propositions']?.map((propositionJSON: DTO) => Proposition.fromJSON(propositionJSON));
        obj._createdAt = formatCustomDate(String(json['created_at']));
        obj._updatedAt = formatCustomDate(String(json['updated_at']));
        return obj;
    }
}

export default Newsletter;
