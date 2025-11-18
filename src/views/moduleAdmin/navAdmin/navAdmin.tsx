import './navAdmin.css'
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export const NavAdmin = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [prevPath, setPrevPath] = useState<string | null>(null)

    useEffect(() => {
        setPrevPath(location.pathname)
    }, [location.pathname])

    const links = [
        { path: '/module-admin/create-user', label: 'Crear Usuario' },
        { path: '/module-admin/search-user', label: 'Buscar Usuario' },

    ]

    return (
        <nav className="navegacion">
            {links.map(({ path, label }) => {
                const isActive = location.pathname === path
                const wasActive = prevPath === path && !isActive
                return (
                    <a
                        key={path}
                        className={`nav-link ${isActive ? 'activo' : ''} ${wasActive ? 'desactivo' : ''}`}
                        onClick={(_) => navigate(path)}
                    >
                        {label}
                    </a>
                )
            })}
        </nav>
    )
}
