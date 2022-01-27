import {RootModel} from "./index";
import {createModel} from "@rematch/core";
import store, {Dispatch, RootState} from "../index";
import {postAPI, TCitiesSuccessResponse, TStop, TStopsSuccessResponse} from "../../api/Api";
import * as _ from "lodash";
import {Alert} from "react-native";

export enum STOPS_LIST_LOAD {
    SKIP = 1,
    LIMIT = 20
}

type TState = {
    hasMore: boolean,
    skip: number,
    limit: number,
    isFetching: boolean,
    selectedStop: {
        id: string,
        name: string,
        transport_type: string
    },
    stops: TStopsSuccessResponse["stops"],
    searchText: string
}

export const bus_stops = createModel<RootModel>()({
    state: {
        hasMore: true,
        skip: STOPS_LIST_LOAD.SKIP,
        limit: STOPS_LIST_LOAD.LIMIT,
        isFetching: false,
        selectedStop: {
            id: "",
            name: "",
            transport_type: ""
        },
        stops: {

        },
        searchText:""
    } as TState,
    reducers: {
        SET_STOPS: (state, payload) => {
            return {
                ...state,
                skip: payload.skip,
                limit: payload.limit,
                hasMore: payload.hasMore,
                stops: (
                    payload.skip === 1 ?
                        payload.stops :
                        {...state.stops, ...payload.stops}
                ),
                searchText: payload.searchText || ""
            }
        },
        CLEAR_STOPS: (state) => {
            return {
                ...state,
                hasMore: true,
                skip: STOPS_LIST_LOAD.SKIP,
                limit: STOPS_LIST_LOAD.LIMIT,
                isFetching: false,
                stops: {

                },
                searchText:""
            }
        },
        SET_SELECTED_STOP: (state, payload) => {
            return {
                ...state,
                selectedStop: {
                    id: payload.id,
                    name: payload.name,
                    transport_type: payload.transport_type
                }
            }
        },
        SET_IS_FETCHING: (state, payload) => {
            return {
                ...state,
                isFetching: payload.isFetching
            }
        },
        SET_SEARCH_TEXT: (state, payload) => {
            return {
                ...state,
                searchText: payload.searchText
            }
        }
    },
    effects: (dispatch: Dispatch) => {
        const { bus_stops, cities } = dispatch;

        return {
            async getStops(payload: {accountId: string, skip: number, limit: number, searchText?: string, rest_url?: string, cityId?: string}): Promise<any> {
                const {accountId, skip, limit, searchText, rest_url, cityId} = payload;
                const result = await postAPI.getStopsJson(accountId, skip, limit, searchText, undefined, rest_url, cityId);
                if(result.code === 'ok') {
                    bus_stops.SET_STOPS({stops:result.stops, skip, limit, hasMore:result.hasMore, searchText});
                } else {
                    Alert.alert("Ошибка", result.text);
                }

            },
            async setQrData(payload: {stopId: string, cityId: string}, state: RootState): Promise<any> {
                const { stopId, cityId } = payload;
                const {
                    cities: { skip: cSkip, limit: cLimit, searchText: cSearchText },
                    bus_stops: { skip: sSkip, limit: sLimit, searchText: sSearchText }
                } = state;

                const cResult = await postAPI.getCities(cSkip, cLimit, cSearchText, cityId);

                if(cResult.code === "ok") {
                    const { account_id, name: cName, id: cId, rest_url, city_info} = _.find<TCitiesSuccessResponse["cities"]>(cResult.cities, () => true) || {};
                    const sResult = await postAPI.getStopsJson(account_id as string, sSkip, sLimit, sSearchText, stopId, rest_url, cityId);
                    cities.SET_SELECTED_CITY({id: cId, name: cName, account_id: account_id, rest_url, city_info});
                    if(sResult.code === "ok") {
                        const { name: sName, id: sId, transport_type: sTransportType} = _.find<TStopsSuccessResponse["stops"]>(sResult.stops, () => true) || {};
                        bus_stops.SET_SELECTED_STOP({id:sId, name: sName, transport_type: sTransportType});
                    }
                }

            }
        }
    }
})
