import React from 'react';
import PropTypes from 'prop-types';

const Thead = ({ children }) => (
    <thead>
        {children}
    </thead>
);

Thead.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default Thead;
