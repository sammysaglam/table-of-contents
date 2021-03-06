import React from 'react';
import PropTypes from 'prop-types';

export default class TableOfContents extends React.Component {
	constructor(props) {
		super(props);

		this.generateItemHTML = this.generateItemHTML.bind(this);
	}

	generateItemHTML(item) {

		const {key , label , items} = item;
		const isActive = (this.props.currentPage === key);

		return (
			<li
				key={key}
				label={label}
				className={(isActive ? 'active ' : '') + key}
				onClick={event => {
					event.stopPropagation();
					event.preventDefault();
					this.props.onItemClick(key)
				}}

			>
				<a href="#">{label}</a>
				{items ? <ul>{items.map(_item => this.generateItemHTML(_item))}</ul> : null}
			</li>
		);
	}

	render() {
		return (
			<div className="table-of-contents-root">
				{
					this.props.items.map(item => {

						const {groupLabel , items} = item;

						return groupLabel ?

							<div key={groupLabel}>
								<p className="group-label">
									{groupLabel}
								</p>
								<ul>
									{items ? items.map(_item => this.generateItemHTML(_item)) : null}
								</ul>
							</div>

							:

							this.generateItemHTML(item);
					})
				}
			</div>
		);
	}
}

TableOfContents.propTypes = {
	currentPage:PropTypes.string.isRequired ,
	onItemClick:PropTypes.func.isRequired ,
	items      :PropTypes.array.isRequired
};