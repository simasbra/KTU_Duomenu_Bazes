import Home from './components/Shared/Home';
import CityList from "./components/City/CityList";
import CityEdit from "./components/City/CityEdit";
import CityAdd from './components/City/CityAdd';
import CityView from './components/City/CityView';
import WeatherStationList from './components/WeatherStation/WeatherStationList';
import WeatherStationEdit from './components/WeatherStation/WeatherStationEdit';
import WeatherStationView from './components/WeatherStation/WeatherStationView';
import OperationalStatusView from './components/OperationalStatus/OperationalStatusView';
import OperationalStatusEdit from './components/OperationalStatus/OperationalStatusEdit';

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
        path: "/cities/:name",
        element: <CityView/>
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
        path: "/weather-stations/:code",
        element: <WeatherStationView/>
    },
    {
        path: "/weather-stations/:code/edit",
        element: <WeatherStationEdit/>
    },
    // Weather Station Operational Status:
    {
        path: "/weather-stations/:code/operational-status",
        element: <OperationalStatusView/>
    },
    {
        path: "/weather-stations/:code/operational-status/:id/edit",
        element: <OperationalStatusEdit/>
    }
];

export default AppRoutes;
