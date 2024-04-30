import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import CityView from "../components/City/CityView";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/CityView">
                <CityView/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;