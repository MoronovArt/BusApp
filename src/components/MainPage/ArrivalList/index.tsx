import React, {useCallback} from "react";
import { styles as s} from './styles';
import {ActivityIndicator, FlatList, RefreshControl, Text, View} from "react-native";
import { ArrivalItem } from "../../../components";
import useForecast from "./useForecast";

const ArrivalList = () => {

    const {forecast, stopId, isFetching, refreshList, } = useForecast();

    const EmptyList = useCallback(() => {
        return (
            <View style={s.EmptyComponent}>
                <Text style={s.EmptyText}>{
                    stopId && forecast.length === 0 ?
                        "Прогноз по выбранной остановке отсутствует" :
                        ""}
                </Text>
            </View>
        );
    }, [forecast.length, stopId]);

    return (
        <FlatList
            data={forecast}
                  refreshing={true}
            renderItem={
                ({item}) => <ArrivalItem
                    distance_to_stoppoint={item.distance_to_stoppoint}
                    rem_minutes={item.rem_minutes}
                    forecast_time_arrival={item.forecast_time_arrival}
                    route_name={item.route_name}
                    stoppoint_name={item.stoppoint_name}
                    route_description={item.route_description}
                />
            }
            refreshControl={
                <RefreshControl
                    refreshing={isFetching}
                    onRefresh={refreshList}
                    progressViewOffset={5}
                    tintColor={s.ActivityIndicator.color}
                />
            }
            ListEmptyComponent={<EmptyList/>}
            ListFooterComponentStyle={s.FooterComponent}
            contentContainerStyle={s.ListContainer}
        />
    )
}

export default ArrivalList;
