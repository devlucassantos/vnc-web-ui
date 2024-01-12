import Model from "./model";
import DTO from "../types/http/DTO";
import {formatCustomDate} from "../../utils/dateUtils";

class Organization extends Model {
    private _id: string;
    private _code: number;
    private _name: string;
    private _acronym: string;
    private _type: string;
    private _nickname: string;
    private _createdAt: string;
    private _updatedAt: string;

    constructor() {
        super();
        this._id = this._name = this._acronym = this._type = this._nickname = this._createdAt = this._updatedAt = '';
        this._code = 0;
    }

    get id() {
        return this._id;
    }

    get code() {
        return this._code;
    }

    get name() {
        return this._name;
    }

    get acronym() {
        return this._acronym;
    }

    get type() {
        return this._type;
    }

    get nickname() {
        return this._nickname;
    }

    set setCode(code: number) {
        this._code = code;
    }

    set setName(name: string) {
        this._name = name;
    }

    set setAcronym(acronym: string) {
        this._acronym = acronym;
    }

    set setType(type: string) {
        this._type = type;
    }

    set setNickname(nickname: string) {
        this._nickname = nickname;
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
        dto['code'] = this._code;
        dto['name'] = this._name;
        dto['acronym'] = this._acronym;
        dto['type'] = this._type;
        dto['nickname'] = this._nickname;
        return dto;
    }

    static fromJSON(json: DTO): Organization {
        const obj = new Organization();
        obj._id = String(json['id']);
        obj._code = Number(json['code']);
        obj._name = String(json['name']);
        obj._acronym = String(json['acronym']);
        obj._type = String(json['type']);
        obj._nickname = String(json['nickname']);
        obj._createdAt = formatCustomDate(String(json['created_at']));
        obj._updatedAt = formatCustomDate(String(json['updated_at']));
        return obj;
    }
}

export default Organization;