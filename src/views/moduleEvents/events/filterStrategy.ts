import { EventDTO } from "../../../domain/createEvent";
import { EventCategory } from "../../../domain/eventTypes";
import { getEvents, getEventsByCategory, getEventsByCreator, getEventsByInvitation, getEventsByTitle } from "../../../services/moduleService";

export interface FilterOption {
    getEvents(eventTitle:string, eventCategory:EventCategory): Promise<EventDTO[]>;
}

export class AllEventsOption implements FilterOption {
    public async getEvents(eventTitle:string, eventCategory:EventCategory): Promise<EventDTO[]> {
        return await getEvents();
    
    }
}

export class EventsByTitleSearch implements FilterOption {
    public async getEvents(eventTitle:string, eventCategory:EventCategory): Promise<EventDTO[]> {
        return await getEventsByTitle(eventTitle);
    }
}

export class EventsByType implements FilterOption {
    public async getEvents(eventTitle:string, eventCategory:EventCategory): Promise<EventDTO[]> {
        return await getEventsByCategory(eventCategory);
    }
}

export class EventsByCreated implements FilterOption {
    public async getEvents(eventTitle:string, eventCategory:EventCategory): Promise<EventDTO[]> {
        return await getEventsByCreator();
    }
}

export class EventsByInvitation implements FilterOption {
    public async getEvents(eventTitle:string, eventCategory:EventCategory): Promise<EventDTO[]> {
        return await getEventsByInvitation();
    }
}