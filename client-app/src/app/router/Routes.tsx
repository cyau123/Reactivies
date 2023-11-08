import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";


export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'activities', element: <ActivityDashboard />},
            {path: 'activities/:id', element: <ActivityDetails />},
            // add key to two components for different states
            {path: 'createActivity', element: <ActivityForm key='create'/>},
            {path: 'manageActivity/:id', element: <ActivityForm key='manage' />},
        ]
    },
]
export const router = createBrowserRouter(routes);