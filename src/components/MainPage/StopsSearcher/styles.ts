import { StyleSheet } from 'react-native';
import {fontScale, moderateScale, scale, verticalScale} from "../../../styles/Utils";
import Colors from "../../../styles/Colors";

export const styles = StyleSheet.create({
    iconStyle: {
        color: Colors.PrimaryRed,
        width: moderateScale(24)
    },
    StopsSearcher_Button: {
        backgroundColor: Colors.White,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: scale(5),
        paddingVertical: verticalScale(10),
        borderColor: Colors.PrimaryRed,
        borderWidth: 1,
        minHeight: moderateScale(50)
    },
    StopsSearcher_Text: {
        flex:1,
        paddingHorizontal: scale(4),
        fontFamily: 'Montserrat-Medium',
        color: Colors.Black,
        fontSize: fontScale(12)
    },
    StopsSearcher_Container: {
        marginHorizontal: scale(10),
        marginVertical: verticalScale(10),
        flexDirection: "row",
    },
    StopsSearcher_QrContainer: {
        paddingLeft: scale(8),
        justifyContent: "center",
        alignItems: "center"
    },
});
