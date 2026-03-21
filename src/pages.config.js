import AuthPage from './pages/AuthPage';
import ExamSimulator from './pages/ExamSimulator';
import Home from './pages/Home';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AuthPage": AuthPage,
    "ExamSimulator": ExamSimulator,
    "Home": Home,
    "Register": Register,
    "Dashboard": Dashboard,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};