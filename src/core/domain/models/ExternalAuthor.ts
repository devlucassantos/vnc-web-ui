import Model from "./model";
import DTO from "../types/http/DTO";
import {convertToISODate, formatCustomDateTime} from "../../utils/dateUtils";

class ExternalAuthor extends Model {
    private _id: string;
    private _name: string;
    private _type: string;
    private _createdAt: string;
    private _updatedAt: string;

    constructor() {
        super();
        this._id = this._name = this._type = this._createdAt = this._updatedAt = '';
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get type() {
        return this._type;
    }

    get createdAt(): string {
        return this._createdAt;
    }

    get updatedAt(): string {
        return this._updatedAt;
    }

    toJSON(): DTO {
        let dto = {} as DTO;
        dto['id'] = this._id;
        dto['name'] = this._name;
        dto['type'] = this._type;
        return dto;
    }

    static fromJSON(json: DTO): ExternalAuthor {
        const obj = new ExternalAuthor();
        obj._id = String(json['id']);
        obj._name = String(json['name']);
        obj._type = String(json['type']);
        return obj;
    }
}

export default ExternalAuthor;
