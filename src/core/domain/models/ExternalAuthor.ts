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

    set setName(name: string) {
        this._name = name;
    }

    set setType(type: string) {
        this._type = type;
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
        dto['name'] = this._name;
        dto['type'] = this._type;
        dto['created_at'] = convertToISODate(this._createdAt);
        dto['updated_at'] = convertToISODate(this._updatedAt);
        return dto;
    }

    static fromJSON(json: DTO): ExternalAuthor {
        const obj = new ExternalAuthor();
        obj._id = String(json['id']);
        obj._name = String(json['name']);
        obj._type = String(json['type']);
        obj._createdAt = formatCustomDateTime(String(json['created_at']));
        obj._updatedAt = formatCustomDateTime(String(json['updated_at']));
        return obj;
    }
}

export default ExternalAuthor;