import React, { useEffect, useState } from 'react';
import DropDown from './DropDown';
const Pagination = ({ postsPerPage, totalPosts, paginate, activePage, setPostsPerPage }) => {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav>
			<ul className="pagination">
				<DropDown postsPerPage={postsPerPage} setPostsPerPage={setPostsPerPage} />
				<li className={activePage !== 1 ? 'page-item ' : 'page-item disabled'}>
					<span className="page-link" onClick={() => paginate('previous')}>
						Previous
					</span>
				</li>
				{pageNumbers.map(number => (
					<li key={number} className={activePage !== number ? 'page-item' : 'page-item active'}>
						<a onClick={() => paginate(number)} className="page-link">
							{number}
						</a>
					</li>
				))}
				<li className={activePage !== pageNumbers.length ? 'page-item ' : 'page-item disabled'}>
					<a className="page-link" onClick={() => paginate('next')}>
						Next
					</a>
				</li>
			</ul>
		</nav>
	);
};
export default Pagination;
