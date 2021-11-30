import { StackActions } from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export function replace(routeName, params) {
    navigationRef.current?.dispatch({
        ...StackActions.replace(routeName, params)
    })
}

export function pop(n) {
    navigationRef.current?.dispatch({
        ...StackActions.pop(n)
    })
}

export function popToTop() {
    navigationRef.current?.dispatch({
        ...StackActions.popToTop()
    })
}