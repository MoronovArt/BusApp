import {IconAntd} from "../../icons/AntDesign";
import {styles as s} from "./styles";
import {TouchableOpacity, View} from "react-native";
import React, {useCallback} from "react";
import {useNavigation} from "@react-navigation/native";

const QrButton = () => {

    const navigation = useNavigation();
    const navigateQR = useCallback(() => {
        navigation && navigation.navigate('QrPage' as never);
    }, []);

    return (
        <TouchableOpacity onPress={navigateQR}>
            <View style={s.IconQRContainer}>
                <IconAntd title={"qrcode"} size={s.iconQRStyle.width} color={s.iconQRStyle.color}/>
            </View>
        </TouchableOpacity>
    )
}

export default QrButton;
