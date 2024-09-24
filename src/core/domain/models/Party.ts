import Model from "./model";
import DTO from "../types/http/DTO";
import {convertToISODate, formatCustomDateTime} from "../../utils/dateUtils";

class Party extends Model {
    private _id: string;
    private _name: string;
    private _acronym: string;
    private _imageUrl: string;
    private _createdAt: string;
    private _updatedAt: string;

    constructor() {
        super();
        this._id = this._name = this._acronym = this._imageUrl = this._createdAt = this._updatedAt = '';
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get acronym() {
        return this._acronym;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    set setName(name: string) {
        this._name = name;
    }

    set setAcronym(acronym: string) {
        this._acronym = acronym;
    }

    set setImageUrl(imageUrl: string) {
        this._imageUrl = imageUrl;
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
        dto['acronym'] = this._acronym;
        dto['image_url'] = this._imageUrl;
        dto['created_at'] = convertToISODate(this._createdAt);
        dto['updated_at'] = convertToISODate(this._updatedAt);
        return dto;
    }

    static fromJSON(json: DTO): Party {
        const obj = new Party();
        obj._id = String(json['id']);
        obj._name = String(json['name']);
        obj._acronym = String(json['acronym']);
        obj._imageUrl = String(json['image_url']);
        obj._createdAt = formatCustomDateTime(String(json['created_at']));
        obj._updatedAt = formatCustomDateTime(String(json['updated_at']));
        return obj;
    }
}

export default Party;