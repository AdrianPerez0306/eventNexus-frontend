import { useEffect, useState } from 'react'
import { ModuleCard } from '../../components/module/module'
import { Module } from '../../domain/module'
import { moduleService } from '../../services/moduleService'
import './home.css'
import { Title } from '../../components/title/title'


export const Home = () => {
    const [modules, setModules] = useState<Module[]>([])
    const [ _, setSelectedIndex] = useState<number>(0)
    const [ __ ,setLoading] = useState<boolean>(false)

    const getModules = async () => {
        try {
            setLoading((prev)=>(!prev))
            const res = await moduleService.getModules()
            setModules(res)
            setLoading((prev)=>(!prev))
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