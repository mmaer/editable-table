import React from 'react';

import useTable from '../../hooks/useTable';
import reducer from '../../reducer';
import initialState from '../../reducer/initialState';
import { exportTableToCSV } from '../../utils/exportCSV';

import Table from '../Table';
import Thead from '../Thead';
import Tbody from '../Tbody';
import Tr from '../Tr';
import Th from '../Th';
import Td from '../Td';

const removeButton = (onClick, text) => (
    <button onClick={onClick} type="button" className="btn btn-danger">{text}</button>
);

const thComponent = props => <Th {...props} />;
const tdComponent = props => <Td {...props} />;

const generateThead = (thead, setHeadCell, removeColumn) => thead.map((text, columnPosition) => (
    thComponent({
        key: `th-${text}-${columnPosition}`,
        text,
        button: removeButton(() => removeColumn(columnPosition), 'Remove'),
        setCell: setHeadCell({ columnPosition }),
        editable: true,
    })
));

const generateTbody = (tbody, setBodyCell, removeRow) => tbody.map((rowElements, rowPosition) => (
    <Tr key={`tr-body-${rowPosition}`}>
        <Td key="th-actions" button={removeButton(() => removeRow(rowPosition), 'Remove')} />
        {rowElements.map((text, columnPosition) => (
            tdComponent({
                key: `td-${text}-${columnPosition}`,
                text,
                setCell: setBodyCell({ rowPosition, columnPosition }),
                editable: true,
            })
        ))}
    </Tr>
));

const App = () => {
    const {
        state,
        setBodyCell,
        setHeadCell,
        addRow,
        removeRow,
        addColumn,
        removeColumn,
    } = useTable(initialState, reducer);
    const { thead, tbody } = state;

    return (
        <div className="container">
            <Table>
                <Thead>
                    <Tr>
                        <Th key="th-actions" text="Actions" />
                        {generateThead(thead, setHeadCell, removeColumn)}
                    </Tr>
                </Thead>
                <Tbody>
                    {generateTbody(tbody, setBodyCell, removeRow)}
                </Tbody>
            </Table>
            <br />
            <button type="button" className="btn btn-primary" onClick={addRow}>Add Row</button>
            <button type="button" className="btn btn-primary" onClick={addColumn}>Add Column</button>
            <button type="button" className="btn btn-primary" onClick={() => exportTableToCSV(state, 'table.csv')}>
                Generate CSV
            </button>
        </div>
    );
};

export default App;
