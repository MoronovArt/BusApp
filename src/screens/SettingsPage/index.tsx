import React from "react";
import {styles as s} from "./styles";
import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {StackHeader} from "../../components";
import {IconAntd} from "../../icons/AntDesign";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {useNavigation} from "@react-navigation/native";


const SettingsPage = () => {
    const navigation = useNavigation();

    const selectedCity = useSelector((state: RootState) => state.cities?.selectedCity.name);

    const onPressCityButton = () => {
        navigation && navigation.navigate("CitiesPage" as never);
    }
    return (
        <SafeAreaView style={s.SettingsPage}>
            <View style={s.SettingsPage_ViewContent}>
                <StackHeader title={"Настройки"}/>
                <View style={s.SettingsPage_Content}>
                    <Text style={s.SettingsPage_CityTitle}>Текущий город</Text>
                    <TouchableOpacity onPress={onPressCityButton}>
                        <View style={s.SettingsPage_CityButton}>
                            <Text style={s.SettingsPage_City}
                                  numberOfLines={1}
                                  ellipsizeMode={"tail"}
                            >{selectedCity}</Text>
                            <IconAntd
                                title={'right'}
                                color={s.iconStyle.color}
                                size={s.iconStyle.width}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SettingsPage;
