import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Linking } from 'expo';
import * as SMS from 'expo-sms';
import ReferStyles from './styles/ReferStyles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Dimensions } from 'react-native';
let minDim = Math.min(Dimensions.get("window").height, Dimensions.get("window").width)

export default class ReferScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            friendCode: null
        }
    }
    componentDidUpdate(oldProps) {
        if (oldProps.friendCode !== this.props.friendCode) {
            this.setState({ friendCode: this.props.friendCode }, () => {
                if (this.props.friendCode) {
                    this.startSMS();
                }
            })
        }
    }
    getFriendCode() {
        this.props.getFriendCode()
    }
    async startSMS() {
        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
            let url = Linking.makeUrl('/invites', {
                friendCode: this.state.friendCode,
                user: this.props.user.email
            });
            //let url = `http://reductiscope.com?friendCode=${this.state.friendCode}`
            let message = `${url} \n Your love of food can make you thin`;

            res = await SMS.sendSMSAsync('6125184362', message);
            if (res.result === 'sent') {
                this.props.sendFriendCode(this.state.friendCode);
            } else {
                console.log("Message not sent")
            }
        } else {
            // TODO Handle error
            console.log("not available")
        }
    }
    render() {
        let user = this.props.user;
        return (
            <View style={ReferStyles.container}>
                <View style={ReferStyles.newRefer}>
                    <View style={ReferStyles.generateWrap}>
                        <View style={ReferStyles.generateInner}>
                            <TouchableOpacity
                                style={ReferStyles.generateButton}
                                onPress={() => this.getFriendCode()}
                            >
                                <FontAwesomeIcon
                                    icon='upload'
                                    size={0.1 * minDim}
                                    color={"rgb(35, 182, 255)"}
                                    style={{ marginBottom: 5 }}
                                />

                                <Text style={{ ...ReferStyles.generateText, ...this.props.regLetterStyle }}>
                                    Share an
                                </Text>
                                <Text style={{ ...ReferStyles.generateText, ...this.props.regLetterStyle }}>
                                    Invite Code
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={ReferStyles.nRemainingWrap}>
                        <View style={ReferStyles.nRemaining}>
                            <Text style={{ ...ReferStyles.remainingText, ...this.props.regLetterStyle, color: "rgb(35, 182, 255)" }}>{user.available_invites}</Text>
                            <Text style={{ ...ReferStyles.remainingText, ...this.props.regLetterStyle }}>Remaining</Text>
                        </View>
                    </View>
                </View>
                <View style={LevelUIStyles.friendContainer}>
                    <View style={ReferStyles.friendsHeader}>
                        <Text style={{ ...ReferStyles.friendsHeader, ...this.props.numberStyle }}>Friends</Text>
                    </View>
                    <ScrollView
                        centerContent={true}
                        contentContainerStyle={ReferStyles.friendButtonContainer}
                        horizontal={true}
                    >
                        {user['friendship_creator_set'].length ? user['friendship_creator_set'].map((friend, i) => {
                            return (
                                <View style={ReferStyles.friendArea} key={i}>
                                    <View style={ReferStyles.friendBody}>
                                        <Text>
                                            {friend['email'].split("@")[0]}
                                        </Text>
                                    </View>
                                </View>
                            )
                        }) :
                            <Text>
                                No friends yet
                            </Text>
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }
}