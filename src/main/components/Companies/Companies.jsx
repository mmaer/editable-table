/* eslint-disable react/no-array-index-key */
import React from 'react';

import { useTable } from '../../reducer/actions';
import reducer from '../../reducer';
import initialState from '../../reducer/initialState';
import { exportTableToCSV } from '../../utils/exportCSV';

import Table from '../Table';
import Thead from '../Thead';
import Tbody from '../Tbody';
import Cell from '../Cell';
import Tr from '../Tr';

import Button from '../Button';

const generateThead = (thead, setHeadCell, removeColumn) => thead.map((text, columnPosition) => (
    <Cell
        key={`th-${text}-${columnPosition}`}
        setCell={setHeadCell({ columnPosition })}
        type={Cell.TYPES.TH}
        text={text}
        editable
    >
        {text}
        <Button onClick={() => removeColumn(columnPosition)} type={Button.TYPES.DANGER}>
            Remove
        </Button>
    </Cell>
));

const generateTbody = (tbody, setBodyCell, removeRow) => tbody.map((rowElements, rowPosition) => (
    <Tr key={`tr-body-${rowPosition}`}>
        <Cell key="th-actions" type={Cell.TYPES.TD}>
            <Button onClick={() => removeRow(rowPosition)} type={Button.TYPES.DANGER}>Remove</Button>
        </Cell>
        {rowElements.map((text, columnPosition) => (
            <Cell
                key={`th-${text}-${columnPosition}`}
                setCell={setBodyCell({ rowPosition, columnPosition })}
                type={Cell.TYPES.TD}
                text={text}
                editable
            >
                {text}
            </Cell>
        ))}
    </Tr>
));

const Companies = () => {
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
                        <Cell key="th-actions" type={Cell.TYPES.TH} text="Actions" />
                        {generateThead(thead, setHeadCell, removeColumn)}
                    </Tr>
                </Thead>
                <Tbody>
                    {generateTbody(tbody, setBodyCell, removeRow)}
                </Tbody>
            </Table>
            <br />
            <Button onClick={addRow} type={Button.TYPES.PRIMARY}>
                Add Row
            </Button>
            <Button onClick={addColumn} type={Button.TYPES.PRIMARY}>
                Add Column
            </Button>
            <Button onClick={() => exportTableToCSV(state, 'table.csv')} type={Button.TYPES.PRIMARY}>
                Generate CSV
            </Button>
        </div>
    );
};

export default Companies;
