import React from 'react';
import PropTypes from 'prop-types';

const Tbody = ({ children }) => (
    <tbody>
        {children}
    </tbody>
);

Tbody.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default Tbody;
