import React, {useCallback} from "react";
import {ActivityIndicator, FlatList, RefreshControl, Text, View} from "react-native";
import {styles as s} from "../../StopsPage/StopsList/styles";
import {useCities} from "./useCities";
import CitiesItem from "../CitiesItem";

const CitiesList = () => {
    const {cities, hasMore, isFetching, refreshList, getMore} = useCities();

    const Footer = useCallback(() => {
        if (!hasMore) return null;
        return <ActivityIndicator size={"large"} color={s.ActivityIndicator.color}/>;
    }, [hasMore]);

    const EmptyList = useCallback(() => {
        return (<>{!hasMore && <View style={s.EmptyComponent}>
            <Text style={s.EmptyText}>Искомый город отсутствует</Text>
        </View>}
        </>);
    }, [hasMore]);

    return (
        <FlatList
            data={cities}
            renderItem={
                ({item}) => <CitiesItem
                    key={item.id}
                    id={item.id}
                    index={item.index}
                    name={item.name}
                    account_id={item.account_id}
                    rest_url={item.rest_url}
                    city_info={item.city_info}
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

export default CitiesList;
