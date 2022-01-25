import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../../../store";
import _ from "lodash";
import {useCallback, useEffect} from "react";
import {CITIES_LIST_LOAD} from "../../../../store/models/cities";

export const useCities = () => {

    const dispatch = useDispatch<Dispatch>();

    const { cities, hasMore, isFetching, searchText, skip, limit } = useSelector((state: RootState) => {
        const { cities, hasMore, isFetching, searchText, skip, limit } = state.cities;
        return {
            cities: _.map(cities, (value, key) => {
                return {...value, id: value.id || key}
            }),  hasMore, isFetching, searchText, skip, limit
        };
    });

    const refreshList = useCallback(() => {
        dispatch.cities.SET_IS_FETCHING({isFetching: true});
        setTimeout(() => {
            // @ts-ignore
            dispatch.cities.getCities({skip:CITIES_LIST_LOAD.SKIP, limit:CITIES_LIST_LOAD.LIMIT, searchText});
            dispatch.cities.SET_IS_FETCHING({isFetching: false});
        }, 1000);
    }, [searchText]);

    const getMore = useCallback(() => {
        // @ts-ignore
        if(hasMore) dispatch.cities.getCities({skip:skip + CITIES_LIST_LOAD.LIMIT, limit:limit + CITIES_LIST_LOAD.LIMIT, searchText});
    }, [limit, skip, hasMore, searchText]);

    useEffect(() => {
        // @ts-ignore
        dispatch.cities.getCities({skip:CITIES_LIST_LOAD.SKIP, limit:CITIES_LIST_LOAD.LIMIT, searchText:""});
        return () => {
            dispatch.cities.CLEAR_CITIES();
        }
    }, []);

    return {
        cities,
        hasMore,
        isFetching,
        refreshList,
        getMore,
    }

}
