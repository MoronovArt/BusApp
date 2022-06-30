import {IconAntd} from '../../icons';
import {styles as s} from './styles';
import React from 'react';
import {TouchableOpacity} from 'react-native';

type TPinBlock = {
  onPress: () => void;
  active: boolean;
};

const PinBlock = ({onPress, active}: TPinBlock) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <IconAntd
        title={active ? 'enviroment' : 'enviromento'}
        size={s.iconStyle.width}
        color={s.iconStyle.color}
      />
    </TouchableOpacity>
  );
};

export default PinBlock;
