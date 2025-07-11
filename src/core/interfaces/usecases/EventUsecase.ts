import Event from "@models/Event";

abstract class EventUsecase {
    abstract getEventByID(id: string): Promise<Event>;
}

export default EventUsecase;
