import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native-elements';
import { DragSource } from 'react-dnd';

const ItemTypes = {
	OPTION: 'option'
};

const optionSource = {
	beginDrag(props) {
		return {
			optionId: props.optionId
		};
	}
};

function collect(connect, monitor) {
	consol.log("option collect")
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

class Option extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired
	};

	render(){
		const connectDragSource = this.props.connectDragSource;
		return connectDragSource(
			<View 
				style={this.props.style} 
				key={this.props.option}
			>
			{ 
				this.props.option
			}
			</View>
		)
	}
}

Option.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired
}

export default DragSource(ItemTypes.OPTION, optionSource, collect)(Option);