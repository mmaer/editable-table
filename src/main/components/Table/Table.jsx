import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ children }) => (
    <table className="table">
        {children}
    </table>
);

Table.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default Table;
