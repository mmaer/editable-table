const downloadCSV = (csv, filename) => {
    const csvFile = new Blob([csv], { type: 'text/csv' });
    const downloadLink = document.createElement('a');

    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.click();
};

// eslint-disable-next-line import/prefer-default-export
export const exportTableToCSV = (table, filename) => {
    const { tbody, thead } = table;
    const csv = [
        thead.join(','),
        ...tbody.map(row => row.join(',')),
    ].join('\n');

    downloadCSV(csv, filename);
};
