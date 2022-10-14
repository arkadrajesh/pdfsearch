import React, { useState } from 'react';
import { Viewer, Worker, MinimalButton, Position, Tooltip } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { searchPlugin, NextIcon, PreviousIcon } from '@react-pdf-viewer/search';

import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import './SearchPDFKeyword.css';

import shopper from './pdf/254_page_26_Contract-Breach.pdf';

const SearchPDFKeyword = () => {
	const defaultLayoutPluginInstance = defaultLayoutPlugin();
	const searchPluginInstance = searchPlugin();
	const { highlight, jumpToNextMatch, jumpToPreviousMatch } = searchPluginInstance;

	const [ items, setItems ] = useState([
		'Contract',
		'Breach',
		'Loss',
		'Sum',
		'Damage',
		'Owe',
		'Differential',
		'Rent',
		'Cost',
		'Liability',
		'Approval',
		'Amount',
		'MOU',
		'Pay',
		'Material'
	]);
	function searchText(parameter) {
		highlight(parameter);
	}

	function prevNext() {
		return (
			<div style={{display:'flex',
            justifyContent:'center',
            alignItems:'center'
            }}>
				<div style={{ padding: '0 2px' }}>
					<Tooltip
						position={Position.BottomCenter}
						target={
							<MinimalButton onClick={jumpToPreviousMatch}>
								<PreviousIcon />
							</MinimalButton>
						}
						content={() => 'Previous match'}
						offset={{ left: 0, top: 8 }}
					/>
				</div>
				<div style={{ padding: '0 2px' }}>
					<Tooltip
						position={Position.BottomCenter}
						target={
							<MinimalButton onClick={jumpToNextMatch}>
								<NextIcon />
							</MinimalButton>
						}
						content={() => 'Next match'}
						offset={{ left: 0, top: 8 }}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className="container">
			<div className="sidebar">
				<ol>
					{items.map((el) => {
						return (
							<div key={el} className="items">
								<li onClick={() => searchText(el)} key={el} style={{cursor:'pointer'}}>
									{el}
								</li>
								<div>{prevNext()}</div>
							</div>
						);
					})}
				</ol>
			</div>
			<div className="pdf">
				<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
					<div style={{ height: '750px' }}>
						<Viewer fileUrl={shopper} plugins={[ searchPluginInstance ]} />
					</div>
				</Worker>
			</div>
		</div>
	);
};

export default SearchPDFKeyword;
