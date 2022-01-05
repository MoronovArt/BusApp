import {RootModel} from "./index";
import {createModel} from "@rematch/core";
import {Dispatch} from "../index";


type TState = {
    stops: []
}

export const bus_stops = createModel<RootModel>()({
    state: {
        stops: []
    } as TState,
    reducers: {

    },
    effects: (dispatch: Dispatch) => ({
        async getStops() {

        }
    })
})
