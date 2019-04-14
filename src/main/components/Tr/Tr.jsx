import React from 'react';
import PropTypes from 'prop-types';

const Tr = ({ children }) => (
    <tr>{children}</tr>
);

Tr.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default Tr;
