import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, Share,DrawerLayoutAndroid} from "react-native";
type Props = {};

export default class Drawer extends View {


   render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <Image style={{height: 170}}
                           source={require('../images/drawerWallpaper.png')}
                    />
                <TouchableOpacity style={{flexDirection: 'row', margin: 8, alignItems: 'center'}}
                onPress={this.props.closeDrawe}>
                    <Image style={{width: 15, height: 15, marginRight: 10}}
                           source={require('../images/like.png')}/>
                    <Text style={{fontSize: 12}}>WallPapers</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', margin: 8, alignItems: 'center'}}
                                  onPress={() => Share.share({message: 'Please share this app'})}>
                    <Image style={{width: 15, height: 15, marginRight: 10}}
                           source={require('../images/share.png')}/>
                    <Text style={{fontSize: 12}}>Share</Text>
                </TouchableOpacity>
            </View>
        )
    }
}