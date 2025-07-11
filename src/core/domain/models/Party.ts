import Model from "./model";
import DTO from "../types/http/DTO";
import {convertToISODate, formatCustomDateTime} from "../../utils/dateUtils";

class Party extends Model {
    private _id: string;
    private _name: string;
    private _acronym: string;
    private _imageUrl: string;
    private _imageDescription: string;
    private _createdAt: string;
    private _updatedAt: string;

    constructor() {
        super();
        this._id = this._name = this._acronym = this._imageUrl = this._imageDescription = this._createdAt = this._updatedAt = '';
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

    get imageDescription() {
        return this._imageDescription;
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
        dto['acronym'] = this._acronym;
        dto['image_url'] = this._imageUrl;
        dto['image_description'] = this._imageDescription;
        return dto;
    }

    static fromJSON(json: DTO): Party {
        const obj = new Party();
        obj._id = String(json['id']);
        obj._name = String(json['name']);
        obj._acronym = String(json['acronym']);
        obj._imageUrl = String(json['image_url']);
        obj._imageDescription = String(json['image_description']);
        return obj;
    }
}

export default Party;
