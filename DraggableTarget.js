import React, { Component } from 'react';
import { View } from 'react-native-elements';
import { DropTarget } from 'react-dnd';
import DndStyles from './styles/DndStyles';
import PropTypes from 'prop-types';

const ItemTypes = {
	OPTION: 'option'
};

const optionTarget = {
  drop(props, monitor) {
    props.moveOption(monitor.getItem().optionId, props.id);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class DraggableTarget extends Component {
  render() {
    const connectDropTarget = this.props.connectDropTarget;
    const isOver = this.props.isOver;
    let style = {...DndStyles.selectionNumber, ...this.props.style};
    if (isOver){
        style = {...style, ...DndStyles.targetHoverChild};
    }
    return connectDropTarget(
        <View style={style}>
        {
            this.props.children
        }
        </View>
    );
  }
}

DraggableTarget.propTypes = {
  id: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired
}

export default DropTarget(ItemTypes.OPTION, optionTarget, collect)(DraggableTarget);