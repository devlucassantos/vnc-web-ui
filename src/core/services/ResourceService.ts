import Resource from "../domain/models/Resource";
import ResourceAdapter from "../interfaces/adapters/ResourceAdapter";
import ResourceUsecase from "../interfaces/usecases/ResourceUsecase";

export class ResourceService implements ResourceUsecase {
    constructor(private resourceAdapter: ResourceAdapter) {}

    async getResources(): Promise<Resource> {
        return this.resourceAdapter.getResources();
    }
}
