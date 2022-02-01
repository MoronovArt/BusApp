import {createModel} from "@rematch/core";
import {RootModel} from "./index";

export const offline = createModel<RootModel>()({
    state: {
        is_offline: false
    },
    reducers: {
        SET_IS_OFFLINE: (state, payload) => {
            return {
                ...state,
                is_offline: payload.is_offline
            }
        }
    }
})
