import { StyleSheet } from 'react-native';
import Colors from "../../styles/Colors";
import {fontScale, moderateScale, scale, verticalScale} from "../../styles/Utils";

export const styles = StyleSheet.create({
    SearchInput_Container: {
      flexDirection: "row",
        alignItems: "center",
        marginHorizontal: scale(10),
        marginVertical: verticalScale(10),
    },
    SearchInput: {
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: scale(5),
        paddingVertical: verticalScale(0),
        borderColor: Colors.PrimaryRed,
        flex:1,
        backgroundColor: Colors.White,
        minHeight: verticalScale(45)
    },
    iconStyle: {
        color: Colors.PrimaryRed,
        width: moderateScale(24)
    },
    SearchInput_Input: {
        flex:1,
        fontFamily: 'Montserrat-Medium',
        fontSize: fontScale(16),
        color: Colors.Black
    },
    SearchInput_Text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: fontScale(16),
        color: Colors.PrimaryRed
    },
    SearchInput_QrContainer: {
        paddingLeft: scale(8),
        justifyContent: "center",
        alignItems: "center"
    }
});
