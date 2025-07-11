import EventUsecase from "@interfaces/usecases/EventUsecase";
import EventAdapter from "@interfaces/adapters/EventAdapter";
import Event from "@models/Event";

export class EventService implements EventUsecase {
    constructor(private eventAdapter: EventAdapter) {}

    async getEventByID(id: string): Promise<Event> {
        return this.eventAdapter.getEventByID(id);
    }
}
