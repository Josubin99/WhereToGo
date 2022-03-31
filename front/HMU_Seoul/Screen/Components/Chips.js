import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


const Chips = (props) => {
    const { id, value, onPress, chipStyle,type,selected,chipCloseStyle,valueStyleSelected,chipStyleSelected,valueStyle} = props;
    const returnStyles=()=>{
        return selectableStyles
    }
    
    return (
        <TouchableOpacity  onPress={onPress}>
            <View style={selected?[{flexDirection:'row'},returnStyles().chipSelected, chipStyle,chipStyleSelected]:[{flexDirection:'row'},returnStyles().chip, chipStyle]}>
                <Text style={selected?[{ paddingHorizontal:5},returnStyles().valueStyleSelected,valueStyle,valueStyleSelected]:[{ paddingHorizontal: 5 },returnStyles().valueStyle,valueStyle]}>{value}</Text>
            </View>
        </TouchableOpacity>
    )
}

const selectableStyles = StyleSheet.create({
    chip: {
        backgroundColor:'#F0EDCC',
        borderColor: '#F0EDCC',
        borderWidth: 1,
        margin: 5,
        padding:9,
        borderRadius: 20,
        justifyContent:"center",
    },
    valueStyle:{
        color:'#02343F',
        fontSize:14, //이거 조절하면 칩 크기 바뀜
        fontWeight: 'bold'       
    },
    chipSelected: {
        backgroundColor:'#02343F',
        borderColor: '#02343F',
        borderWidth: 1,
        margin: 5,
        padding:9,
        borderRadius: 20,
        justifyContent:"center",
    },
    valueStyleSelected:{
        color:'#F0EDCC',
        fontSize:16, //선택했을 때 크기조절
        fontWeight: 'bold'

    }
})

export default Chips;