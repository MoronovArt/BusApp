import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {IconAntd} from "../../../icons";
import {styles as s} from "./styles";


const StopsSearcher = () => {

    const onSearchPress = () => {

    }

    return (
        <View style={s.StopsSearcher_Container}>
            <Text style={s.StopsSearcher_Label}>Выберите остановочный пункт</Text>
            <TouchableOpacity onPress={onSearchPress}>
                <View style={s.StopsSearcher_Button}>
                    <IconAntd
                        title={'search1'}
                        color={s.iconStyle.color}
                        size={s.iconStyle.width}
                    />
                    <Text style={s.StopsSearcher_Text}
                          numberOfLines={1}
                          ellipsizeMode={"tail"}
                    >"Заводоуправление УАЗ - станция УАЗ"</Text>
                    <IconAntd
                        title={'right'}
                        color={s.iconStyle.color}
                        size={s.iconStyle.width}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default StopsSearcher;
