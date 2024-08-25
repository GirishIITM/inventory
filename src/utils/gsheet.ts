import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const serviceAccountAuth = new JWT({
    keyFile: 'keys/gsheet.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet('1bDQF_Eg3aVMJrZ1ZYaizy08HClqUgInD_uyAc3zeJS8', serviceAccountAuth);

export async function accessSpreadsheet() {


    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);
    await doc.updateProperties({ title: 'renamed doc' });

    const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
    console.log(sheet.title);
    console.log(sheet.rowCount);

    // adding / removing sheets
    const newSheet = await doc.addSheet({ title: 'another sheet' });
}