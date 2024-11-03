/* Imports */
import './App.css';
import './colors.css';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoutes';
import Element from './element/Element';
import LoginPage from './login/LoginForm';
import CreateElementPage from './element/CreateElementPage';
import UpdateElementPage from './element/UpdateElementPage';
import RelationsPage from './relations/RelationsPage';
import CreateRelationPage from './relations/CreateRelationPage';
import { CompaniesPage } from './companies/CompaniesPage';
import { CompanyCreate } from './companies/CompaniesCreate';
import EvaluationPage from './evaluations/EvaluationPage';
import InProgressFirst from './evaluations/InProgressFirst';
import { InProgressEva } from './evaluations/inProgressEva';



/* App */
function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/element" element={<ProtectedRoute><Element/></ProtectedRoute>}/>
            <Route path='/create-element' element={<ProtectedRoute><CreateElementPage/></ProtectedRoute>}/>
            <Route path='/update-element' element={<ProtectedRoute><UpdateElementPage/></ProtectedRoute>}/>
            <Route path='/relation-page' element={<ProtectedRoute><RelationsPage/></ProtectedRoute>}/>
            <Route path='/create-relation' element={<ProtectedRoute><CreateRelationPage/></ProtectedRoute>}/>
            <Route path='/evaluations-page' element={<ProtectedRoute><EvaluationPage/></ProtectedRoute>}/>
            <Route path='/companies-page' element={<ProtectedRoute><CompaniesPage/></ProtectedRoute>}/>
            <Route path='/create-company' element={<ProtectedRoute><CompanyCreate/></ProtectedRoute>}/>
            <Route path='/in-progress-first' element={<ProtectedRoute><InProgressFirst/></ProtectedRoute>}/>
            <Route path='/in-progress-eva' element={<ProtectedRoute><InProgressEva/></ProtectedRoute>}/>
        </Routes>        
    );
}



/* Export */
export default App;
