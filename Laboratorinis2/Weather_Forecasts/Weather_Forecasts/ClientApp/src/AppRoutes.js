import Home from './components/Shared/Home';
import CityList from "./components/City/CityList";
import CityEdit from "./components/City/CityEdit";
import CityAdd from './components/City/CityAdd';
import CityView from './components/City/CityView';
import WeatherStationList from './components/WeatherStation/WeatherStationList';
import WeatherStationEdit from './components/WeatherStation/WeatherStationEdit';
import WeatherStationView from './components/WeatherStation/WeatherStationView';
import WeatherStationAdd from './components/WeatherStation/WeatherStationAdd';
import OperationalStatusView from './components/OperationalStatus/OperationalStatusView';
import OperationalStatusEdit from './components/OperationalStatus/OperationalStatusEdit';
import WeatherForecastList from './components/WeatherForecast/WeatherForecastList';
import WeatherForecastView from './components/WeatherForecast/WeatherForecastView';
import WeatherForecastAdd from './components/WeatherForecast/WeatherForecastAdd';
import WeatherForecastEdit from './components/WeatherForecast/WeatherForecastEdit';
import TemperatureReportFilter from './components/TemperatureReport/TemperatureReportFilter';

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
    {
        path: "/weather-stations/add",
        element: <WeatherStationAdd/>
    },
    // Weather Station Operational Status:
    {
        path: "/weather-stations/:code/operational-status",
        element: <OperationalStatusView/>
    },
    {
        path: "/weather-stations/:code/operational-status/:id/edit",
        element: <OperationalStatusEdit/>
    },
    // Weather Forecasts:
    {
        path: "/weather-forecasts",
        element: <WeatherForecastList/>
    },
    {
        path: "/weather-forecasts/:code",
        element: <WeatherForecastView/>
    },
    {
        path: "/weather-forecasts/:code/edit",
        element: <WeatherForecastEdit/>
    },
    {
        path: "/weather-forecasts/add",
        element: <WeatherForecastAdd/>
    },
    // Temperature Reports:
    {
        path: "/temperature-reports",
        element: <TemperatureReportFilter/>
    }
];

export default AppRoutes;
