import React, {Dispatch} from 'react';
import {styles as s, styles_mode as sm} from './styles';
import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import {SearchInput, StackHeader, StopsList, StopsMap} from '../../components';
import {useStopsMode} from '../../hooks';

type TStopsModeProps = {
  mode: string;
  setMode: Dispatch<'map' | 'list'>;
};

const StopsMode = ({mode, setMode}: TStopsModeProps) => {
  return (
    <View style={sm.StopsMode_Container}>
      <TouchableWithoutFeedback onPress={() => setMode('list')}>
        <View
          style={[
            sm.StopsMode_Button,
            mode === 'list' && sm.StopsMode_ButtonActive,
          ]}>
          <Text
            style={[
              sm.StopsMode_Text,
              mode === 'list' && sm.StopsMode_TextActive,
            ]}>
            {'Список'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setMode('map')}>
        <View
          style={[
            sm.StopsMode_Button,
            mode === 'map' && sm.StopsMode_ButtonActive,
          ]}>
          <Text
            style={[
              sm.StopsMode_Text,
              mode === 'map' && sm.StopsMode_TextActive,
            ]}>
            {'Карта'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const StopsPage = () => {
  const {mode, setMode} = useStopsMode();

  return (
    <SafeAreaView style={s.StopsPage_Container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={s.StopsPage}>
          <StackHeader title={'Остановки'} />
          <SearchInput type={'stops'} />
          <StopsMode mode={mode} setMode={setMode} />
          {mode === 'list' ? <StopsList /> : <StopsMap />}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default StopsPage;
