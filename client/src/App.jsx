import { Routes, Route } from 'react-router-dom';
import { Home } from "./components/Home/Home";
import { About } from "./components/About/About";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Tasks } from "./components/Tasks/Tasks";
import { TasksForm } from "./components/Tasks/TasksForm";
import { Profile } from "./components/Profile/Profile"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/tasks/create" element={<TasksForm />} />
      <Route path="/tasks/1/update" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App