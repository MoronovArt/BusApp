import {useNavigation} from "@react-navigation/native";
import {Text, TouchableOpacity, View} from "react-native";
import {styles as s} from "./styles";
import {IconAntd} from "../../icons/AntDesign";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

interface TStackHeaderProps {
    title: string
}

const StackHeader = ({title}: TStackHeaderProps) => {

    const navigation = useNavigation();
    const city = useSelector((state: RootState) => state.cities?.selectedCity.name);


    return (
        <View style={[s.BusStopsTitle, title === "QR" ? {backgroundColor: "transparent"}: {}]}>
            <TouchableOpacity onPress={navigation.goBack}>
                <View style={s.BusStopsTitle_IconContainer}>
                    <IconAntd title={'left'} size={s.iconStyle.width} color={s.iconStyle.color}/>
                </View>
            </TouchableOpacity>
            {title !== "QR" && <View style={s.BusStopsTitle_TextContainer}>
                {title === "Остановки" && <Text style={s.BusStopsTitle_CityText} numberOfLines={1} ellipsizeMode={"tail"}>{`Город ${city}`}</Text>}
                <Text style={s.BusStopsTitle_Text} numberOfLines={1} ellipsizeMode={"tail"}>{title}</Text>
            </View>}
        </View>
    )
}

export default StackHeader;
