import {StyleSheet} from "react-native";
import Colors from "../../../styles/Colors";
import {fontScale, scale, verticalScale} from "../../../styles/Utils";

export const styles = StyleSheet.create({
    StopsButton: {
        backgroundColor: Colors.PrimaryRed,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: verticalScale(10)
    },
    StopsButton_Container: {
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(20),
        backgroundColor: Colors.Gray
    },
    StopsButton_Text: {
        fontFamily: 'Montserrat-Bold',
        color: Colors.White,
        fontSize: fontScale(14),
    }
})
