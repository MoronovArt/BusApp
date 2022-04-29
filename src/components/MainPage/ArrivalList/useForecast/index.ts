import {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../../../store";
import _ from "lodash";
import { useFocusEffect } from '@react-navigation/native';
import {useAppState} from "../../../../hooks";

const useForecast = () => {
    const dispatch = useDispatch<Dispatch>();
    const appState = useAppState();
    const [timerId, setTimerId] = useState<any>(0);
    const prevStopId = useRef("");

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
        return () => {
            dispatch.forecast.CLEAR_FORECAST();
        }
    }, [])

    useFocusEffect(
        useCallback(() => {
            (async () => {
                if(stopId && appState === "active" && prevStopId.current !== stopId) {
                    //console.log(1, stopId + " " + rest_url + " " + timerId);
                    dispatch.forecast.SET_IS_FETCHING({isFetching: true});
                    // @ts-ignore
                    await dispatch.forecast.getForecast({stopId, rest_url});

                    clearInterval(timerId);

                    setTimerId(setInterval(() => {
                        dispatch.forecast.SET_IS_FETCHING({isFetching: true});
                        // @ts-ignore
                        dispatch.forecast.getForecast({stopId, rest_url})
                    }, 10000));

                    prevStopId.current = stopId;

                    //console.log(2, stopId + " " + rest_url + " " + timerId);
                }
            })()

            return () => {
                if(prevStopId.current !== stopId) {
                    clearInterval(timerId);
                    //console.log(3, stopId + " "+ rest_url + " " + timerId);
                }
            }
        }, [stopId, rest_url, timerId, appState])
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
