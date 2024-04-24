import Home from './components/Shared/Home';
import CityList from "./components/City/CityList";
import CityEdit from "./components/City/CityEdit";
import CityAdd from './components/City/CityAdd';
import WeatherStationList from './components/WeatherStation/WeatherStationList';

const AppRoutes = [
    {
        path: "/",
        element: <Home/>,
        index: true
    },
    {
        path: "*",
        element: <Home/>
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
        path: "/cities/add",
        element: <CityAdd/>
    },
    {
        path: "/weather-stations",
        element: <WeatherStationList/>
    }
];

export default AppRoutes;
