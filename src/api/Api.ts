import axios, {AxiosResponse} from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as _ from "lodash";
import moment from "moment-timezone";
import {Alert} from "react-native";

export const globalParameters: TGlobalParameters = {
    clientVersion: 1,
    timeZone: moment.tz(moment.tz.guess()).format('Z'),
    servUrl: "https://nistk.ru",
    funcParameters: []
};

const instance = axios.create({
    withCredentials:true,
    baseURL: globalParameters.servUrl + '/ords/r/gdebus_pck/' + globalParameters.clientVersion + '/get_data',
    headers: {
        "Access-Control-Allow-Origin":'*',
        "Access-Control-Allow-Methods": 'POST, GET, PUT, DELETE, OPTIONS',
        "Access-Control-Allow-Credentials": 'false',
        "Access-Control-Allow-Headers": 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
    }
});

type TFuncParameter = {
    name: string
    data_type: string
    value: string
}

type TObjectParameters = {
    object_name: string,
    client_version: number,
    parameters:TFuncParameter[],
    timezone: string
    username?: string
}

type TGetFuncObjParameters = {
    data: TObjectParameters
}

export type TGlobalParameters = {
    clientVersion: number,
    timeZone: string,
    servUrl: string,
    funcParameters: TFuncParameters[]
}

export type TFuncParameters = {
    object_name: string,
    parameters:TFuncParameter[],
}

