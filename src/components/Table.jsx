import React, { useEffect, useState } from 'react';
import PopUpForm from './PopUpForm';
import '../style/Table.scss';
import sortIcon from '../assets/sortIcon.png';
import sortAscIcon from '../assets/sortIconAsc.png';

const Table = props => {
	const [popUpData, setPopUpData] = useState([]);

	const openPopUp = record => {
		setPopUpData(record);
	};
	const closePopUpData = () => {
		setPopUpData([]);
	};
	return (
		<div className="tableWrapper">
			<table className="table table-dark table-bordered" style={{ fontSize: '14px' }}>
				<tbody>
					{/* table columns  */}
					<tr>
						{props.tableData.properties.map((columnTitle, index) => {
							let Title = columnTitle.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ');
							return (
								<th
									key={index}
									style={{ textTransform: 'uppercase', cursor: 'pointer', textAlign: 'center', position: 'relative' }}
									title={columnTitle}
									onClick={e => props.setSort(e.target.title)}
								>
									{Title}
									{props.sortField === columnTitle ? (
										<img
											title={columnTitle}
											onClick={e => props.setSort(e.target.title)}
											style={
												props.sortOrder
													? { width: '15px', height: '15px', position: 'absolute', right: '2%' }
													: {
															width: '15px',
															height: '15px',
															position: 'absolute',
															right: '2%',
															transform: 'rotate(180deg)',
													  }
											}
											src={sortAscIcon}
										></img>
									) : (
										<img
											title={columnTitle}
											onClick={e => props.setSort(e.target.title)}
											style={{ width: '15px', height: '15px', position: 'absolute', right: '2%' }}
											src={sortIcon}
										></img>
									)}
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
										placeholder={'search' + ' ' + record}
									></input>
								</th>
							);
						})}
						{/* <th></th> */}
					</tr>
					{/* search fields */}

					{/* table data */}

					{props.tableData.items.length === 0
						? null
						: props.tableData.items.map((record, index) => (
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
		</div>
	);
};
export default Table;
