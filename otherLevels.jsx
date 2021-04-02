<View style={{...IntroStyles.stage, ...IntroStyles.stage3}}>
    <View style={IntroStyles.stageTitleWrapper}>
        <Text style={{...IntroStyles.stageTitle, fontFamily: this.props.fonts.regLetterFont }}>Level 3</Text>
        <Text style={{...IntroStyles.stageRange, fontFamily: this.props.fonts.regLetterFont }}>
        { roundWeightStringFromKg(currentWeight-3*incrementKg, this.props.weightUnits)} - {roundWeightStringFromKg(currentWeight-4*incrementKg, this.props.weightUnits) }
        </Text>
    </View>
    <Text style={{...IntroStyles.levelSectionHeader, fontFamily: this.props.fonts.regLetterFont }}>You may have:</Text>
    <View style={IntroStyles.levelDescription}>
        { allowedCarbs(2, carbRanks, ...this.props.fonts.regLetterFont) }
    </View>
</View>
<View style={{...IntroStyles.stage, ...IntroStyles.stage4}}>
    <View style={IntroStyles.stageTitleWrapper}>
        <Text style={{...IntroStyles.stageTitle, fontFamily: this.props.fonts.regLetterFont }}>Level 4</Text>
        <Text style={{...IntroStyles.stageRange, fontFamily: this.props.fonts.regLetterFont }}>
        { roundWeightStringFromKg(currentWeight-4*incrementKg, this.props.weightUnits)} - {roundWeightStringFromKg(currentWeight-5*incrementKg, this.props.weightUnits) }
        </Text>
    </View>
    <Text style={{...IntroStyles.levelSectionHeader, fontFamily: this.props.fonts.regLetterFont }}>You may have:</Text>
    <View style={IntroStyles.levelDescription}>
        { allowedCarbs(3, carbRanks, ...this.props.fonts.regLetterFont) }
    </View>
</View>
<View style={{...IntroStyles.stage, ...IntroStyles.stage5}}>
    <View style={IntroStyles.stageTitleWrapper}>
        <Text style={{...IntroStyles.stageTitle, fontFamily: this.props.fonts.regLetterFont }}>Level 5</Text>
        <Text style={{...IntroStyles.stageRange, fontFamily: this.props.fonts.regLetterFont }}>
        { roundWeightStringFromKg(currentWeight-5*incrementKg, this.props.weightUnits)} - {roundWeightStringFromKg(currentWeight-6*incrementKg, this.props.weightUnits) }
        </Text>
    </View>
    <Text style={{...IntroStyles.levelSectionHeader, fontFamily: this.props.fonts.regLetterFont }}>You may have:</Text>
    <View style={IntroStyles.levelDescription}>
        { allowedCarbs(4, carbRanks, ...this.props.fonts.regLetterFont) }
    </View>
</View>
<View style={{...IntroStyles.stage, ...IntroStyles.stage6}}>
    <View style={IntroStyles.stageTitleWrapper}>
        <Text style={{...IntroStyles.stageTitle, fontFamily: this.props.fonts.regLetterFont }}>Level 6</Text>
        <Text style={{...IntroStyles.stageRange, fontFamily: this.props.fonts.regLetterFont }}>
        { roundWeightStringFromKg(currentWeight-6*incrementKg, this.props.weightUnits)} - {roundWeightStringFromKg(currentWeight-7*incrementKg, this.props.weightUnits) }
        </Text>
    </View>
    <Text style={{...IntroStyles.levelSectionHeader, fontFamily: this.props.fonts.regLetterFont }}>You may have:</Text>
    <View style={IntroStyles.levelDescription}>
        { allowedCarbs(5, carbRanks, ...this.props.fonts.regLetterFont) }
    </View>
</View>
<View style={{...IntroStyles.stage, ...IntroStyles.stage7}}>
    <View style={IntroStyles.stageTitleWrapper}>
        <Text style={{...IntroStyles.stageTitle, fontFamily: this.props.fonts.regLetterFont }}>Level 7</Text>
        <Text style={{...IntroStyles.stageRange, fontFamily: this.props.fonts.regLetterFont }}>Ideal Weight Achieved.</Text>
    </View>
    <Text style={{...IntroStyles.levelSectionHeader, fontFamily: this.props.fonts.regLetterFont }}>You may have:</Text>
    <Text style={{...IntroStyles.levelDescription, fontFamily: this.props.fonts.regLetterFont }}>
        Whatever you want (as long as you maintain your weight)
    </Text>
</View>