import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import SignUpPage from './Components/SignUpPage';
import Dashboard from "./Components/Dashboard";
import MailSender from './Components/MailSender';
import ResetPassword from './Components/ResetPassword';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/"
        element={<Dashboard/>}
        />
        <Route path="/login"
        element={<LoginPage/>}
        />
        <Route path="/signup"
        element={<SignUpPage/>}
        />
        <Route path="/send"
        element={<MailSender/>}
        />
        <Route path="/reset"
        element={<ResetPassword/>}
        />
      </Routes>
    </div>
  );
}

export default App;
