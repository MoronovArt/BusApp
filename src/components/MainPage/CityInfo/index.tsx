import React, {useCallback} from "react";
import {styles as s} from "./styles";
import {Text, TouchableOpacity, View} from "react-native";
import {IconAntd} from "../../../icons/AntDesign";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

const CityInfo = () => {
    const cityInfo = useSelector((state: RootState) => state.cities?.selectedCity.city_info);
    const navigation = useNavigation();
    const onPressSettings = useCallback(() => {
        navigation && navigation.navigate("SettingsPage" as never);
    }, []);

    return (
        <View style={s.CityInfo}>
            <Text style={s.CityInfo_Text} ellipsizeMode={"tail"} numberOfLines={3}>{cityInfo}</Text>
            <TouchableOpacity onPress={onPressSettings}>
                <View style={s.CityInfo_SettingsContainer}>
                    <IconAntd title={"setting"} size={s.iconStyle.width} color={s.iconStyle.color}/>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default CityInfo;
