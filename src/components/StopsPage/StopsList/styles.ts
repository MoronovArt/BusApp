import {StyleSheet} from "react-native";
import {fontScale, scale, verticalScale} from "../../../styles/Utils";
import Colors from "../../../styles/Colors";

export const styles = StyleSheet.create({
    FooterComponent: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(10)
    },
    ActivityIndicator: {
        color: Colors.PrimaryRed
    },
    EmptyComponent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    EmptyText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: fontScale(14),
        color: Colors.Black
    }
});
