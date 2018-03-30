import React, {Component} from 'react';
import {Text, View, FlatList, ProgressBarAndroid,StatusBar} from "react-native";
import RecentModel from "./modelList/RecentModel";
import {Constants} from "./Constants";
type Props = {};

export default class Recent extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isError: false
        };
    }

    componentDidMount() {
        this.loadData();
    }


    loadData = async () => {
        let response = await fetch('https://api.unsplash.com/photos/curated', {
            method: 'GET',
            headers: {
                'Authorization': Constants.API_KEY,
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                });
            }).catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);

                this.setState({isError: true, isLoading: false});
                // ADD THIS THROW error
                throw error;
            }.bind(this));
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{backgroundColor: '#f9fafb', alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <StatusBar
                        backgroundColor="#4a90e2"
                        barStyle="light-content"
                    />
                    <ProgressBarAndroid
                        color='#4a90e2'
                        style={{justifyContent: 'center'}}/>
                </View>
            )
        } else if (this.state.isError) {
            return (
                <View style={{backgroundColor: '#f9fafb', alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <StatusBar
                        backgroundColor="#4a90e2"
                        barStyle="light-content"
                    />
                    <Text>
                        There is some glitch while loading.
                    </Text>
                </View>
            );

        }
        const data = this.state.dataSource;
        const {navigate} = this.props;
        return (
            <View style={{backgroundColor: '#f9fafb'}}>
                <StatusBar
                    backgroundColor="#4a90e2"
                    barStyle="light-content"
                />
                <FlatList
                    keyExtractor={(item, index) => item.id}
                    data={data}
                    renderItem={({item}) => <RecentModel text={item}
                                                         navigate={navigate}/>}
                />
            </View>
        )
    }
}