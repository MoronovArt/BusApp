import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../../../store";
import _ from "lodash";
import {useCallback, useEffect} from "react";
import {STOPS_LIST_LOAD} from "../../../../store/models/bus_stops";

export const useStops = () => {

    const dispatch = useDispatch<Dispatch>();

    const { account_id, rest_url, id: cityId } = useSelector((state: RootState) => state.cities?.selectedCity);

    const { stops, hasMore, isFetching, searchText, skip, limit } = useSelector((state: RootState) => {
        const { stops, hasMore, isFetching, searchText, skip, limit } = state.bus_stops;
        return {
            stops: _.map(stops, (value, key) => {
                return {...value, id: value.id || key}
            }),  hasMore, isFetching, searchText, skip, limit
        };
    });

    const refreshList = useCallback(() => {
        dispatch.bus_stops.SET_IS_FETCHING({isFetching: true});
        setTimeout(() => {
            // @ts-ignore
            dispatch.bus_stops.getStops({accountId: account_id, skip:STOPS_LIST_LOAD.SKIP, limit:STOPS_LIST_LOAD.LIMIT, searchText, rest_url, cityId});
            dispatch.bus_stops.SET_IS_FETCHING({isFetching: false});
        }, 1000);
    }, [searchText, account_id, rest_url]);

    const getMore = useCallback(() => {
        // @ts-ignore
        if(hasMore) dispatch.bus_stops.getStops({accountId: account_id, skip:skip + STOPS_LIST_LOAD.LIMIT, limit:limit + STOPS_LIST_LOAD.LIMIT, searchText, rest_url, cityId});
    }, [account_id, limit, skip, hasMore, searchText, rest_url]);

    useEffect(() => {
        // @ts-ignore
        dispatch.bus_stops.getStops({accountId:account_id, skip:STOPS_LIST_LOAD.SKIP, limit:STOPS_LIST_LOAD.LIMIT, searchText:"", rest_url, cityId});
        return () => {
            dispatch.bus_stops.CLEAR_STOPS();
        }
    }, [account_id, rest_url]);

    return {
        stops,
        hasMore,
        isFetching,
        refreshList,
        getMore,
    }

}
