import {
    ADD_COLUMN,
    REMOVE_COLUMN,
    ADD_ROW,
    REMOVE_ROW,
    SET_BODY_CELL,
    SET_HEAD_CELL,
} from './constants';

const filterNotEqualPosition = (positions, pos1) => positions.filter((_, pos2) => pos1 !== pos2);

// eslint-disable-next-line consistent-return
const reducer = (state, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
    case ADD_COLUMN: {
        return {
            ...state,
            thead: [...state.thead, ''],
            tbody: state.tbody.map(row => [...row, '']),
        };
    }
    case REMOVE_COLUMN: {
        const { columnPosition } = action;
        return {
            ...state,
            thead: filterNotEqualPosition(state.thead, columnPosition),
            tbody: state.tbody.map(row => filterNotEqualPosition(row, columnPosition)),
        };
    }
    case ADD_ROW: {
        return {
            ...state,
            tbody: [...state.tbody, [...state.thead]],
        };
    }
    case REMOVE_ROW: {
        const { rowPosition } = action;
        return {
            ...state,
            tbody: filterNotEqualPosition(state.tbody, rowPosition),
        };
    }
    case SET_BODY_CELL: {
        const { rowPosition, columnPosition, newValue } = action;
        return {
            ...state,
            tbody: state.tbody.map((row, position) => {
                const newRow = row;
                if (position === rowPosition) {
                    newRow[columnPosition] = newValue.value;
                }
                return newRow;
            }),
        };
    }
    case SET_HEAD_CELL: {
        const { columnPosition, newValue } = action;
        const { thead } = state;
        thead[columnPosition] = newValue.value;

        return {
            ...state,
            thead,
        };
    }
    }
};

export default reducer;
