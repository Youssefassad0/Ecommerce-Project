import Profile from "../admin/components/Profile/Profile";
import Home from "../../Home/Home";

const routes = [
    {
        path: '/dashboard',
        exact: true,
        name: 'admin'
    }, 
    {
        path: '/dashboard/profile',
        exact: true,
        name: 'profile',
        component: Profile
    }, 
    {
        path: '/dashboard/admin',
        exact: true,
        name: 'dashboard',
        component: Home
    },
];

export default routes
