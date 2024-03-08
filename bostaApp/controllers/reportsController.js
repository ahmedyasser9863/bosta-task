const BorrowingsModel = require('../models/borrowings');
const ExcelJS = require('exceljs');


async function exportToExcel(data,fileName,res) {
	try {
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Data');

		const headers = Object.keys(data[0]);
		worksheet.addRow(headers);

		data.forEach(row => {
			const rowData = Object.values(row);
			worksheet.addRow(rowData);
		});
		res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; ${fileName}=export.xlsx`);

		await workbook.xlsx.write(res);
		console.log('Excel file created successfully.');
	} catch (error) {
		console.error('Error exporting to Excel:', error);
	}
}

module.exports = {
  


  async getLateBorrowings(req, res) {
	try {
	  const lateBorrowings = await BorrowingsModel.getLateBorroweringsWithDates(req.body);
	  await exportToExcel(lateBorrowings,'LateBorrowings',res);
	} catch (error) {
	  console.error('Error getting late borrowings:', error);
	  res.status(500).send('Error getting late borrowings');
	}
  },

  async getAllBorrowings(req, res) {
	try {
	  const allBorrowings = await BorrowingsModel.getAllBorroweringsWithDates(req.body);
	  await exportToExcel(allBorrowings,'Borrowings',res);
	} catch (error) {
	  console.error('Error getting late borrowings:', error);
	  res.status(500).send('Error getting late borrowings');
	}
  },
  


};
