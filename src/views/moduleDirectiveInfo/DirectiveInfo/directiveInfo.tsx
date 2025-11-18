import { DirectiveInfoData, Priority } from '../../../domain/directiveInfo'
import { CardDirectiveInfo } from './cardDirectiveInfo'
import { useEffect, useState } from 'react'
import { serviceUser } from '../../../services/serviceUser'
import './directiveInfo.css'
import { directiveInfoService } from '../../../services/directiveInfoService'
import { Box, Button, Chip, TextField } from '@mui/material'
import { StyledFloatingButtonRight } from '../../moduleEvents/events/eventFilter.style'
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
export const DirectiveInfo = () => {

    const [showCreate, setShowCreate] = useState(false);
    
    const [directive, setDirective] = useState<DirectiveInfoData[]>([])

    const [canCreate, setCanCreate] = useState(false);

    const [title, setTitle] = useState('');

    const [description, setDescription] = useState('');

    const [priority, setPriority] = useState<'URGENTE' | 'IMPORTANTE' | 'INFORMATIVO' | null>(null);

    const userId = Number(sessionStorage.getItem("userId"));

    const createDirective = async () => {
        if (!priority || !title || !description) {
            alert("Completa todos los campos y selecciona una prioridad");
            return;
        }

        const newDirective = new DirectiveInfoData(
            userId,
            title,
            description,
            priority.toLowerCase() as Priority
        );

        try {
            await directiveInfoService.createDirectiveInfo(newDirective);
            setShowCreate(false)
            resetValues()
        } catch (error: any) {
            console.error("Error al crear directiva:", error.message);
        }
    };

    const resetValues = () => {
        getDirectives();
        setDescription('');
        setTitle('')
        setPriority(null);
    }

    const getDirectives = async () => {
        try {
            const res = await directiveInfoService.fetchDirectives()
            setDirective(res)
        } catch (error: any) {
            console.error("Error al obtener permisos: ", error.message);
        }
    }

    async function getPermissions() {
        try {
            const permissions = await serviceUser.getPermissionsUser(userId, "DIRECTIVE");
            setCanCreate(permissions.length != 0);
        }
        catch (error: any) {
            console.error("Error al obtener permisos: ", error.message);
        }
    }
    useEffect(() => {
        getPermissions()
        getDirectives()
    }, []);

    return (
        <>
            <div className='scrollable'>
                <section className="scrollable-content">
                    {directive.map((directive, index) => (
                        <CardDirectiveInfo key={index} value={directive} />
                    ))}
                </section>
                {canCreate ? (
                    <>
                        <StyledFloatingButtonRight 
                            color= { showCreate ? "error" : "primary"  }  
                            aria-label="add" 
                            sx={{'&:hover':{backgroundColor: !showCreate ? 'primary.main' : 'error.main'}}}
                            onClick={(_) => setShowCreate(!showCreate)}
                        >
                            { showCreate ? (
                                    <SouthIcon/>
                                ) : (
                                    <NorthIcon/>
                                )
                            }
                        </StyledFloatingButtonRight>

                        <div className={`create-directive ${showCreate ? 'show' : ''}`}>
                                {canCreate && (
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Box sx={{ width: '85%', display: 'flex', flexDirection: 'column', gap: 2, padding: "1rem 1rem 5rem 0"}}>
                                        <TextField
                                            label="titulo"
                                            multiline
                                            minRows={1}
                                            fullWidth
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            sx={{ backgroundColor: 'white', borderRadius: '1rem' }}
                                        />
                                        <TextField
                                            label="Descripción"
                                            multiline
                                            minRows={2}
                                            fullWidth
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            sx={{ backgroundColor: 'white', borderRadius: '1rem' }}
                                        />

                                        <Box sx={{ display: 'flex', gap: 1 , width: '35%', margin: 0}}>
                                            <Chip
                                                label="Urgente"
                                                color="error"
                                                size='small'
                                                variant={priority === 'URGENTE' ? 'filled' : 'outlined'}
                                                onClick={(_) => setPriority('URGENTE')}
                                            />
                                            <Chip
                                                label="Importante"
                                                color="warning"
                                                size='small'
                                                sx={{color:priority == "IMPORTANTE" ? 'white': 'orange'}}
                                                variant={priority === 'IMPORTANTE' ? 'filled' : 'outlined'}
                                                onClick={(_) => setPriority('IMPORTANTE')}
                                            />
                                            <Chip
                                                label="Informativo"
                                                color="primary"
                                                size='small'
                                                variant={priority === 'INFORMATIVO' ? 'filled' : 'outlined'}
                                                sx={{'&:hover':{backgroundColor:'primary.main'}}}
                                                onClick={(_) => setPriority('INFORMATIVO')}
                                            />
                                        </Box>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className='mock-para-pica'
                                        onClick={createDirective}
                                        sx={{ borderRadius: '1rem', height: '11rem' , marginTop : 1.5, '&:hover':{backgroundColor:'primary.main'} }}
                                    >
                                        Crear
                                    </Button>
                                </Box>
                                )}
                        </div>

                    </>
                ) : null}
            </div>
        </>
    );
}