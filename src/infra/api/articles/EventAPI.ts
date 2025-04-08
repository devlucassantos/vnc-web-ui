import DTO from "../../../core/domain/types/http/DTO";
import {BackendClient} from "../clients/BackendClient";
import EventAdapter from "@interfaces/adapters/EventAdapter";
import Event from "@models/Event";

class EventAPI implements EventAdapter {
    async getEventByID(id: string): Promise<Event> {

        try {
            const response = await BackendClient.get(`/articles/` + id + `/event`);
            const data = response.data

            return Event.fromJSON(data as DTO);
        } catch (error) {
            throw error;
        }
    }
}

export default EventAPI;
