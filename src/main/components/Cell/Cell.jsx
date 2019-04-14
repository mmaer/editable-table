import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Cell = ({
    text,
    setCell,
    editable,
    button,
}) => {
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState(text);

    const handleBlur = () => {
        setCell({ value });
        setEditMode(false);
    };

    return editMode ? (
        <input
            autoFocus
            type="text"
            className="form-control"
            value={value}
            onBlur={handleBlur}
            onChange={({ target }) => setValue(target.value)}
        />
    ) : (
        <span onDoubleClick={editable ? () => setEditMode(true) : () => {}}>
            {value}
            {button}
        </span>
    );
};

Cell.defaultProps = {
    setCell: () => {},
    editable: false,
    button: undefined,
    text: '',
};

Cell.propTypes = {
    text: PropTypes.string,
    setCell: PropTypes.func,
    editable: PropTypes.bool,
    button: PropTypes.node,
};

export default Cell;
