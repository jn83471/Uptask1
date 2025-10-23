import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './templates/AppLayout'
import Dashboard from './views/Dashboard'
import { CreateProjectsView } from './views/projects/CreateProjectsView'
import EditProjectView from './views/tasks/EditProjectView'
import { ProjectDetailsView } from './views/projects/ProjectDetailsView'
import AuthLayout from './templates/AuthLayout'
import Login from './views/auth/Login'
import RegisterView from './components/auth/RegisterView'
import ConfirmAccountView from './views/auth/ConfirmAccountView'
import RequestNewCodeView from './views/auth/RequestNewCodeView'
import ForgotPasswordView from './views/auth/ForgotPasswordView'
import NewPasswordToken from './components/auth/NewPasswordToken'
import NewPasswordView from './views/auth/NewPasswordView'


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route index element={<Dashboard/>} />
                    <Route path='/projects/create' element={<CreateProjectsView/>} />
                    <Route path='/projects/:projectId' element={<ProjectDetailsView/>} />
                    <Route path='/projects/:projectId/edit' element={<EditProjectView/>} />
                </Route>
                <Route element={<AuthLayout/>}>
                    <Route path='/auth/login' element={<Login/>}/>
                    <Route path='/auth/register' element={<RegisterView/>}/>
                    <Route path='/auth/confirm-account' element={<ConfirmAccountView/>}/>
                    <Route path='/auth/new-code' element={<RequestNewCodeView/>}/>
                    <Route path='/auth/forgot-password' element={<ForgotPasswordView/>}/>
                    <Route path='/auth/new-password' element={<NewPasswordView/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
//new-password