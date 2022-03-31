import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Chips from './Chips.js';

class SelectChip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedChips:[],
            isFocused: false,
            chips: (props.initialChips) ? props.initialChips : []
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            chips: (nextProps.initialChips) ? nextProps.initialChips : [],    
        });
    }

    selectChip=(value)=>{
        
        if(this.isSelected(value)){
            let array = [...this.state.selectedChips]
            let result = array.filter((text)=>{
                return text!=value
            })
            this.setState({
                selectedChips:result
            }, () => this.props.onChangeChips && this.props.onChangeChips(this.state.selectedChips));
            if (this.props.alertRequired) Alert.alert('', 'Unselected')
        } else {
            let array = [...this.state.selectedChips]
            array.unshift(value)  
            this.setState({
                selectedChips:array
            }, () => this.props.onChangeChips && this.props.onChangeChips(this.state.selectedChips));          
            if (this.props.alertRequired) Alert.alert('', 'Selected')
        }       
    }

    isSelected=(value)=>{
        let array = [...this.state.selectedChips]
        return array.includes(value)
    }

    render() {
        
        const { chipStyle,valueStyle,valueStyleSelected, chipStyleSelected, alertRequired, onChangeChips, getSelectedChips } = this.props;
        
        const chips = this.state.chips.map((item,index) => (
            <Chips
                id={index}
                value={item}
                chipStyle={chipStyle}
                valueStyle={valueStyle}
                valueStyleSelected={valueStyleSelected}
                chipStyleSelected={chipStyleSelected}
                onPress={() => this.selectChip(item)} 
                type='selectable'
                selected={this.isSelected(item)}/>
        ));

        return (
            <View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent:'center'}}>
                    {chips}
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    
});

export default SelectChip;