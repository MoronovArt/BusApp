import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../store";

const useStopsMode = () => {
    const dispatch = useDispatch<Dispatch>();

    const mode = useSelector((state: RootState) => state.bus_stops?.stops_mode);

    const setMode = (mode: 'map' | 'list') => {
        dispatch.bus_stops.SET_STOPS_MODE(mode);
    }

    return {mode, setMode}
}

export default useStopsMode;
