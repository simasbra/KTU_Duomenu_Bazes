import Home from './components/Shared/Home';
import CityList from "./components/City/CityList";
import CityEdit from "./components/City/CityEdit";
import CityAdd from './components/City/CityAdd';
import WeatherStationList from './components/WeatherStation/WeatherStationList';
import WeatherStationEdit from './components/WeatherStation/WeatherStationEdit';

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
    // Cities:
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
    // Weather Stations:
    {
        path: "/weather-stations",
        element: <WeatherStationList/>
    },
    {
        path: "/weather-stations/:code/edit",
        element: <WeatherStationEdit/>
    }
];

export default AppRoutes;
