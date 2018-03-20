import React, {Component} from 'react';
import {Text, TouchableOpacity, Image} from "react-native";

type Props = {};

export default class Splash extends TouchableOpacity {
    static navigationOptions = {
        header: null,
    };
    componentDidMount() {
        const{navigate} = this.props.navigation;
        setTimeout(navigate('Home'),10000)
    }
    render() {
        return (
            <TouchableOpacity style={{
                flex: 1,
                backgroundColor: '#fff',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image style={{height:100,width:100}}
                       source={require('../images/splash_icon.png')}/>
            </TouchableOpacity>
        )
    }
}