export const paramsAPI = {
    async callServerFunction<T extends TGetFuncObjParameters>(data: T, srvUrl?: string): Promise<any> {
        try {
            let respInst;
            const formData = new FormData();
            const timeout = await AsyncStorage.getItem("TIMEOUT");
            formData.append("body", JSON.stringify(data));
            try {
                const resultTimeout = Number(timeout) || 10000;

                respInst = await instance.post<AxiosResponse>(srvUrl || '', formData, {headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    }, timeout:  resultTimeout});
            } catch (error) {
                console.log(error);
                // @ts-ignore
                Alert.alert("Ошибка", error.message);
            }
            // @ts-ignore
            return respInst.data;

        } catch(error: any) {
            console.log(error.message);
            throw new Error(error.message);
        }
    },
    async getFuncObjParam<K extends TFuncParameter[]>(funcName: string, funcParametersArr: K): Promise<TGetFuncObjParameters>  {
        //Оборачивает функцию и параметры в объект
        let username = await AsyncStorage.getItem('CUSERNAME') as string;
        return {
            data: {
                object_name:funcName,
                client_version:globalParameters.clientVersion,
                parameters:funcParametersArr,
                timezone:globalParameters.timeZone,
                username:username
            }
        }
    },
    async getFuncParamFromServer(funcName: string, srvUrl?: string): Promise<TGetFuncObjParameters> {
        let arrParam = [{"name": "cFUNC_NAME", "value": funcName, "data_type": "VARCHAR2"}];
        try {
            let respObjParam = await this.getFuncObjParam<TFuncParameter[]>("GET_FUNCTIONS_PARAMS_JSON", arrParam);
            let respServFunc = await this.callServerFunction<TGetFuncObjParameters>(respObjParam, srvUrl);
            if(respServFunc.code == "ok") {
                globalParameters.funcParameters.push(...respServFunc.data.objects);
                let currFunc = respServFunc.data.objects[0].object_name;
                let currParams = respServFunc.data.objects[0].parameters || [];
                let respFuncObjParam = await this.getFuncObjParam(currFunc, currParams);
                return respFuncObjParam;
            } else {
                return respServFunc;
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    },
    async getFuncParamFromObject(funcName: string): Promise<TGetFuncObjParameters | null> {
        try {
            if(globalParameters.funcParameters.length === 0) {
                return null;
            }
            let filteredParams = _.filter(globalParameters.funcParameters,(t:TFuncParameters) => t.object_name == funcName);
            if (filteredParams.length > 0) {
                let currFunc = filteredParams[0].object_name;
                let currParams = filteredParams[0].parameters;
                let respObjParam = await this.getFuncObjParam(currFunc, currParams);
                return respObjParam;
            } else {
                return null;
            }

        } catch(error: any) {
            throw new Error(error.message);
        }
    },
    async getFuncParamObjWithoutValues(funcName: string, srvUrl?: string): Promise<TGetFuncObjParameters>  {
        //Получает параметры для конкретной функции без значений
        try {
            //Ищем параметры в глобальном объекте параметров
            let respFuncParamObj = await this.getFuncParamFromObject(funcName);
            if(respFuncParamObj) {
                return respFuncParamObj;
            } else {
                //При отсутствии делаем запрос на сервер
                let respFromServ = await this.getFuncParamFromServer(funcName, srvUrl);
                return respFromServ;
            }
        } catch(error: any) {
            throw new Error(error.message);
        }
    },
    async addValuesIntoParamObj<T extends TGetFuncObjParameters>(objParams: T, othersParamsVals?: any ) : Promise<T> {
        if(_.isEmpty(objParams.data.parameters) && _.isEmpty(othersParamsVals)) return objParams;
        //Берем значения параметров либо из хранилища либо из clickedAppRoute
        let paramsArr = objParams.data.parameters;
        let parametersChecking: Array<boolean> = _.map(paramsArr, () => {return false});
        for(const[index, params] of paramsArr.entries()) {
            let paramName = params.name;
            let storageParam, otherParam;
            try {
                storageParam = await AsyncStorage.getItem(paramName) || null;
            } catch (error) {
                storageParam = null;
            }
            try {
                otherParam = (othersParamsVals[paramName] === 0 ? 0 : (othersParamsVals[paramName] ||  null)) ;
            } catch (error) {
                otherParam = null;
            }
            let paramValue = '' || otherParam || storageParam;
            params.value = paramValue;
            parametersChecking[index] = true;
        }
        return objParams;
    }
}


export type TStop = {
    name: string,
    id: string,
    index: number
}

export type TForecast = {
    route_name?: string,
    forecast_time_arrival?: string,
    rem_minutes?: string,
    route_description?: string,
    route_direction?: string,
    stoppoint_name?: string,
    tc_name?: string,
    distance_to_stoppoint?: string
}

export type TStopsSuccessResponse = {
    code: 'ok',
    stops: {
        [key: string]: TStop
    },
    hasMore: boolean
}

export type TForecastSuccessResponse = {
    code: 'ok',
    forecast: {
        [key: string]: TForecast
    }
}

export type TCity = {
    name: string,
    id: string,
    index: number,
    account_id: string,
    rest_url: string,
    city_info?: string
}

export type TCitiesSuccessResponse = {
    code: 'ok',
    cities: {
        [key: string]: TCity,
    },
    hasMore: boolean
}

export type TErrorResponse = {
    code: 'error'
    text: string
}

type TPostAPI = {
    getStopsJson: (accountId: string, skip: number, limit: number, searchText?: string, stopId?: string, srvUrl?: string, cityId?: string) => Promise<TStopsSuccessResponse | TErrorResponse>
    getForecastJson: (stopId: string, srvUrl?: string) => Promise<TForecastSuccessResponse | TErrorResponse>
    getCities: (skip: number, limit: number, searchText?: string, cityId?: string) => Promise<TCitiesSuccessResponse | TErrorResponse>
}

export const postAPI: TPostAPI = {
    async getStopsJson(accountId,skip, limit, searchText, stopId, srvUrl, cityId) {
        try {
            const data = {NACCOUNT_ID: accountId, NFIRST_ROWNUM: skip, NLAST_ROWNUM: limit, CFILTER: searchText, NID:stopId, NCITY_ID: cityId};
            const respParams = await paramsAPI.getFuncParamObjWithoutValues("GET_STOPS_JSON", srvUrl);
            const respParamsVal = await paramsAPI.addValuesIntoParamObj(respParams, data);
            const restData = await paramsAPI.callServerFunction(respParamsVal, srvUrl);
            return restData;
        } catch (error: any) {
            return {code:"error", text:error.message};
        }
    },
    async getForecastJson(stopId, srvUrl) {
        try {
            const data = {NSTOP_ID: stopId};
            const respParams = await paramsAPI.getFuncParamObjWithoutValues("GET_FORECAST_JSON", srvUrl);
            const respParamsVal = await paramsAPI.addValuesIntoParamObj(respParams, data);
            const restData = await paramsAPI.callServerFunction(respParamsVal, srvUrl);
            return restData;
        } catch (error: any) {
            return {code:"error", text:error.message};
        }
    },
    async getCities(skip, limit, searchText, cityId) {
        try {
            const data = {NFIRST_ROWNUM: skip, NLAST_ROWNUM: limit, CFILTER: searchText, NID:cityId};
            const respParams = await paramsAPI.getFuncParamObjWithoutValues("GET_CITIES_JSON");
            const respParamsVal = await paramsAPI.addValuesIntoParamObj(respParams, data);
            const restData = await paramsAPI.callServerFunction(respParamsVal);
            return restData;
        } catch (error: any) {
            return {code:"error", text:error.message};
        }
    }
}
