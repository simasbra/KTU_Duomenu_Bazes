import Home from './components/Home';
import CityList from "./components/City/CityList";
import CityEdit from "./components/City/CityEdit";
import CityAdd from './components/City/CityAdd';

const AppRoutes = [
    {
        path: "/",
        element: <Home/>,
        index: true
    },
    {
        path: "/cities",
        element: <CityList/>
    },
    {
        path: "/cities/:name/edit",
        element: <CityEdit/>
    },
    {
        path: "/cities/new",
        element: <CityAdd/>
    },
    {
        path: "*",
        element: <Home/>
    }
];

export default AppRoutes;
