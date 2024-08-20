import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import About from "./screens/About";
import Courses from "./screens/Courses";
import Tests from "./screens/Tests";
import Contact from "./screens/Contact";
import Notices from "./screens/Notices";
import TeacherDash from "./screens/TeacherDash";
import TeacherCourses from "./screens/TeacherCourses";
import TeacherTests from "./screens/TeacherTests";
import AddQuestion from "./screens/AddQuestion";
import AdminRegister from "./screens/AdminRegister";
import UserLogin from "./screens/UserLogin";
import UserRegister from "./screens/UserRegister";
import BulkRegister from "./screens/BulkRegister";
import StudentDash from "./screens/StudentDash";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import CodeValidityContext from "./contexts/CodeValidityContext";
import NotificationContext from "./contexts/NotificationContext";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <NotificationContext>
          <CodeValidityContext>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/courses" component={Courses} />
              <Route exact path="/tests" component={Tests} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/notices" component={Notices} />
              <Route exact path="/admin_register" component={AdminRegister} />
              <Route exact path="/teacher_dashboard" component={TeacherDash} />
              <Route exact path="/teacher_courses" component={TeacherCourses} />
              <Route exact path="/teacher_tests" component={TeacherTests} />
              <Route exact path="/add_question" component={AddQuestion} />
              <Route exact path="/user_login" component={UserLogin} />
              <Route exact path="/user_register" component={UserRegister} />
              <Route exact path="/bulk_register" component={BulkRegister} />
              <Route exact path="/student_dashboard" component={StudentDash} />
              <Redirect to="/" />
            </Switch>
          </CodeValidityContext>
        </NotificationContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
