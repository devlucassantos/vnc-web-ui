import Resource from "@models/Resource";

abstract class ResourceAdapter {
    abstract getResources(): Promise<Resource>;
}

export default ResourceAdapter;
