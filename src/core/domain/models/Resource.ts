import Model from "./model";
import DTO from "../types/http/DTO";
import Party from "./Party";
import Deputy from "./Deputy";
import Organization from "./Organization";

class Resource extends Model {
    private _parties: Party[];
    private _deputies: Deputy[];
    private _organizations: Organization[];

    constructor() {
        super();
        this._parties = [];
        this._deputies = [];
        this._organizations = [];
    }

    get parties() {
        return this._parties;
    }

    get deputies() {
        return this._deputies;
    }

    get organizations() {
        return this._organizations;
    }

    toJSON(): DTO {
        let dto = {} as DTO;
        dto['parties'] = this._parties.map(party => party.toJSON());
        dto['deputies'] = this._deputies.map(deputy => deputy.toJSON());
        dto['organizations'] = this._organizations.map(organization => organization.toJSON());
        return dto;
    }

    static fromJSON(json: DTO<any>): Resource {
        const resource = new Resource();
        resource._parties = json['parties'] ? json['parties'].map((partyJson: DTO) => Party.fromJSON(partyJson)) : null;
        resource._deputies = json['deputies'] ? json['deputies'].map((deputyJson: DTO) => Deputy.fromJSON(deputyJson)) : null;
        resource._organizations = json['organizations'] ? json['organizations'].map((organizationJson: DTO) => Organization.fromJSON(organizationJson)) : null;
        return resource;
    }
}

export default Resource;
