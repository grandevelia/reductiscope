import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DndStyles from './styles/DndStyles';

class InteractionArea extends Component {
    constructor(props){
        super(props);
        this.state = {
            moving: null,
            options: props.options,
            choices: props.choices
        }
    }
    moveOption(optionId){
		let choices = this.state.choices;
        
		//Check if the press option has been ranked.
        let choiceIndex = choices.indexOf(optionId);
		
		if (choiceIndex >= 0){
            if (this.state.moving === null){
                //No selection in process,
                //Select pressed choice for moving
                this.setState({moving: optionId});

            } else if (optionId === this.state.moving){
                //Re-clicking option selected for moving
                //Unselect it
                this.setState({moving: null});

            } else {
                //Moving state set and press index also set and different than moving
                //Switch moving and pressed choice
                let movingIndex = choices.indexOf(this.state.moving);
                choices[choiceIndex] = this.state.moving;
                choices[movingIndex] = optionId;
                this.setState({moving: null});
                this.props.update(choices);
            }
		} else {
            //pressed option not already selected
            
            if (this.state.moving === null){
                //Pressing completely unselected option
                //Put it in the lowest unranked index
                choices[choices.indexOf(null)] = optionId;
            } else {
                //Pressed option previously unselected
                //Put moving at the end, and pressed option where moving was
                let movingIndex = choices.indexOf(this.state.moving);
                let emptyIndex = choices.indexOf(null);
                choices[movingIndex] = optionId
                choices[emptyIndex] = this.state.moving;
            }
            //remove optionId from options
            this.state.options.splice(this.state.options.indexOf(optionId), 1);
            this.setState({moving: null});
            this.props.update(choices);
        }
    }
	render(){
		return (
			<View style={{...DndStyles.interactionArea, ...this.props.containerStyle}}>
            {
                this.state.choices.concat(this.state.options).map((option, i) => {
                    if (option === null){
                        return null
                    }

                    let style = {...DndStyles.unselectedOption, ...DndStyles.option};
                    let itemStyle = {...DndStyles.unselectedOptionText}

                    if (this.state.choices[i] !== null && this.state.choices[i] !== undefined){
                        style = {...style, ...DndStyles.selectedOption};
                        itemStyle = {...DndStyles.selectedOptionText}
                    }

                    if (this.state.moving !== null && this.state.choices.indexOf(this.state.moving) === i){
                        style = {...style, ...DndStyles.toMove};
                    }

                    return (
                        <TouchableOpacity
                            style={{...DndStyles.basicItemContainer, ...style}}
                            onPress={() => this.moveOption(option)}
                            key={i}
                        >
                            <Text style={{...DndStyles.basicItem, ...itemStyle, ...this.props.itemStyle}} key={i}>
                            {
                                this.props.labels[option]
                            }
                            </Text>
                        </TouchableOpacity>
                    );
                })
            }
			</View>
		)
	}
}

export default InteractionArea;