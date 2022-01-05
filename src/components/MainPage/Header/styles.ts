import { StyleSheet } from 'react-native';
import {fontScale, scale, verticalScale} from "../../../styles/Utils";
import Colors from "../../../styles/Colors";

export const styles = StyleSheet.create({
    Header: {
        height: verticalScale(50),
        backgroundColor: Colors.PrimaryRed,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: scale(8)
    },
    Header_Text: {
        fontFamily: 'Montserrat-Bold',
        color: Colors.White,
        fontSize: fontScale(24)
    }
});
