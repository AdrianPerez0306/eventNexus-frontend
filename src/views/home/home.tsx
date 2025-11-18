import { useEffect, useState } from 'react'
import { ModuleCard } from '../../components/module/module'
import { Module } from '../../domain/module'
import { moduleService } from '../../services/moduleService'
import './home.css'
import { Title } from '../../components/title/title'


export const Home = () => {
    const [modules, setModules] = useState<Module[]>([])
    const id = Number(sessionStorage.getItem("userId"));
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)

    const getModules = async () => {
        try {
            setLoading(true)
            const res = await moduleService.getModules(id)
            setModules(res)
            setLoading(false)
        } catch (e: unknown) {
             
        }
    }

    useEffect(() => {
        getModules()
    }, [])
    
    return (
        <>     
            <Title title='Modulos'></Title>
            <div className='scroll'>
                <main className='main' >
                    {modules.map((module, index) => (
                        <ModuleCard
                            key={module.id}
                            value={module}
                            setIndex={() => setSelectedIndex(index)}
                            maxLenght={modules.length}
                        />
                    ))}
                </main>
            </div>
            <img className='image-home' src="EventNexusImagotipo.png" />
        </>
    )

}