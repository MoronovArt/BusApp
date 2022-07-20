import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {styles as s} from './styles';
import YaMap, {CameraPosition, Marker, VisibleRegion} from 'react-native-yamap';
import {useLocation, useStops} from '../../../hooks';
import {TStop} from '../../../api/Api';
import {useDispatch} from 'react-redux';
import {Dispatch} from '../../../store';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {IconAntd} from '../../../icons';

const StopsMap = () => {
  const ref = useRef<YaMap>(null);
  const {stops} = useStops();
  const dispatch = useDispatch<Dispatch>();
  const navigation = useNavigation();
  const [mapVisible, setMapVisible] = useState(false);
  const [isLoading, location, getLocation, setCurrentPosition] = useLocation();

  const onPressPin = () => {
    if (location) {
      setCurrentPosition(null);
    } else {
      if (typeof getLocation === 'function') {
        getLocation();
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        setMapVisible(true);
      }, 1000);
      return () => {
        setMapVisible(false);
      };
    }, []),
  );

  useEffect(() => {
    const map_ref = ref.current;
    if (map_ref && stops.length > 0) {
      map_ref.fitAllMarkers();
    }
  }, [mapVisible, stops.length]);

  const onMarkerPress = (stop: TStop) => {
    const {id, name, transport_type} = stop;
    dispatch.bus_stops.SET_SELECTED_STOP({id, name, transport_type});
    navigation && navigation.navigate('MainPage' as never);
  };

  const getCurrentPosition = () => {
    return new Promise<CameraPosition>(resolve => {
      if (ref.current) {
        ref.current.getCameraPosition((position: any) => {
          resolve(position);
        });
      }
    });
  };

  const getVisibleRegion = () => {
    return new Promise(resolve => {
      if (ref.current) {
        ref.current.getVisibleRegion((visibleRegion: VisibleRegion) => {
          console.log(visibleRegion);
          resolve(visibleRegion);
        });
      }
    });
  };

  const zoomUp = async () => {
    const position = await getCurrentPosition();
    if (ref.current) {
      ref.current.setZoom(position.zoom * 1.1, 0.1);
    }
  };

  const zoomDown = async () => {
    const position = await getCurrentPosition();
    if (ref.current) {
      ref.current.setZoom(position.zoom * 0.9, 0.1);
    }
  };

  const getMarkerSource = (type: string) => {
    switch (type) {
      case 'АВТОБУС':
        return require('./../../../assets/bus_stop.png');
      case 'ТРОЛЛЕЙБУС':
        return require('./../../../assets/troll_stop.png');
      case 'ТРАМВАЙ':
        return require('./../../../assets/tram_stop.png');
      default: {
        return require('./../../../assets/bus_stop.png');
      }
    }
  };

  return (
    <View style={s.StopsMap_Container}>
      {mapVisible && (
        <YaMap
          //removeClippedSubviews={true}
          onCameraPositionChange={() => getVisibleRegion()}
          style={{...StyleSheet.absoluteFillObject}}
          ref={ref}
          //withClusters
          showUserPosition>
          {stops.map((stop, index) => (
            <Marker
              key={stop.id}
              visible={index <= 35 ? true : false}
              anchor={{x: 0.5, y: 1}}
              point={{
                lat: Number(stop.stop_latitude),
                lon: Number(stop.stop_longitude),
              }}
              //source={getMarkerSource(stop.transport_type)}
              scale={2}
              onPress={() => onMarkerPress(stop)}
            />
          ))}
        </YaMap>
      )}
      <View style={s.StopMap_ButtonsContainer}>
        <TouchableOpacity onPress={onPressPin} style={s.StopsMap_ButtonWrapper}>
          <View style={s.StopsMap_Button}>
            {isLoading ? (
              <ActivityIndicator
                size={24}
                color={s.StopMap_ActivityIndicator.color}
              />
            ) : (
              <IconAntd
                title={location ? 'enviroment' : 'enviromento'}
                size={s.StopsMap_IconStyle.width}
                color={s.StopsMap_IconStyle.color}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={zoomUp} style={s.StopsMap_ButtonWrapper}>
          <View style={s.StopsMap_Button}>
            <IconAntd
              title={'plus'}
              size={s.StopsMap_IconStyle.width}
              color={s.StopsMap_IconStyle.color}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={zoomDown} style={s.StopsMap_ButtonWrapper}>
          <View style={s.StopsMap_Button}>
            <IconAntd
              title={'minus'}
              size={s.StopsMap_IconStyle.width}
              color={s.StopsMap_IconStyle.color}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StopsMap;
