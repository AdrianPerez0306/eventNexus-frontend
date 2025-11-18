import { useForm } from 'react-hook-form';
import { FormCreateUss } from '../../domain/User-Domain';
import { ButtonApp } from '../buttons/button';
import { InputApp } from '../input/input';
import { Title } from '../title/title';
import './userForm.css';
import '../../views/moduleEvents/createEvent/createEvent.css'
import { useEffect, useState } from 'react';
import { serviceUser } from '../../services/serviceUser';
import { BoxInput } from '../input/boxInput';
import { RadioInput } from '../input/radioInput';
import { Cancel, DialerSip } from '@mui/icons-material';
import { Divider } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { StyledFloatingButton, StyledFloatingConfirmEventButton } from '../../views/moduleEvents/events/eventFilter.style';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';

interface FormularyProps {
    userForm: FormCreateUss;
    click: (data: FormCreateUss) => void;
}

export const UserForm = ({ userForm, click }: FormularyProps) => {
    const nav = useNavigate()
    const [rolTypeMode, setRolTypeMode] = useState(false);
    const [permTypeMode, setPermTypeMode] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm({
        mode: "all",
        defaultValues: userForm,
    });

    const [permisos, setPermisos] = useState<string[]>([]);
    const [roles, setRoles] = useState<string[]>([]);
    const isCreate = userForm.id === 0;

    const cancelCreate = () => {
        reset(new FormCreateUss());
    };
    useEffect(() => {
        const fetchPermissions = async () => {
            const res = await serviceUser.getPermissions();
            setPermisos(res.permissions);
            setRoles(res.roles);
        };
        fetchPermissions();
        reset(userForm);
    }, [userForm, reset]);

    function changeSelectRolTypeMode() {
        setRolTypeMode(prev => !prev);
    }
    function changeSelectPermTypeMode() {
        setPermTypeMode(prev => !prev);
    }


    return (
        <>
        <StyledFloatingButton color="primary" aria-label="add" onClick={(e) => (nav('/module-admin/search-user'))} sx={{ backgroundColor: 'crimson' }}>
                        <Cancel />
        </StyledFloatingButton>
            <form className="profileFormulary"   onSubmit={handleSubmit(click)} >
                <InputApp
                    label="Nombre"
                    type="text"
                    register={register("nombre", {
                        required: "El nombre es obligatorio",
                        pattern: {
                            value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/,
                            message: "Solo se permiten letras y números"
                        }
                    })}
                    readonly={false}
                    error={errors.nombre?.message || ""}
                />

                <InputApp
                    label="Apellido"
                    type="text"
                    register={register("apellido", {
                        required: "El apellido es obligatorio",
                        pattern: {
                            value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/,
                            message: "Solo se permiten letras y números"
                        }
                    })}
                    readonly={false}
                    error={errors.apellido?.message || ""}
                />
                <InputApp
                    label="Dirección"
                    type="text"
                    register={register("direccion", {
                        required: "La dirección es obligatoria",
                        pattern: {
                            value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/,
                            message: "Solo se permiten letras y números"
                        }
                    })}
                    readonly={false}
                    error={errors.direccion?.message || ""}
                />
                <InputApp
                    label="Teléfono"
                    type="number"
                    register={register("telefono", {
                        required: "El teléfono es obligatorio",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "Solo se permiten números"
                        },
                        minLength: {
                            value: 5,
                            message: "El teléfono debe tener al menos 5 dígitos"
                        },
                        maxLength: {
                            value: 15,
                            message: "El teléfono debe tener como máximo 15 dígitos"
                        }
                    })}
                    readonly={false}
                    error={errors.telefono?.message || ""}
                />

                <InputApp
                    label="E-Mail"
                    type="email"
                    register={register("email", {
                        required: "El email es obligatorio",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Correo electrónico inválido"
                        }
                    })}
                    readonly={false}
                    error={errors.email?.message || ""}
                />

                <Title title={"Permisos"} />
                <div className="event-type-selector">
                        <div className="container__label">
                            <label className="input-label">Permisos</label>
                            <button className="button__collapse-expand" onClick={(e) => { e.preventDefault(); changeSelectPermTypeMode() }}>
                                {rolTypeMode ?
                                    <><KeyboardArrowUpIcon /></> :
                                    <><KeyboardArrowDownIcon /></>
                                }

                            </button>
                        </div>
                        <div className="event-type-options">
                            {permTypeMode && <>
                                {permisos?.map((perm, index) => {
                                    return (
                                        <BoxInput
                                        key={index}
                                        label={perm}
                                        value={perm}
                                        register={register("permisos", {
                                            required: "El permiso es obligatorio",
                                })}
                        />
                                    );
                                })}
                            </>}

                        </div>
                        {errors.permisos?.message && (
                            <div className="error-container">
                                <p className="error-message">
                                    {typeof errors.permisos?.message === "string" ? errors.permisos.message : ""}
                                </p>
                            </div>
                        )}
                    </div>

                <Title title={"Roles"} />
                <div className="event-type-selector">
                        <div className="container__label">
                            <label className="input-label">Roles</label>
                            <button className="button__collapse-expand" onClick={(e) => { e.preventDefault(); changeSelectRolTypeMode() }}>
                                {rolTypeMode ?
                                    <><KeyboardArrowUpIcon /></> :
                                    <><KeyboardArrowDownIcon /></>
                                }

                            </button>
                        </div>
                        <div className="event-type-options">
                            {rolTypeMode && <>
                                {roles?.map((role, index) => {
                                    return (
                                        <RadioInput
                                            key={index}
                                            label={role}
                                            helper={index}
                                            value={role}
                                            register={register("roles", {
                                                required: "El rol es obligatorio",
                                            })}
                                        />
                                    );
                                })}
                            </>}

                        </div>
                        {errors.roles?.message && (
                            <div className="error-container">
                                <p className="error-message">
                                    {typeof errors.roles?.message === "string" ? errors.roles.message : ""}
                                </p>
                            </div>
                        )}
                    </div>
                    <div style={{height:'100px'}}></div>
                <Divider></Divider>
                <StyledFloatingConfirmEventButton
                        color="success"
                        aria-label="add"
                        type="submit"
                        onSubmit={ (e) => {
                            handleSubmit(click)
                             }
                        }
                        sx={{ backgroundColor: 'forest' }}
                    >
                        <CheckIcon />
                    </StyledFloatingConfirmEventButton>
            </form>
        </>
    )
}