import React from 'react';
import PropTypes from 'prop-types';

const TYPES = {
    PRIMARY: 'PRIMARY',
    DANGER: 'DANGER',
};

const STYLES = {
    [TYPES.PRIMARY]: 'btn btn-outline-primary',
    [TYPES.DANGER]: 'btn btn-danger',
};

const Button = ({ onClick, children, type }) => (
    <button
        onClick={onClick}
        type="button"
        className={STYLES[type]}
    >
        {children}
    </button>
);

Button.TYPES = TYPES;

Button.defaultProps = {
    type: STYLES[TYPES.PRIMARY],
};

Button.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.string,
    ]).isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string,
};


export default Button;
