import Login from './Login';
import {Routes, Route} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Workspace from './Workspace';
import CreateCourse from './CreateCourse';
import EditCourse from './EditCourse';
import CreateUser from './CreateUser';
import EditUser from './EditUser';

function App() {

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route path='/workspace' element={<ProtectedRoute/>}>
          <Route path='/workspace' element={<Workspace/>}>
            <Route path='create_course' element={<CreateCourse/>}/>
            <Route path='edit_course' element={<EditCourse/>}/>
            <Route path='create_user' element={<CreateUser/>}/>
            <Route path='edit_user' element={<EditUser/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
