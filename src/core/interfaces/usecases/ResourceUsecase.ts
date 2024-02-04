import Resource from "@models/Resource";

abstract class ResourceUsecase {
    abstract getResources(): Promise<Resource>;
}

export default ResourceUsecase;
