import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../../../store";
import _ from "lodash";
import { useFocusEffect } from '@react-navigation/native';

const useForecast = () => {
    const dispatch = useDispatch<Dispatch>();

    const stopId = useSelector((state: RootState) => state.bus_stops?.selectedStop.id);
    const rest_url = useSelector((state: RootState) => state.cities?.selectedCity.rest_url);
    const { forecast,  isRefreshing, isFetching} = useSelector((state: RootState) => {
        const { forecast, isRefreshing, isFetching } = state.forecast;
        return {forecast:_.map(forecast), isRefreshing, isFetching};
    });

    const refreshList = useCallback(() => {
        dispatch.forecast.SET_IS_REFRESHING({isRefreshing: true});
        setTimeout(() => {
            // @ts-ignore
            dispatch.forecast.getForecast({stopId, rest_url})
            dispatch.forecast.SET_IS_REFRESHING({isRefreshing: false});
        }, 1000);
    }, [stopId, rest_url]);

    useEffect(() => {
        dispatch.forecast.CLEAR_FORECAST();
    }, [])

    useFocusEffect(
        useCallback(() => {
            let timerId = 0;

            if(stopId) {
                dispatch.forecast.SET_IS_FETCHING({isFetching: true});
                setTimeout(() => {
                    // @ts-ignore
                    dispatch.forecast.getForecast({stopId, rest_url});
                }, 1000);

                // @ts-ignore
                timerId = setInterval(() => dispatch.forecast.getForecast({stopId, rest_url}), 10000);
            }
            return () => {
                if(stopId) {
                    clearInterval(timerId);
                }
                setTimeout(() => {
                    dispatch.forecast.CLEAR_FORECAST();
                }, 200)
            }
        }, [stopId, rest_url])
    );



    return {
        stopId,
        forecast,
        refreshList,
        isRefreshing,
        isFetching
    }
}

export default useForecast;
