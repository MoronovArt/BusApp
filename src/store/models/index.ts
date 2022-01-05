import { bus_stops } from './bus_stops';
import { Models } from "@rematch/core"

export interface RootModel extends Models<RootModel> {
    bus_stops: typeof bus_stops
}

export const models: RootModel = { bus_stops }
