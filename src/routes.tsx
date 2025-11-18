import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ViewLayout } from './components/viewLayout/viewLayout';
import { Home } from './views/home/home';
import { Login } from './views/login/login';
import { Profile } from './views/profile/profile';
import { ModuleEvents } from './views/moduleEvents/moduleEvents';
import { CreateEvent } from './views/moduleEvents/createEvent/createEvent';
import { Events } from './views/moduleEvents/events/events';
import {CreateUss} from './views/moduleAdmin/createUss/createUss';
import { ModuleAdmin } from './views/moduleAdmin/moculeAdmint';
import { SearchUser } from './views/moduleAdmin/searchUss/searchUss';
import { CredentialsComponent } from './views/credentials/credentials';
import { DirectiveInfo } from './views/moduleDirectiveInfo/DirectiveInfo/directiveInfo';




export const AppRouter = () => {

    

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login/> } path = 'login' ></Route>
                <Route element={<CredentialsComponent/> } path = 'register' ></Route>
                <Route element={<CredentialsComponent/> } path = 'recovery' ></Route>
                <Route element={<ViewLayout></ViewLayout>}>
                    <Route element={<Home /> } path = 'home' ></Route>
                    <Route element={<Profile /> } path = 'profile' ></Route>
                    <Route element={<ModuleEvents/>} path = 'module-events'>
                        <Route element= {<Events/>} path = 'events' ></Route>
                        <Route element = {<CreateEvent/>} path = 'create-event' ></Route>
                    </Route>
                    <Route element={<ModuleAdmin/> } path = 'module-admin' >
                        <Route element = {<CreateUss/>} path='create-user'></Route>
                        <Route element = {<SearchUser/>} path='search-user'></Route>
                        <Route element={<CreateUss />} path="updateUser/:id"></Route>
                    </Route>
                    <Route element={<DirectiveInfo/> } path = 'module-directive-info' ></Route>
                </Route>
                <Route path="/" element={<Navigate to="/login" />}></Route>{/* por defecto me lleva al login */}
                <Route path="*" element={<Home />}></Route>{/* momentaneamente redirecciona al home si la ruta se escribe mal */}
            </Routes>
        </BrowserRouter>
    );

}