import Model from "./model";
import DTO from "../types/http/DTO";
import Party from "./Party";
import {convertToISODate, formatCustomDateTime} from "../../utils/dateUtils";

class Deputy extends Model {
    private _id: string;
    private _name: string;
    private _electoralName: string;
    private _imageUrl: string;
    private _imageDescription: string;
    private _federatedUnit: string;
    private _previousFederatedUnit: string;
    private _party: Party;
    private _previousParty: Party | null;
    private _createdAt: string;
    private _updatedAt: string;

    constructor() {
        super();
        this._id = this._name = this._electoralName = this._imageUrl = this._imageDescription = this._federatedUnit = this._previousFederatedUnit = this._createdAt = this._updatedAt = '';
        this._party = new Party();
        this._previousParty = new Party();
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get electoralName() {
        return this._electoralName;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    get imageDescription() {
        return this._imageDescription;
    }

    get federatedUnit() {
        return this._federatedUnit;
    }

    get previousFederatedUnit() {
        return this._previousFederatedUnit;
    }

    get party() {
        return this._party;
    }

    get previousParty() {
        return this._previousParty;
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
        dto['electoral_name'] = this._electoralName;
        dto['image_url'] = this._imageUrl;
        dto['image_description'] = this._imageDescription;
        dto['federated_unit'] = this._federatedUnit;
        dto['previous_federated_unit'] = this._previousFederatedUnit;
        dto['party'] = this._party.toJSON();
        dto['previous_party'] = this._previousParty?.toJSON();
        return dto;
    }

    static fromJSON(json: DTO<any>): Deputy {
        const obj = new Deputy();
        obj._id = String(json['id']);
        obj._name = String(json['name']);
        obj._electoralName = String(json['electoral_name']);
        obj._imageUrl = String(json['image_url']);
        obj._imageDescription = String(json['image_description']);
        obj._federatedUnit = String(json['federated_unit']);
        obj._previousFederatedUnit = String(json['previous_federated_unit']);
        obj._party = Party.fromJSON(json['party']);
        obj._previousParty = json['previous_party'] ? Party.fromJSON(json['previous_party']) : null;
        return obj;
    }
}

export default Deputy;
