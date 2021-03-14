import * as React from 'react';
import { View,Text } from "react-native";
import {Header} from 'react-native-elements'

export default class FindMechanicScreen extends React.Component {
    render(){
        return (
            <View>
                <Header 
                   centerComponent={{ text: "Find A Mechanic", style: { color: '#ADD3D0', fontSize:26,fontWeight:"600", fontStyle: 'italic' } }}
                   backgroundColor="#153250" />
            </View>
        )
    }
}