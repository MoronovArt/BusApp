import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../../../store";
import _ from "lodash";
import { useFocusEffect } from '@react-navigation/native';

const useForecast = () => {
    const dispatch = useDispatch<Dispatch>();

    const stopId = useSelector((state: RootState) => state.bus_stops?.selectedStop.id);
    const rest_url = useSelector((state: RootState) => state.cities?.selectedCity.rest_url);
    const { forecast,  isFetching} = useSelector((state: RootState) => {
        const { forecast, isFetching } = state.forecast;
        return {forecast:_.map(forecast), isFetching};
    });

    const refreshList = useCallback(() => {
        dispatch.forecast.SET_IS_FETCHING({isFetching: true});
        setTimeout(() => {
            // @ts-ignore
            dispatch.forecast.getForecast({stopId, rest_url})
            dispatch.forecast.SET_IS_FETCHING({isFetching: false});
        }, 1000);
    }, [stopId, rest_url]);

    useEffect(() => {
        dispatch.forecast.CLEAR_FORECAST();
    }, [])

    useFocusEffect(
        useCallback(() => {
            // @ts-ignore
            dispatch.forecast.getForecast({stopId, rest_url});
            // @ts-ignore
            const timerId = setInterval(() => dispatch.forecast.getForecast({stopId, rest_url}), 10000);
            return () => {
                clearInterval(timerId);
            }
        }, [stopId, rest_url])
    );



    return {
        stopId,
        forecast,
        refreshList,
        isFetching
    }
}

export default useForecast;
