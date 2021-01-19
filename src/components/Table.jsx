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
		<>
			<table className="table table-dark table-bordered" style={{ marginTop: '6%' }}>
				<tbody>
					{/* table columns  */}
					<tr>
						{props.tableData.properties.map((columnTitle, index) => {
							let Title = columnTitle === 'id' ? '' : columnTitle.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ');
							return (
								<th
									key={index}
									style={
										columnTitle !== 'id'
											? { textTransform: 'uppercase', cursor: 'pointer', textAlign: 'center' }
											: { textTransform: 'uppercase', cursor: 'pointer', textAlign: 'center', pointerEvents: 'none' }
									}
									title={columnTitle}
									onClick={e => props.setSort(e.target.title)}
								>
									{Title}
									{props.sortField === columnTitle && columnTitle !== 'id' ? (
										<img
											title={columnTitle}
											onClick={e => props.setSort(e.target.title)}
											style={
												props.sortOrder
													? { width: '25px', height: '25px', float: 'right' }
													: { width: '25px', height: '25px', float: 'right', transform: 'rotate(180deg)' }
											}
											src={sortAscIcon}
										></img>
									) : columnTitle !== 'id' ? (
										<img
											title={columnTitle}
											onClick={e => props.setSort(e.target.title)}
											style={{ width: '25px', height: '25px', float: 'right' }}
											src={sortIcon}
										></img>
									) : null}
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
							let flag;
							if (record === 'id') flag = true;
							else flag = false;
							return (
								<th key={index} style={{ textAlign: 'center' }}>
									{flag ? null : (
										<input
											title={record}
											type="text"
											id={record}
											onChange={e => props.inputField(e.target.title, e.target.value)}
											placeholder={'Search' + ' ' + record}
										></input>
									)}
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
									{Object.keys(record).map(key =>
										key === 'id' ? (
											<td>
												<div
													className="userImage"
													style={{
														backgroundImage: `url(../assets/workers/${record[key]}.jpg)`,
														margin: 'auto',
													}}
												></div>
											</td>
										) : (
											<td style={{ alignItems: 'center', textAlign: 'center', verticalAlign: 'middle' }} key={key}>
												{record[key] === null ? '-' : record[key]}
											</td>
										),
									)}
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
