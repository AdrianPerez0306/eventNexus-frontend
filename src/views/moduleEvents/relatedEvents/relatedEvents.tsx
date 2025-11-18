import { useEffect, useState } from "react";
import { EventCard } from "../../../components/eventCard/eventCard";
import { EventDTO } from "../../../domain/createEvent";
import { getEventsByCreator, getEventsByInvitation } from "../../../services/moduleService";
import "./relatedEvents.css";

type mode = "createdEvents" | "invitedEvents"
export const RelatedEvents = () => {
    ;
    const [events, setEvents] = useState<EventDTO[]>([]);
    const [mode, setMode] = useState<mode>("invitedEvents");

    async function getEmployeeCreatedEvents() {
        const events: EventDTO[] = await getEventsByCreator();
        setEvents(events);
    }
    async function getEmployeeInvitedEvents() {
        const events: EventDTO[] = await getEventsByInvitation();
        setEvents(events);
    }

    function existEmployeeEvents(eventList:EventDTO[]): boolean {
        return eventList.length > 0;
    }

    function renderEvents() {
        return events.map((event) => (
            <EventCard eventDTO={event}/>
        ));
    }
    useEffect(() => {
        mode == "createdEvents" ?
        getEmployeeCreatedEvents() :
        getEmployeeInvitedEvents()
    }, [mode])


    return (
        <div className="containerEvents">
            <button onClick={(_) => setMode("invitedEvents")}>Participo</button>
            <button onClick={(_) => setMode("createdEvents")}>Creados</button>
            

            {mode == "createdEvents" && existEmployeeEvents(events) ?
                (   renderEvents() ) :
                (   <h2>No creaste ningun evento!</h2>  )
            }
            {mode == "invitedEvents" && existEmployeeEvents(events) ?
                (   renderEvents()  ) : 
                (   <h2>No participas de ningun evento!</h2>  )
            }
        </div>
    );
};
