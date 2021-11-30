import React, { useState } from 'react';
import { View } from 'react-native';

import PropTypes from 'prop-types';

// * Components & Styling
import { Container } from 'native-base';

const CWrapper = (props) => {

    return (
        <Container>
           {props.children}
        </Container>
    );
};

CWrapper.propTypes = {
}

CWrapper.defaultProps = {
};

export default CWrapper;
