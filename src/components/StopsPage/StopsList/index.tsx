import React, {useCallback} from "react";
import {styles as s} from './styles';
import {ActivityIndicator, FlatList, RefreshControl, Text, View} from "react-native";
import {useStops} from "./useStops";
import {StopsItem} from "../../../components";

const StopsList = () => {
    const {stops, hasMore, isFetching, refreshList, getMore} = useStops();

    const Footer = useCallback(() => {
        if (!hasMore) return null;
        return <ActivityIndicator size={"large"} color={s.ActivityIndicator.color}/>;
    }, [hasMore]);

    const EmptyList = useCallback(() => {
        return (<>{!hasMore && <View style={s.EmptyComponent}>
            <Text style={s.EmptyText}>Остановочные пункты отсутствуют</Text>
        </View>}
        </>);
    }, [hasMore]);

    return (
        <FlatList
            data={stops}
            renderItem={
                ({item}) => <StopsItem
                    key={item.id}
                    id={item.id}
                    index={item.index}
                    name={item.name}
                    transport_type={item.transport_type}
                    distance={item.distance}
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
            ListFooterComponentStyle={s.FooterComponent}
            ListFooterComponent={<Footer/>}
            ListEmptyComponent={<EmptyList/>}
            onEndReached={getMore}
            initialNumToRender={10}
            onEndReachedThreshold={0.1}
            keyExtractor={item => item.id}
        />
    )
}

export default StopsList;
