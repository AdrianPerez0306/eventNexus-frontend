import React from 'react';
import { NotificationDTO } from '../domain/notification';
import axios from 'axios';
import { SERVER_CONNECTION } from "./serverConstants";


export async function trySSE(
    setCounter: React.Dispatch<React.SetStateAction<number>>,
    setNewNotification: React.Dispatch<React.SetStateAction<NotificationDTO[]>>,
    userId: number,
    activeStatus: boolean,
    eventSource: EventSource | null,
) {
    
    if (activeStatus) {
        eventSource?.close()
         
        // eventSource.close()
    } else {
        const url = SERVER_CONNECTION;
        eventSource = new EventSource(`${url}/notification?employeeId=${userId}`);
        eventSource.onopen = (_: Event) => {
             
        };
        eventSource.onerror = (__) => {
             
            eventSource?.close()
        };
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            try {
                if (data.type === 'new-notification') {
                     
                    setCounter((prev) => prev + 1);
                    setNewNotification((prev) => [...prev, data.payload as NotificationDTO]);
                }
            } catch (error) {
                console.error('Error al parsear el evento SSE:', error);
            }
        };
    }



    // eventSource.addEventListener('heartbeat', (event) => {
    //     const timestamp = JSON.parse((event as MessageEvent).data);
    //      
    //     // setCounter((prev) => prev + 1);
    //     // Aquí podrías resetear un temporizador de inactividad en el frontend si lo tuvieras
    // });
}

export async function getNotificationsByUserId(_: number): Promise<NotificationDTO[]> {
    const url = SERVER_CONNECTION;
    const response = await axios.get(`${url}/notification/employee`);
    return response.data
}

