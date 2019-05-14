import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TYPES = {
    TD: (isEditable, renderCell) => (
        <td onDoubleClick={isEditable}>
            {renderCell()}
        </td>
    ),
    TH: (isEditable, renderCell) => (
        <th onDoubleClick={isEditable}>
            {renderCell()}
        </th>
    ),
};

const Cell = ({
    editable,
    setCell,
    text,
    type,
    children,
    placeholder,
}) => {
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState(text);

    const handleBlur = () => {
        setCell({ value });
        setEditMode(false);
    };

    const handleOnChange = ({ target }) => {
        setValue(target.value);
    };

    const renderCell = () => (
        editMode ? (
            <input
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                type="text"
                className="form-control"
                placeholder={placeholder}
                value={value}
                onBlur={handleBlur}
                onChange={handleOnChange}
            />
        ) : (
            children
        )
    );

    const isEditable = editable ? () => setEditMode(true) : () => {};

    return type(isEditable, renderCell);
};

Cell.TYPES = TYPES;

Cell.defaultProps = {
    type: TYPES.TD,
    text: '',
    placeholder: 'Edit...',
    setCell: () => {},
    editable: false,
    children: '',  
};

Cell.propTypes = {
    type: PropTypes.func,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    setCell: PropTypes.func,
    editable: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.string,
        PropTypes.element,
    ]),
};

export default Cell;
