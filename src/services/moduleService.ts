import axios from 'axios'
import { Module } from "../domain/module";
import { CreateEventDTO, EventDTO, ResponseEntityDTO } from '../domain/createEvent';
import { EventCategory } from '../domain/eventTypes';
import { SERVER_CONNECTION } from './serverConstants';


class ModuleService {
    async getEvents() {
        const url = SERVER_CONNECTION;
        const response = await axios.get(`${url}/event`);
        return response.data
    }

    async getModules(id: number): Promise<Module[]> {
        const url = SERVER_CONNECTION;
        const response = await axios.get(`${url}/module`);
        return response.data
    }

    async create(data: CreateEventDTO) {
        const url = SERVER_CONNECTION;
        return await axios.post(`${url}/event/create`, data)
    }

    async joinleaveEvent(eventId: number): Promise<ResponseEntityDTO> {
        const url = SERVER_CONNECTION;
        const employeeId = Number(sessionStorage.getItem('userId'))
        const response = await axios.post(`${url}/event/join-leave?eventId=${eventId}`);
        return response.data
    }
}

export const moduleService = new ModuleService()

// export async function getAvailableEvents():Promise<EventDto[]> {
//     const userId:number = Number(sessionStorage.getItem('userId'))
//     const response = await axios.get(`${REACT_APP_URL_SERVIDOR_REST}/event/available`);
//      
//     return response.data
// }

export async function getEvents(): Promise<EventDTO[]> {
    const url = SERVER_CONNECTION;
    const userId: number = Number(sessionStorage.getItem('userId'))
    const response = await axios.get(`${url}/event/available`);
     
    return response.data
}

export async function getEventsByTitle(eventTitle: string): Promise<EventDTO[]> {
    const url = SERVER_CONNECTION;
    const response = await axios.get(`${url}/event/title?eventTitle=${eventTitle}`);
     
    return response.data
}

export async function getEventsByCategory(eventCategory: string): Promise<EventDTO[]> {
    const url = SERVER_CONNECTION;
    const response = await axios.get(`${url}/event/type/${eventCategory}`);
     
    return response.data
}

export async function getEventsByCreator(): Promise<EventDTO[]> {
    const url = SERVER_CONNECTION;
    const response = await axios.get(`${url}/event/created`);
    return response.data
}

export async function getEventsByInvitation(): Promise<EventDTO[]> {
    const url = SERVER_CONNECTION;
    const response = await axios.get(`${url}/event/invited`);
    return response.data
}

// ////////////////////////////////////////////////////////////////////////////////////
// TIPOS DE EVENTOS
// ////////////////////////////////////////////////////////////////////////////////////
export async function getEventTypes(): Promise<EventCategory[]> {
    const url = SERVER_CONNECTION;
    const response = await axios.get(`${url}/event/type/all`);
     
    return response.data
}

export async function deleteEvent(eventId: number): Promise<string> {
    const url = SERVER_CONNECTION;
    const response = await axios.delete(`${url}/event?eventId=${eventId}`);
    return response.data
}