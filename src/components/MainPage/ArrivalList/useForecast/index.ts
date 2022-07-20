import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../../../store';
import _ from 'lodash';
import {useAppState} from '../../../../hooks';

const useForecast = () => {
  const dispatch = useDispatch<Dispatch>();
  const appState = useAppState();
  const [timerId, setTimerId] = useState<any>(0);
  const prevStopId = useRef('');
  const prevIsOffline = useRef(true);

  const isOffline = useSelector(
    (state: RootState) => state.offline?.is_offline,
  );
  const stopId = useSelector(
    (state: RootState) => state.bus_stops?.selectedStop.id,
  );
  const rest_url = useSelector(
    (state: RootState) => state.cities?.selectedCity.rest_url,
  );
  const {forecast, isRefreshing, isFetching} = useSelector(
    (state: RootState) => {
      const {forecast, isRefreshing, isFetching} = state.forecast;
      return {forecast: _.map(forecast), isRefreshing, isFetching};
    },
  );

  const refreshList = useCallback(() => {
    dispatch.forecast.SET_IS_REFRESHING({isRefreshing: true});
    const timeout = setTimeout(() => {
      // @ts-ignore
      dispatch.forecast.getForecast({stopId, rest_url});
      dispatch.forecast.SET_IS_REFRESHING({isRefreshing: false});
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [stopId, rest_url]);

  useEffect(() => {
    dispatch.forecast.CLEAR_FORECAST();
    return () => {
      dispatch.forecast.CLEAR_FORECAST();
      dispatch.forecast.SET_IS_REFRESHING({isRefreshing: false});
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    (async () => {
      if (
        (stopId && appState === 'active' && prevStopId.current !== stopId) ||
        (prevIsOffline.current !== isOffline && isOffline)
      ) {
        dispatch.forecast.SET_IS_FETCHING({isFetching: true});
        // @ts-ignore
        await dispatch.forecast.getForecast({stopId, rest_url});

        console.log(timerId, isOffline);

        clearInterval(timerId);

        if (!isOffline) {
          const interval = setInterval(() => {
            console.log(1);
            dispatch.forecast.SET_IS_FETCHING({isFetching: true});
            // @ts-ignore
            dispatch.forecast.getForecast({stopId, rest_url});
          }, 10000);

          setTimerId(interval);
        }
      }
    })();

    prevStopId.current = stopId;
    prevIsOffline.current = isOffline;

    return () => {
      if (
        prevStopId.current !== stopId ||
        (prevIsOffline.current !== isOffline && isOffline)
      ) {
        clearInterval(timerId);
      }
    };
  }, [stopId, appState, dispatch.forecast, rest_url, timerId, isOffline]);

  return {
    stopId,
    forecast,
    refreshList,
    isRefreshing,
    isFetching,
  };
};

export default useForecast;
