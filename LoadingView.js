import React, { Component } from 'react';
import { View } from 'react-native';
import { Dimensions } from 'react-native';

export default class LoadingView extends Component {
	constructor() {
		super();
    }
	render() {
		return (
			<View
				style={{
					width: "100%",
					height: "100%",
					alignItems: "center",
					justifyContent: "center",
					position: "absolute",
					backgroundColor: "rgba(255,255,255,0.6)",
					zIndex: 999
				}}
			>
			{ 
                Array(9).fill().map((a, i) => {
                    return (
                        <GrowBar 
                            index={i} 
                            width={0.15 * Dimensions.get("window").width} 
                            key={i}
                        />
                    )
                }) 
            }
			</View>
		)
	}
}
class GrowBar extends Component{
	
	render(){
		let red = "" + 255 * this.props.index/9;
		let green = "" + 89;
		let blue = "" + 255/(this.props.index+1);
        let bgc = "rgb(" + red + "," + green + "," +  blue + ")";
		return(
			<View
				style={{
					height: 5,
					backgroundColor: bgc,
					width: this.props.width,
					borderRadius: 15,
					marginBottom: 2
				}} 
			/>
		)
	}
}