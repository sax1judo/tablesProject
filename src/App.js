import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import ExcelTabs from './components/ExcelTabs';
import ExportExcel from './components/ExportExcel';
import Logo from './components/Logo';
import Pagination from './components/Pagination';
import Table from './components/Table';
import UploadFile from './components/UploadFile';
import { httpRequest, exportExcelHttp } from './scripts/http';
import { API } from './config';

const App = () => {
	const [baseAPIAdress, setBaseAPIAdress] = useState(API.baseAPIUrl);
	const [tableData, setTableData] = useState({
		totalRecordsNumber: null,
		properties: null,
		tableName: null,
		worksheets: null,
		activeWorksheet: null,
		records: [],
	});
	const [searchData, setSearchData] = useState({
		items: [],
		pageSize: 5,
		page: 1,
		sortField: '',
		sortOrder: null,
	});
	const paginate = pageNumber => {
		if (pageNumber === 'next') {
			setSearchData({ ...searchData, page: searchData.page + 1 });
		} else if (pageNumber === 'previous') {
			setSearchData({ ...searchData, page: searchData.page - 1 });
		} else {
			setSearchData({ ...searchData, page: pageNumber });
		}
	};
	const setPostPerPage = pageSize => {
		setSearchData({ ...searchData, pageSize: parseFloat(pageSize), page: 1 });
	};
	const setSort = data => {
		setSearchData({ ...searchData, sortField: data, sortOrder: !searchData.sortOrder });
	};
	const inputField = (id, inputValue) => {
		let item = { property: id, searchPart: inputValue, sortOrder: true };
		let itemsArray = searchData.items;

		if (itemsArray.length > 0) {
			let arraysLength = itemsArray.length;
			let flag = 0;
			for (let searchItem in itemsArray) {
				flag++;
				if (itemsArray[searchItem].property === item.property) {
					if (item.searchPart === '') {
						const index = itemsArray.indexOf(itemsArray[searchItem]);
						if (index > -1) {
							itemsArray.splice(index, 1);
						}
					} else itemsArray[searchItem].searchPart = item.searchPart;
				} else if (flag === arraysLength) {
					itemsArray.push(item);
				} else {
					// console.log(itemsArray);
				}
			}
		} else {
			itemsArray.push(item);
		}
		setSearchData({ ...searchData, items: itemsArray });
	};
	const importExcelFile = data => {
		httpRequest(API.excel, 'post', data).then(res => {
			setBaseAPIAdress(API.searchExcel);
			let excelData = { ...searchData, filePath: res };
			httpRequest(API.searchExcel, 'post', excelData).then(res => {
				setTableData(res);
				setSearchData(excelData);
			});
		});
	};
	const exportExcelFile = () => {
		exportExcelHttp(API.exportExcelWorkers, searchData).then(response => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', searchData.filePath); //or any other extension
			document.body.appendChild(link);
			link.click();
		});
	};
	const changeExcelTab = tab => {
		setSearchData({ ...searchData, activeWorksheet: tab, page: 1 });
	};git 
	useEffect(() => {
		httpRequest(baseAPIAdress, 'post', searchData).then(res => {
			setTableData(res);
		});
	}, [searchData]);

	return tableData.properties !== null ? (
		<div>
			<Logo />
			{/* <UploadFile importExcelFile={importExcelFile} /> */}
			<ExcelTabs
				worksheets={tableData.worksheets}
				activeWorksheet={tableData.activeWorksheet}
				changeExcelTab={changeExcelTab}
			/>
			<Table tableData={tableData} inputField={inputField} setSort={setSort} />
			<ExportExcel exportExcelFile={exportExcelFile} />
			<Pagination
				postsPerPage={searchData.pageSize}
				totalPosts={tableData.count}
				paginate={paginate}
				activePage={searchData.page}
				setPostsPerPage={setPostPerPage}
			/>
		</div>
	) : (
		<Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
	);
};

export default App;
