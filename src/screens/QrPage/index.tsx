import React, {useEffect, useMemo, useState} from "react";
import {Text, StyleSheet, View, ActivityIndicator, Dimensions, LayoutChangeEvent} from "react-native";
import {styles as s} from "./styles";
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat, Point, Barcode} from 'vision-camera-code-scanner';
import {StackHeader} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../store";
import {useNavigation} from "@react-navigation/native";
import Colors from "../../styles/Colors";


const QrPage = () => {
    const dispatch = useDispatch<Dispatch>();
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = React.useState(false);
    const devices = useCameraDevices();
    const device = devices.back;
    const [cityUid, setCityUid] = useState("");
    const [stopUid, setStopUid] = useState("");


    const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE]);

    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'authorized');
        })();
    }, []);


    useEffect(() => {
        if(barcodes.length === 1 && barcodes[0]?.displayValue) {

            const [url, params] = barcodes[0]?.displayValue.split("::::");
            const [items, values] = params.split(":");
            const itemsArray = items.split(",");
            const valuesArray = values.split(",");
            const [appleId, googleId, cityId, stopId] = valuesArray;
            // @ts-ignore
            dispatch.bus_stops.setQrData({stopId, cityId});
            navigation && navigation.navigate("MainPage" as never);
        }
    }, [barcodes.length]);

    return (
        <View style={s.QrPage}>
            {device != null &&
            hasPermission ? (
                <>
                    <Camera
                        style={StyleSheet.absoluteFill}
                        device={device}
                        isActive={true}
                        frameProcessor={frameProcessor}
                        frameProcessorFps={5}
                    />
                    <StackHeader title={"QR"}/>
                </>
            ): <View style={s.QrLoader}>
                <ActivityIndicator size="large" color={Colors.PrimaryRed} />
            </View>}
        </View>
    );
}



export default QrPage;
