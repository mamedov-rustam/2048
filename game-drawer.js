const cellStyleAttr = 'style="border: 1px solid black;font-size: 40px;width: 70px;height: 70px;text-align: center"';
const tableStyleAttr = 'style="border: 1px solid black; margin: 0 auto; font-family: sans-serif"';

exports.tableView = (area) => {
	var html = '<table ' + tableStyleAttr + '>';
	
	area.forEach((row) => {
		html += '<tr>';
		row.forEach((val) => {
			html += '<td ' + cellStyleAttr + '>' + (val ? val : '')  + '</td>';
		});
		html += '</tr>';
	});
	
	html += '</table>';

	return html;
};