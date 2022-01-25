import {init, RematchDispatch, RematchRootState} from '@rematch/core';
import persist from '@rematch/persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { models, RootModel } from './models';


export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>

const persistPlugin = persist({
    key: 'root',
    blacklist: [],
    storage: AsyncStorage,
});

const middlewares = [];

if (__DEV__) {
    const createDebugger = require("redux-flipper-colorized").default;
    middlewares.push(createDebugger());
}

const store = init({
    models,
    plugins: [
        // @ts-ignore
        persistPlugin
    ],
    redux: {
        middlewares,
        devtoolOptions: { disabled: false },
    }
});

export default store;
