import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './templates/AppLayout'
import Dashboard from './views/Dashboard'
import { CreateProjectsView } from './views/projects/CreateProjectsView'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route index element={<Dashboard/>} />
                    <Route path='/projects/create' element={<CreateProjectsView/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}