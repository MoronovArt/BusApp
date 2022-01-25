import { bus_stops } from './bus_stops';
import { cities } from "./cities";
import { forecast } from "./forecast";
import { Models } from "@rematch/core";

export interface RootModel extends Models<RootModel> {
    bus_stops: typeof bus_stops
    cities: typeof cities
    forecast: typeof forecast
}

export const models: RootModel = { bus_stops, cities, forecast }
