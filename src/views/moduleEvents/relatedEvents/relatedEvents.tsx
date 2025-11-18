import { useEffect, useRef, useState } from "react";
import { EventCard } from "../../../components/eventCard/eventCard";
import { useToast } from "../../../context/toast/useToast";
import { EventDTO } from "../../../domain/createEvent";
import { getEventsByCreator, getEventsByInvitation, moduleService } from "../../../services/moduleService";
import "./relatedEvents.css";

type mode = "createdEvents" | "invitedEvents"
export const RelatedEvents = () => {
    ;
    const [events, setEvents] = useState<EventDTO[]>([]);
    const [mode, setMode] = useState<mode>("invitedEvents");
    const { open } = useToast();
    const existInvitedOrCreatedEvents = useRef(false);

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
        return events.map((event, index) => (
            <EventCard eventDTO={event}/>
        ));
    }
    useEffect(() => {
        mode == "createdEvents" ?
        getEmployeeCreatedEvents() :
        getEmployeeInvitedEvents()
    }, [mode])

    const joinleaveEvent = async (eventId: number) => {
        try {
            await moduleService.joinleaveEvent(eventId);

            setEvents((prevState) => {
                if (prevState) {
                    return prevState.filter((event) => event.id !== eventId);
                }
                return prevState;
            });
            open("Lista actualizada", "success");
        }
        catch (error) {
            open("Error al unirse o abandonar el evento", "error");
        }
    }

    return (
        <div className="containerEvents">
            <button onClick={(e) => setMode("invitedEvents")}>Participo</button>
            <button onClick={(e) => setMode("createdEvents")}>Creados</button>
            

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
