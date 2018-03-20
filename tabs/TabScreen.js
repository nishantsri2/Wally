/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    DrawerLayoutAndroid,
    Button,
    ViewPagerAndroid,
    TouchableOpacity, Image, Dimensions
} from 'react-native';
import Collections from "./Collections";
import Categories from "./Categories";
import Recent from "./Recents"
import TabNavigator from 'react-native-tab-navigator';

type Props = {};

export default class TabScreen extends Component<Props> {
    static navigationOptions = {
        header: null,
    };
    constructor() {
        super();
        this.state = {
            selectedTab: 'recent'
        };
    }

    render() {
        const {navigate} = this.props.navigation;
        const height = Dimensions.get('screen').height*0.8;
        return (

            <TabNavigator tabBarStyle={{backgroundColor: '#4a90e2', alignItems: 'center'}}>
                <TabNavigator.Item
                    titleStyle={{color: '#ABCCF1', fontSize: 10,fontFamily:'roboto_medium'}}
                    selectedTitleStyle={{color: 'white', fontSize: 10,fontFamily:'roboto_medium'}}
                    selected={this.state.selectedTab === 'recent'}
                    title="Recent"
                    renderIcon={() => <Image style={{height: 15, width: 15}}
                                             source={require('../images/recent_unselected.png')}/>}
                    renderSelectedIcon={() => <Image style={{height: 15, width: 15}}
                                                     source={require('../images/recent.png')}/>}
                    onPress={() => this.setState({selectedTab: 'recent'})}>
                    <Recent
                         navigate={navigate}
                        key={0}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selectedTitleStyle={{color: 'white', fontSize: 10,fontFamily:'roboto_medium'}}
                    titleStyle={{color: '#ABCCF1', fontSize: 10,fontFamily:'roboto_medium'}}
                    selected={this.state.selectedTab === 'collection'}
                    title="Collection"
                    renderIcon={() => <Image style={{height: 15, width: 15}}
                                             source={require('../images/collection_unselected.png')}/>}
                    renderSelectedIcon={() => <Image style={{height: 15, width: 15}}
                                                     source={require('../images/collection.png')}/>}
                    onPress={() => this.setState({selectedTab: 'collection'})}>
                    <Collections
                         navigate={navigate}
                        key={1}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selectedTitleStyle={{color: 'white', fontSize: 10,fontFamily:'roboto_medium'}}
                    titleStyle={{color: '#ABCCF1', fontSize: 10,fontFamily:'roboto_medium'}}
                    selected={this.state.selectedTab === 'category'}
                    title="Category"
                    renderIcon={() => <Image style={{height: 15, width: 15}}
                                             source={require('../images/category_unselected.png')}/>}
                    renderSelectedIcon={() => <Image style={{height: 15, width: 15}}
                                                     source={require('../images/category.png')}/>}
                    onPress={() => this.setState({selectedTab: 'category'})}>
                    <Categories
                        navigate={navigate}
                        key={2}/>
                </TabNavigator.Item>
            </TabNavigator>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    pageStyle: {
        alignItems: "center",
        padding: 20,
        justifyContent: "center"
    },
    viewPager: {
        height: '100%',
        backgroundColor: "#F5FCFF"
    },
    toolbar: {
        backgroundColor: "#008B7D",
        height: 56
    }
});