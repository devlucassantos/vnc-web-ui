import {BackendClient} from "../clients/BackendClient";
import ResourceAdapter from "@interfaces/adapters/ResourceAdapter";
import Resource from "@models/Resource";
import DTO from "@typing/http/DTO";


class ResourceAPI implements ResourceAdapter {
    async getResources(): Promise<Resource> {

       try {
           const response = await BackendClient.get(`/resources`);

           return Resource.fromJSON(response?.data as DTO);
       } catch (error) {
           throw error;
       }
    }
}

export default ResourceAPI;
