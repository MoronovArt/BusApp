import {createModel} from "@rematch/core";
import {RootModel} from "./index";
import {Dispatch, RootState} from "../index";
import {postAPI, TForecastSuccessResponse} from "../../api/Api";
import {batch} from "react-redux";

interface TState {
    isRefreshing: boolean
    forecast: TForecastSuccessResponse["forecast"]
    isFetching: boolean
}

export const forecast = createModel<RootModel>()({
    state: {
        isRefreshing: false,
        isFetching: false,
        forecast: {},
    } as TState,
    reducers: {
        SET_IS_REFRESHING: (state, payload) => {
            return {
                ...state,
                isRefreshing: payload.isRefreshing
            }
        },
        SET_IS_FETCHING: (state, payload) => {
            return {
                ...state,
                isFetching: payload.isFetching
            }
        },
        SET_FORECAST: (state, payload) => {
            return {
                ...state,
                forecast: {
                    ...payload.forecast
                }
            }
        },
        CLEAR_FORECAST: (state) => {
            return {
                ...state,
                forecast: {}
            }
        },
    },
    effects: (dispatch: Dispatch) =>  {

        const { forecast } = dispatch;

        return {
            async getForecast(payload: {stopId: string, rest_url: string}, rootState: RootState): Promise<any> {
                const {stopId, rest_url} = payload;
                const result = await postAPI.getForecastJson(stopId, rest_url);
                batch(() => {
                    if(result.code === 'ok') {
                        forecast.SET_FORECAST({forecast: result.forecast})
                    } else {
                        forecast.SET_FORECAST({forecast: {}})
                    }
                    dispatch.forecast.SET_IS_FETCHING({isFetching: false});
                })
            }
        }
    }
})
