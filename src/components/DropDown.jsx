import React from 'react';

const DropDown = props => {
	const recordsPerPage = [25, 50, 100, 200, 500];
	return (
		<div style={{ float: 'right', marginBottom: '1rem' }}>
			Show
			<select
				onChange={e => props.setPostsPerPage(e.target.value)}
				className="selectpicker page-item "
				aria-label="Default select example"
				style={{ marginRight: '2px', marginLeft: '2px', border: '1px solid #e6e2e2' }}
			>
				{recordsPerPage.map((nmb, index) => {
					return (
						<option value={nmb} key={index}>
							{nmb}
						</option>
					);
				})}
			</select>
			entries
		</div>
	);
};
export default DropDown;
