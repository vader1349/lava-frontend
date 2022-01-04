import Login from './Login';
import Frame from './Frame';
import {Routes, Route} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

function App() {

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path='/layout' element={<ProtectedRoute/>}>
          <Route exact path='/layout' element={<Frame/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
