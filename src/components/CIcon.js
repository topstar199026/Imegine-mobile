import React from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import Icon from 'src/assets/images/bottomBar/contacts1.png';

export default function CIcon(props) {
  const {style, enableRTL, ...rest} = props;
  return <Text>{'tesst'}</Text>
  // return <Icon style={StyleSheet.flatten([style])} {...rest} />;
}

CIcon.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  enableRTL: PropTypes.bool,
};

CIcon.defaultProps = {
  style: {},
  enableRTL: false,
};
