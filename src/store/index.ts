import {init, RematchDispatch, RematchRootState} from '@rematch/core';
import createRematchPersist from '@rematch/persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as models from './models';
import {RootModel} from "./models";

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>

const persistPlugin = createRematchPersist({
    key: 'root',
    blacklist: [],
    storage: AsyncStorage,
});

const store = init({
    models,
    plugins: [persistPlugin],
});

export default store;
