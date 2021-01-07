import React, { useEffect, useState } from 'react';
import PopUpForm from './PopUpForm';
import '../style/Table.scss';

const Table = props => {
	const [popUpData, setPopUpData] = useState([]);

	const openPopUp = record => {
		setPopUpData(record);
	};
	const closePopUpData = () => {
		setPopUpData([]);
	};
	return (
		<>
			<table className="table table-dark table-bordered">
				<tbody>
					{/* table columns  */}
					<tr>
						{props.tableData.properties.map((columnTitle, index) => {
							let Title = columnTitle.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ');
							return (
								<th
									key={index}
									style={{ textTransform: 'uppercase', cursor: 'pointer', textAlign: 'center' }}
									title={columnTitle}
									onClick={e => props.setSort(e.target.title)}
								>
									{Title}
								</th>
							);
						})}
						{/* <th>
							<p>Action</p>
						</th> */}
					</tr>
					{/* table columns  */}

					{/* search fields */}
					<tr>
						{props.tableData.properties.map((record, index) => {
							return (
								<th key={index} style={{ textAlign: 'center' }}>
									<input
										title={record}
										type="text"
										id={record}
										onChange={e => props.inputField(e.target.title, e.target.value)}
									></input>
								</th>
							);
						})}
						{/* <th></th> */}
					</tr>
					{/* search fields */}

					{/* table data */}

					{props.tableData.records.length === 0
						? null
						: props.tableData.records.map((record, index) => (
								<tr key={index}>
									{Object.keys(record).map(key => (
										<td style={{ alignItems: 'center', textAlign: 'center', verticalAlign: 'middle' }} key={key}>
											{record[key] === null ? '-' : record[key]}
										</td>
									))}
									{/* <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
								<button className="btn btn-primary" onClick={() => openPopUp(record)}>
									EDIT
								</button>
								<button className="btn btn-danger">DELETE</button>
							</td> */}
								</tr>
						  ))}
					{/* table data */}
				</tbody>
			</table>
			{popUpData.length === 0 ? null : <PopUpForm data={popUpData} closePopUpData={closePopUpData} />}
		</>
	);
};
export default Table;
