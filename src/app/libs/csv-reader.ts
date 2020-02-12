export async function readCSV(file: File, separator: string = ';'): Promise<Array<object>> {
    const csvContent = await readFile(file.slice());
    return csvToObject(csvContent, separator);
}

export function readFile (blob): Promise<string> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(<string> reader.result);
        reader.readAsText(blob);
    });
}

function csvToObject (csvContent: string, separator: string = ';') {
    const [columnsText, ...rowsText] = csvContent.replace(/\r/gi, '').split('\n');
    const columns = columnsText.split(separator);
    console.log(columns);
    const rows = rowsText.map((row) => row.split(separator));
    const objects = rows.map((row) => rowToObject(columns, row));
    return objects.filter(notEmpty);
}

function rowToObject (columns, row) {
    return columns.reduce((result, column, value) => ({...result, [column]: row[value]}), {});
}

function notEmpty (item: object) {
    return Object.values(item).some(Boolean);
}
