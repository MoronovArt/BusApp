import React, {useCallback} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {IconAntd} from "../../../icons";
import {styles as s} from "./styles";
import { useNavigation } from '@react-navigation/native';
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import { QrButton } from "../../../components";


const StopsSearcher = () => {

    const stopName = useSelector((state:RootState) => state.bus_stops?.selectedStop.name);

    const navigation = useNavigation();

    const onSearchPress = useCallback(() => {
        navigation && navigation.navigate('StopsPage' as never);
    }, [])

    return (
        <View style={s.StopsSearcher_Container}>
            <View style={{flex:1}}>
                <TouchableOpacity onPress={onSearchPress}>
                    <View style={s.StopsSearcher_Button}>
                        <Text style={s.StopsSearcher_Text}
                              numberOfLines={2}
                              ellipsizeMode={"tail"}
                        >{stopName || "Выберите остановку или \nпросканируйте QR код остановки"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={s.StopsSearcher_QrContainer}>
                <QrButton/>
            </View>
        </View>
    );
}

export default StopsSearcher;
