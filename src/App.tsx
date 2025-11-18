import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import { ProfileImgProvider } from "./context/contextImg";
import { LoaderProvider } from "./context/loader/useLoader";
import { ToastProvider } from "./context/toast/useToast";
import { AppRouter } from "./routes";
import { useEffect, useState } from "react";
import { appTheme } from "./MUI/theme";
import { MaterialUISwitch } from "./MUI/switch";

function App() {
	const [darkMode, setDarkMode] = useState(false);
	const theme = appTheme(darkMode)

	function handleChange() {
		setDarkMode((darkModeValue)=>!darkModeValue)
	}

	useEffect(()=>{
		document.body.setAttribute('data-theme', (darkMode ? "dark" : "light"));
	},[darkMode])

	return (
		<>
			<ThemeProvider theme={theme}>
				<ToastProvider>
					<LoaderProvider>
						<ProfileImgProvider>
							<CssBaseline />
							<AppRouter />
							<SwitchToggleThemeMode checked={darkMode} change={handleChange} />
						</ProfileImgProvider>
					</LoaderProvider>
				</ToastProvider>
			</ThemeProvider>

		</>
	);
}

export default App;

interface SwitchToggleThemeModeProps {

	checked: boolean;

	change: () => void;

}

function SwitchToggleThemeMode(props: SwitchToggleThemeModeProps) {



	return (
		<>
			{window.location.pathname != '/login' &&
				<MaterialUISwitch checked={props.checked} onChange={props.change} ></MaterialUISwitch>
			}
		</>
	);
}