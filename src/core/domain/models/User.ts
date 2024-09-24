import Model from "./model";
import DTO from "../types/http/DTO";
import {convertToISODate, formatCustomDateTime} from "../../utils/dateUtils";

class User extends Model {
    private _id: string;
    private _email: string;
    private _firstName: string;
    private _lastName: string;
    private _accessToken: string;
    private _refreshToken: string;
    private _roles: string[];
    private _createdAt: string;
    private _updatedAt: string;

    constructor() {
        super();
        this._id = this._email = this._firstName = this._lastName = this._accessToken = this._refreshToken = this._createdAt = this._updatedAt = '';
        this._roles = []
    }

    get id() {
        return this._id;
    }

    get email() {
        return this._email;
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    get accessToken() {
        return this._accessToken;
    }

    get refreshToken() {
        return this._refreshToken;
    }

    get createdAt(): string {
        return this._createdAt;
    }

    get updatedAt(): string {
        return this._updatedAt;
    }

    get roles() {
        return this._roles;
    }

    set setEmail(email: string) {
        this._email = email;
    }

    set setFirstName(firstName: string) {
        this._firstName = firstName;
    }

    set setLastName(lastName: string) {
        this._lastName = lastName;
    }

    set setImageUrl(accessToken: string) {
        this._accessToken = accessToken;
    }

    set setRefreshToken(refreshToken: string) {
        this._refreshToken = refreshToken;
    }

    set setRoles(roles: string[]) {
        this._roles = roles;
    }

    set updatedAt(value: string) {
        this._updatedAt = value;
    }

    toJSON(): DTO {
        let dto = {} as DTO;
        dto['id'] = this._id;
        dto['email'] = this._email;
        dto['first_name'] = this._firstName;
        dto['last_name'] = this._lastName;
        dto['access_token'] = this._accessToken;
        dto['refresh_token'] = this._refreshToken;
        dto['roles'] = this._roles;
        dto['created_at'] = convertToISODate(this._createdAt);
        dto['updated_at'] = convertToISODate(this._updatedAt);
        return dto;
    }

    static fromJSON(json: DTO<any>): User {
        const obj = new User();
        obj._id = String(json['id']);
        obj._email = String(json['email']);
        obj._firstName = String(json['first_name']);
        obj._lastName = String(json['last_name']);
        obj._accessToken = String(json['access_token']);
        obj._refreshToken = String(json['refresh_token']);
        obj._roles = json['roles'] ? json['roles'] as string[] : [];
        obj._createdAt = formatCustomDateTime(String(json['created_at']));
        obj._updatedAt = formatCustomDateTime(String(json['updated_at']));
        return obj;
    }
}

export default User;
