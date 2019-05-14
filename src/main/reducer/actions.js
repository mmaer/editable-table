import { useReducer } from 'react';

import {
    ADD_COLUMN,
    REMOVE_COLUMN,
    ADD_ROW,
    REMOVE_ROW,
    SET_BODY_CELL,
    SET_HEAD_CELL,
} from './constants';

// eslint-disable-next-line import/prefer-default-export
export const useTable = (initialState, reducer) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setBodyCell = positions => newValue => dispatch({ type: SET_BODY_CELL, newValue, ...positions });

    const setHeadCell = positions => newValue => dispatch({ type: SET_HEAD_CELL, newValue, ...positions });

    const addRow = () => dispatch({ type: ADD_ROW });

    const removeRow = rowPosition => dispatch({ type: REMOVE_ROW, rowPosition });

    const addColumn = () => dispatch({ type: ADD_COLUMN });

    const removeColumn = columnPosition => dispatch({ type: REMOVE_COLUMN, columnPosition });

    return {
        state,
        setBodyCell,
        setHeadCell,
        addRow,
        removeRow,
        addColumn,
        removeColumn,
    };
};
