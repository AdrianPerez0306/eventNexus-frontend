import { useForm } from "react-hook-form";
import { InputApp } from "../../../components/input/input"
import './createEvent.css'
import { ButtonApp } from "../../../components/buttons/button";
import { CreateEventDTO } from "../../../domain/createEvent";
import { moduleService } from "../../../services/moduleService";
import { useLoader } from "../../../context/loader/useLoader";
import { TIMELOADER } from "../../../utils/config";
import { useToast } from "../../../context/toast/useToast";
import { RadioInput } from "../../../components/input/radioInput";
import { serviceUser } from "../../../services/serviceUser";
import { useEffect, useState } from "react";
import { SesionStorage } from "../../../domain/user";
import { InviteUserCard } from "../../../components/inviteUserCard/inviteUserCard";
import { StyledFloatingButton, StyledFloatingConfirmEventButton } from "../events/eventFilter.style";
import { useNavigate } from "react-router-dom";
import { Cancel } from "@mui/icons-material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Divider } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

export const CreateEvent = () => {
    const nav = useNavigate()
    const userId = Number(sessionStorage.getItem('userId'))
    const { setIsLoading } = useLoader();
    const [permissions, setPermissions] = useState<string[]>([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "all",
    });
    const { open } = useToast();
    const [availableUsers, setAvailableUsers] = useState<SesionStorage[]>([]);
    const [invitedUsers, setInvitedUsers] = useState<number[]>([]);
    const [inviteMode, setInviteMode] = useState(false);
    const [eventTypeMode, setEventTypeMode] = useState(false);
    const toast = useToast()
    const create = async (data: any) => {
        const { title, date, description, eventType } = data;

        const eventCreated = new CreateEventDTO(userId, invitedUsers, date, title, description, eventType)
        try {
            setIsLoading(true)
             
            await moduleService.create(eventCreated)
            reset()
            setInviteMode(false)
            setTimeout(() => {
                setIsLoading(false)
                open("Evento creado con exito", "success")
            }, TIMELOADER)
        } catch (e: any) {
            reset()
            open(e.response.data.message, "error")
        }
    }

    async function getAvaliableUsers() {
        const response = await serviceUser.search("");
         
        setAvailableUsers(response);
    }

    async function changeInviteMode() {
        if (!inviteMode) {
            await getAvaliableUsers();  
        }
        setInviteMode(prev => !prev);
    }
    function changeSelectEvenetTypeMode() {
        setEventTypeMode(prev => !prev);
    }
    function handleInvitation(id: number) {
        if (invitedUsers.includes(id)) {
            uninviteUser(id);
            toast.open("Usuario invitado","success")
        } else {
            inviteUser(id);
            toast.open("Usuario retirado","success")
        }
    }
    function inviteUser(id: number) {
        setInvitedUsers(prev => [...prev, id]);
    }

    function uninviteUser(id: number) {
        setInvitedUsers(prev => prev.filter(userId => userId !== id));
    }


    useEffect(() => {
        const getPermission = async () => {
            const response = await serviceUser.getPermissionsUser(userId, "EVENT")
            setPermissions(response)
        }
        getPermission()
    }, []);

    return (
        <>
            <StyledFloatingButton color="primary" aria-label="add" onClick={(e) => (nav('/module-events/events'))} sx={{ backgroundColor: 'crimson' }}>
                <Cancel />
            </StyledFloatingButton>


            <div className="container__form">
                <form className="element__form" onSubmit={handleSubmit(create)}>
                    <InputApp
                        label="Titulo"
                        type="text"
                        register={register("title", {
                            required: "El titulo es obligatorio",
                        })}
                        readonly={false}
                        error={typeof errors.title?.message === "string" ? errors.title?.message : ""}
                    />
                    <Divider sx={{width:'100%'}}></Divider>
                    <InputApp
                        label="Fecha"
                        type="datetime-local"
                        register={register("date", {
                            required: "La fecha es obligatoria",
                        })}
                        readonly={false}
                        error={typeof errors.date?.message === "string" ? errors.date?.message : ""}
                    />
                    <Divider sx={{width:'100%'}}></Divider>
                    <InputApp
                        label="Descripcion"
                        type="text"
                        register={register("description", {
                            required: "La Descripcion es oblogatoria",
                        })}
                        readonly={false}
                        error={typeof errors.description?.message === "string" ? errors.description?.message : ""}
                    />
                    <Divider sx={{width:'100%'}}></Divider>
                    <div className="event-type-selector">
                        <div className="container__label">
                            <label className="input-label">Tipo de Evento</label>
                            <button className="button__collapse-expand" onClick={(e) => { e.preventDefault(); changeSelectEvenetTypeMode() }}>
                                {eventTypeMode ?
                                    <><KeyboardArrowUpIcon /></> :
                                    <><KeyboardArrowDownIcon /></>
                                }

                            </button>
                        </div>
                        <div className="event-type-options">
                            {eventTypeMode && <>
                                {permissions?.map((permission, index) => {
                                    return (
                                        <RadioInput
                                            key={permission}
                                            label={permission}
                                            helper={index}
                                            value={permission}
                                            register={register("eventType", {
                                                required: "El tipo de evento es obligatorio",
                                            })}
                                        />
                                    );
                                })}
                            </>}

                        </div>
                        {errors.eventType?.message && (
                            <div className="error-container">
                                <p className="error-message">
                                    {typeof errors.eventType?.message === "string" ? errors.eventType.message : ""}
                                </p>
                            </div>
                        )}
                    </div>
                    <Divider sx={{width:'100%'}}></Divider>
                    <div className="event__invite">
                        <div className="container__label">
                            <label className="input-label">Invitar gente</label>
                            <button className="button__collapse-expand" onClick={(e) => { e.preventDefault(); changeInviteMode() }}>
                                {inviteMode ?
                                    <><KeyboardArrowUpIcon /></> :
                                    <><KeyboardArrowDownIcon /></>
                                }
                            </button>
                        </div>
                        {inviteMode && availableUsers?.map((user, index) => (
                            <InviteUserCard key={index} user={user} click={handleInvitation} invited={invitedUsers.includes(user.id)} />
                        ))}
                    </div>
                    <Divider sx={{width:'100%'}}></Divider>
                    <StyledFloatingConfirmEventButton
                        color="success"
                        aria-label="add"
                        type="submit"
                        onSubmit={ (e) => {
                            handleSubmit(create)
                             }
                        }
                        sx={{ backgroundColor: 'forest' }}
                    >
                        <CheckIcon />
                    </StyledFloatingConfirmEventButton>
                </form>
            </div>
        </>
    )
}