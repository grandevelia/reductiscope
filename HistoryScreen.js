import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Defs, Rect, ClipPath, LinearGradient, Stop } from 'react-native-svg';
import HistoryStyles from './styles/HistoryStyles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { VictoryAxis, VictoryArea, VictoryChart, VictoryZoomContainer } from "victory-native";
import moment from 'moment';
import { lossModeLevel, weightFromKg} from './utilities';


export default class HistoryScreen extends Component {
    constructor(props) {
        super(props);

        let weights = props.weights;
        let maxLevel = 0;
        let dates = props.dates;
        let data = weights.map((weight, i) => {
            let over = false;
            let level = lossModeLevel(props.user.initial_weight_kg, props.user.ideal_weight_kg, weight);
            if (level > maxLevel){
                maxLevel = level;
            }
            if (level < maxLevel){
                over = true;
            }
            return {
                x: moment(dates[i]),
                y: weightFromKg(weight, props.user.weight_units),
                over: over
            }
        })

        this.entireDomain = this.getEntireDomain();
        this.state = {
            data: data,
            zoomDomain: this.entireDomain
        }
    }
    getEntireDomain() {
        return {
            y: [weightFromKg(
                    0.9 * Math.min(...this.props.weights, this.props.idealWeight), 
                    this.props.user.weight_units), 
                weightFromKg(Math.max(...this.props.weights), 
                    this.props.user.weight_units
                )],
            x: [moment(this.props.dates[0]), moment(this.props.dates[this.props.dates.length - 1])]
        };
    }
    //Keep track of the boundaries where entire data currently visible
    handleZoom(domain) {
        this.setState({
            zoomDomain: domain
        });
    }
    //Return currently visible data
    getData() {
        const { zoomDomain } = this.state;
        const { data } = this.state;
        console.log(zoomDomain)
        return data.filter(
            // is d "between" the ends of the visible x-domain?
            (d) => (d.x.isSameOrAfter(zoomDomain.x[0])&& d.x.isSameOrBefore(zoomDomain.x[1])));
    }
    render() {
        let events = [{
            target: "data",
            eventHandlers: {
            onClick: () => {
                return [{
                target: "labels",
                mutation: (props) => {
                    return props.text === "clicked" ?
                    null : { text: "clicked" }
                }
                }];
            }
            }
        }];
        let data = this.getData();
        let idealWeight = this.props.idealWeight;

        let below = JSON.parse(JSON.stringify(data)).filter((x, i) => {
            if (!x.over){
                x.index = i;
                return true;
            } 
            return false;
        });
        let over = JSON.parse(JSON.stringify(data)).filter((x, i) => {
            if (x.over){
                x.index = i;
                return true;
            } 
            return false;
        });
        
        let target = JSON.parse(JSON.stringify(data)).filter((x, i) => {
            if (x.y <= idealWeight){
                x.index = i;
                return true;
            } 
            return false;
        });
        return (
            <VictoryChart 
                width={Dimensions.get("window").width} 
                padding={{ left: 10, top: 0, bottom: 0, right: 50 }}
                domain={this.entireDomain}
                scale={{x: "time"}}
                containerComponent={
                    <VictoryZoomContainer
                        responsive={false}
                        onZoomDomainChange={this.handleZoom.bind(this)}
                        zoomDimension="x"
                        zoomDomain={this.state.zoomDomain}
                        minimumZoom={{x: 1000000000}}
                    />
                }
            >
                {below.length > 0 ?
                <VictoryArea 
                    data={this.state.data}
                    id={'line-1'}
                    style={{
                        data: {
                            stroke: 'rgb(35, 182, 255)',
                            fill: 'rgb(35, 182, 255)',
                            strokeWidth: 2,                
                            clipPath: 'url(#clip-path-1)',
                        }
                    }}
                    events={events}
                /> : null }
                {over.length > 0 ?
                <VictoryArea 
                    data={this.state.data}
                    id={'line-2'}
                    style={{
                        data: {
                            stroke: 'rgb(245, 61, 0)',
                            fill: 'rgb(245, 61, 0)',
                            strokeWidth: 2,                
                            clipPath: 'url(#clip-path-2)',
                        }
                    }}
                    events={events}
                />: null }
                {target.length > 0 ?
                <VictoryArea 
                    data={this.state.data}
                    id={'line-3'}
                    style={{
                        data: {
                            stroke: 'rgb(245, 161, 0)',
                            fill: 'rgb(245, 161, 0)',
                            strokeWidth: 2,                
                            clipPath: 'url(#clip-path-3)',
                        }
                    }}
                    events={events}
                /> : null }
                <CustomClip 
                    over={over}
                    below={below}
                    target={target}
                />
                <VictoryAxis
                    scale="time"
                    domain={[Math.min(...data), Math.max(...data)]}
                />
                <VictoryAxis 
                    dependentAxis
                    domain={[Math.min(...data), Math.max(...data)]}
                    offsetX={50}
                    orientation={"right"}
                />
            </VictoryChart>
        )
    }
}

class CustomClip extends Component {
    constructor(props){
        super(props)

    }
    render(){
        let below = this.props.below;
        let over = this.props.over;
        let target = this.props.target;
        let dataLen = below.length + over.length + target.length;
        let barWidth = (Dimensions.get("window").width)/(dataLen/1.1);
        console.log(over)
        return (
            <Defs key={'clips'}>
            {below.length > 0 ?
                <ClipPath id="clip-path-1">
                {
                    below.map((x, i) => {
                        return(
                            <Rect key={i} x={`${x.x}`} y={0} width={`${0.9 * barWidth}`} height={'100%'}/>
                        )
                    })
                    
                }
                </ClipPath> : null}
                {over.length > 0 ?
                <ClipPath id={'clip-path-2'}>
                {
                    over.map((x, i) => {
                        return(
                            <Rect key={i} x={`${x.index * barWidth}`} y={0} width={`${0.9 * barWidth}`} height={'100%'} />
                        )
                    })
                }
                </ClipPath> : null}
                {target.length > 0 ?
                <ClipPath id={'clip-path-3'}>
                {
                    target.map((x, i) => {
                        return(
                            <Rect key={i} x={`${x.index * barWidth}`} y={0} width={`${0.9 * barWidth}`} height={'100%'} />
                        )
                    })
                }
                </ClipPath> : null}
            </Defs>
        )
    }
}   