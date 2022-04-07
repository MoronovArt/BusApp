import {Alert, Linking, PermissionsAndroid, Platform, ToastAndroid} from "react-native";
import Geolocation, {GeoCoordinates} from 'react-native-geolocation-service';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";


type TUseLocation = () => [
    isLoading: boolean,
    currentPosition: GeoCoordinates | null,
    getLocation: () => Promise<void>,
    setCurrentPosition: (location: GeoCoordinates | null) => void
]

const useLocation:TUseLocation = () => {

    const [isLoading, setIsLoading] = useState(false);
    const currentPosition = useSelector((state: RootState) => state.bus_stops?.currentPosition);

    const dispatch = useDispatch();

    const hasPermissionIOS = async () => {
        const openSetting = () => {
            Linking.openSettings().catch(() => {
                Alert.alert('Не удается открыть настройки.');
            });
        };
        const status = await Geolocation.requestAuthorization('whenInUse');

        if (status === 'granted') {
            return true;
        }

        if (status === 'denied') {
            Alert.alert('Разрешение на определение местоположения отклонено.');
        }

        if (status === 'disabled') {
            Alert.alert(
                `Включите службы определения местоположения, чтобы придожение "ТрансТабло" могло определить ближайшие к вам остановки.`,
                '',
                [
                    { text: 'Перейти в настройки', onPress: openSetting },
                    { text: "Отмена", onPress: () => {} },
                ],
            );
        }

        return false;
    };

    const hasLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            const hasPermission = await hasPermissionIOS();
            return hasPermission;
        }

        if (Platform.OS === 'android' && Platform.Version < 23) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show(
                'Разрешение определения местоположения отклонено пользователем.',
                ToastAndroid.LONG,
            );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show(
                'Разрешение определения местоположения отозвано пользователем.',
                ToastAndroid.LONG,
            );
        }

        return false;
    };

    const getLocation = async () => {

        const defineLocation = () => {
            return new Promise((resolve, reject) => {
                Geolocation.getCurrentPosition(
                    (position) => {
                        setCurrentPosition(position.coords);
                        resolve("ok");
                    },
                    (error) => {
                        Alert.alert(`Код ${error.code}`, error.message);
                        setCurrentPosition(null);
                        resolve("err");
                    },
                    {
                        accuracy: {
                            android: 'high',
                            ios: 'best',
                        },
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 10000,
                        distanceFilter: 0,
                        forceRequestLocation: true,
                        forceLocationManager: false,
                        showLocationDialog: true,
                    },
                );
            })

        }

        const hasPermission = await hasLocationPermission();

        if (!hasPermission) {
            return;
        }
        setIsLoading(true);
        await defineLocation();
        setIsLoading(false);
    };

    const setCurrentPosition = (location: GeoCoordinates | null) => {
        dispatch(dispatch.bus_stops.SET_CURRENT_POSITION(location))
    }

    useEffect(() => {
        return () => {
            setCurrentPosition(null);
        }
    }, [])

    return [
        isLoading,
        currentPosition,
        getLocation,
        setCurrentPosition
    ]
}

export default useLocation;
