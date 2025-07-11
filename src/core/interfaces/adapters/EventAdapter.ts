import Event from "@models/Event";

abstract class EventAdapter {
    abstract getEventByID(id: string): Promise<Event>;
}

export default EventAdapter;
