import { Home } from "./components/Home";
import { CityList } from "./components/City/CityList";

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
        path: "*",
        element: <Home/>
    }
];

export default AppRoutes;
