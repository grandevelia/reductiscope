import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import RulesStyles from './styles/RulesStyles';

const ruleList = {
    "No Exceptions": `If the Reductiscope says you are not allowed to have a \
particular Food of Joy, then damnit, you aren’t allowed to have it. \
Who are you trying to fool, after all?`,

    "Overlap": `If a food could be classified in more than one group, and \
one of those groups is a banned Food of Joy that day, the food is \
in the banned group. Again, the Reductiscope allows for no self-delusion.`,

    "Don’t Be A Jerk About It": `With any systematic approach to eating and \
drinking, there can be a tendency to become a bit of a burden \
(and a bore) in your social interactions. This is your project, not \
that of your friends, family, and co-workers. Don’t impose your \
requirements on them by telling them what foods and drinks they \
should have available for you, especially during special occasions.
        
For example, if you are attending a special event where a friend \
is making his finest paella but The Reductiscope says you are not \
allowed to eat rice that day, eat the damn paella -- just exercise \
some control for Tomorrow the Daily Weigh-In Shall Come. On many \
special occasions there are plenty of Reductiscope-compliant foods \
available, and if you can comply without being a jerk, do so.`,

    "Vacation": `When you are away from home on vacation, there are no \
forbidden Foods of Joy. Enjoy yourself. Remember, however, that \
vacations are temporary. You will need to weigh yourself the morning \
after you return. And the morning after that, too. An over-indulgent \
vacation can make for a long, regretful post-vacation.`,

    "Keep It Quiet But Tell Others": `There are several reasons why we think it’s important \
to not talk about the fact that you’re using The Reductiscope System, except:

(1) Your doctor, if you have concerns. When you use The Redusctiscope, \
you will be somewhat changing the way you approach food. You also likely \
will be losing weight, in some cases rather quickly. Although we don’t \
know of anyone for whom (for example)  avoiding beer and dessert would \
be dangerous, we also know that humans are weird, wonderful, diverse \
creatures with widely-varying physical conditions. So, talk to your \
doctor as you should when implementing any systematic change that \
could impact your body . 
        
(2) Your significant other. This person will usually be the most supportive \
person with whom to share the information, and likely will want to \
assist in removing inordinate temptations on days when The Reductiscope \
says certain Foods of Joy are not available for you. 
        
Beyond that, don’t talk about The Reductiscope until you are ready to recommend \
it to someone else. First and foremost, nobody really wants to know that \
you are trying to control your weight. Don’t talk about it, don’t complain \ 
about it, just do it. However, we also think the system works best \
(and for the most people) if people are referred only by those for whom the \
system has been successful. We don’t intend to broadly promote the tool or \
the system. We are confident that the best way to spread the word is slowly \
and quietly, by word of mouth from one successful user to another. For \
those who achieve success and pass the word to others who are successful, \
recognition (in more than once sense of the word) will be available. \
Now see Making a Referral.`,

    "Making a Referral": `When you have achieved your Weight Goal, \
you will see a Make a Referral button on the app. This will allow you to refer \
The Reductiscope to up to five people. For each person you refer who becomes a \
user, you will receive referral points toward Reductiscope Awards. For each of \
your referrals who achieve their weight targets, you will receive additional \
points toward those Awards. You will receive additional points when your \
referrals receive award points achieved by your referrals (and on down the line).`
};
const suggestionList = [
    "Get a bluetooth scale.",
    `Weigh yourself every morning that you are not on vacation. Every damn morning -- \
after you relieve yourself of your digestive burdens but before you eat or \
drink anything. Clothing has weight, so unless you are uncomfortable being \
around yourself naked, go ahead and get natural.`,
    `Look in the mirror before you weigh yourself and guess what you weigh. Learn \
what you look like at a given weight.`,
    `Do not weigh yourself other than that one time each day. The Reductiscope is \
not about being obsessive, compulsive, or any other -ive other than alive, \
active, and festive.`,
    `Once you reach your target weight, you’ll likely find you don’t need the \
Reductiscope anymore. There are reasons you might continue to use the \
tool (we’ll tell you why when you get there), but we’re just as happy \
if you never need us again. You will have achieved, and learned how to \
maintain yourself, at your target weight.`,
    `If the Redictiscope  works for you, tell others (here’s how). The Reductiscope \
is BIO-driven (By Invitation Only). Each time you invite others and they join, \ 
you find you receive a little gift (one that you’ll find very useful, even \
if a little risky).`
];
export default class RulesScreen extends Component {
    render() {
        return (
            <ScrollView style={RulesStyles.rulesContainer}>
                <View style={RulesStyles.topGap} />
                {Object.keys(ruleList).map((ruleTitle, i) => {
                    let rule = ruleList[ruleTitle];
                    let dir = 1;
                    let base = 0;
                    if (i % 2 === 0) {
                        dir = - 1;
                        base = 200;
                    }

                    let red = base + dir * 15 * (i + 1);
                    let green = base + dir * 25 * (i + 1);
                    let blue = base + dir * 35 * (i + 1);
                    return (
                        <View style={{
                            ...RulesStyles.ruleSection,
                            borderLeftColor: `rgb(${red}, ${green}, ${blue})`
                        }
                        } key={i}>
                            <View style={RulesStyles.numberContainer}>
                                <Text style={{ ...RulesStyles.ruleNumber, ...this.props.regLetterStyle }}>{i + 1}</Text>
                            </View>
                            <View style={RulesStyles.textContainer}>
                                <Text style={{ ...RulesStyles.ruleTitleText, ...this.props.regLetterStyle }}>{ruleTitle}</Text>
                                <Text style={{ ...RulesStyles.ruleText, ...this.props.regLetterStyle }}>{rule}</Text>
                            </View>
                        </View>
                    )
                })}
                <View style={RulesStyles.sectionHeader}>
                    <Text style={{ ...RulesStyles.headerText, ...this.props.regLetterStyle }}>
                        Suggestions, not rules
                    </Text>
                </View>
                {suggestionList.map((suggestion, i) => {
                    let dir = 1;
                    let base = 0;
                    if (i % 2 === 0) {
                        dir = - 1;
                        base = 200;
                    }

                    let red = base + dir * 15 * (i + 1);
                    let green = base + dir * 25 * (i + 1);
                    let blue = base + dir * 35 * (i + 1);
                    return (
                        <View style={{
                            ...RulesStyles.ruleSection,
                            borderLeftColor: `rgb(${red}, ${green}, ${blue})`
                        }
                        } key={i}>
                            <View style={RulesStyles.numberContainer}>
                                <Text style={{ ...RulesStyles.ruleNumber, ...this.props.regLetterStyle }}>{i + 1}</Text>
                            </View>
                            <View style={RulesStyles.textContainer}>
                                <Text style={{ ...RulesStyles.ruleText, ...this.props.regLetterStyle }}>{suggestion}</Text>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        )
    }
}