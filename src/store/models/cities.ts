import {createModel} from "@rematch/core";
import {RootModel} from "./index";
import {postAPI, TCitiesSuccessResponse, TForecastSuccessResponse, TStopsSuccessResponse} from "../../api/Api";
import {STOPS_LIST_LOAD} from "./bus_stops";
import {Dispatch, RootState} from "../index";
import * as _ from "lodash";
import {Alert} from "react-native";

export enum CITIES_LIST_LOAD {
    SKIP = 1,
    LIMIT = 20
}

type TState = {
    hasMore: boolean,
    skip: number,
    limit: number,
    isFetching: boolean,
    selectedCity: {
        id: string,
        name: string,
        account_id: string,
        rest_url: string,
        city_info?: string
    },
    cities: TCitiesSuccessResponse["cities"],
    searchText: string
}

export const cities = createModel<RootModel>()({
    state: {
        hasMore: true,
        skip: CITIES_LIST_LOAD.SKIP,
        limit: CITIES_LIST_LOAD.LIMIT,
        isFetching: false,
        selectedCity: {},
        cities: {},
        searchText: ""
    } as TState,
    reducers: {
        SET_CITIES: (state, payload) => {
            return {
                ...state,
                skip: payload.skip,
                limit: payload.limit,
                hasMore: payload.hasMore,
                cities: (
                    payload.skip === 1 ?
                        payload.cities :
                        {...state.cities, ...payload.cities}
                ),
                searchText: payload.searchText || ""
            }
        },
        CLEAR_CITIES: (state) => {
            return {
                ...state,
                hasMore: true,
                skip: STOPS_LIST_LOAD.SKIP,
                limit: STOPS_LIST_LOAD.LIMIT,
                isFetching: false,
                cities: {

                },
                searchText:""
            }
        },
        SET_SELECTED_CITY: (state, payload) => {
            return {
                ...state,
                selectedCity: {
                    ...payload
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
    effects: (dispatch: Dispatch) =>  {
        const { cities } = dispatch;

        return {
            async getCities(payload: {skip: number, limit: number, searchText?: string}, state: RootState): Promise<any> {
                const {skip, limit, searchText} = payload;

                const {is_offline} = state.offline;
                if(is_offline) {
                    Alert.alert("Ошибка", "Отсутствует соединение с интернетом.");
                    return;
                }

                const result = await postAPI.getCities(skip, limit, searchText);
                if(result.code === 'ok') {
                    cities.SET_CITIES({cities:result.cities, skip, limit, hasMore:result.hasMore, searchText});
                } else {
                    Alert.alert("Ошибка", result.text);
                }

            }
        }
    }
});
