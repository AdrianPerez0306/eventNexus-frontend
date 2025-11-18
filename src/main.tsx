import { createRoot } from 'react-dom/client'
import './index.css'
import './utils/interceptor'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
	<App />
)
