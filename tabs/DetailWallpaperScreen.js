import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, Dimensions, TouchableOpacity, ToastAndroid,StatusBar} from "react-native";
import PushNotification from "react-native-push-notification";
import RNFetchBlob from "react-native-fetch-blob";
import WallPaperManager from "react-native-wallpaper-manager";

type Props = {};

export default class DetailWallpaperScreen extends Component<Props> {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: '',
            imageName: ''
        };
    }
    componentDidMount() {
        PushNotification.configure({
            onNotification: function (notification) {
                console.log('NOTIFICATION: ', notification);
            },
            popInitialNotification: true,
        });
    }
    setWallpaper = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Setting Wallpaper...',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );

        WallPaperManager.setWallpaper({uri: this.state.imageUrl}, (res) => console.log(res));
    };
    downlaodImg = () => {
        PushNotification.localNotification({
            message: 'Your download has been started'
        });
        console.log('entered');
        let dirs = RNFetchBlob.fs.dirs;
        RNFetchBlob
            .config({
                // response data will be saved to this path if it has access right.
                path: dirs.PictureDir + '/' + this.state.imageName
            })
            .fetch('GET', this.state.imageUrl, {
                //some headers ..
            })
            .then((res) => {
                PushNotification.localNotification({
                    message: 'Download finished'
                });
                // the path should be dirs.DocumentDir + 'path-to-file.anything'
                console.log('The file saved to ', res.path())
            })
    };
    render() {
        const {text} = this.props;
        const height = Dimensions.get('screen').height;
        const {params} = this.props.navigation.state;
        this.state.imageUrl=params.url;
        this.state.imageName=params.name;
        return (
            <TouchableOpacity style={styles.container}>
                <StatusBar
                    backgroundColor="#4a90e2"
                    barStyle="light-content"
                />
                <Image
                    style={{width: '100%', height: height}}
                    source={{uri: params.url}}
                />
                <View style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    width: '100%',
                    height: 60,
                    bottom: 0
                }}>
                    <View style={{
                        flexDirection: 'column',
                        width: '50%',
                        justifyContent: 'flex-start',
                        height: 60
                    }}>
                        <Text style={{marginLeft: 30, color: 'white',fontSize:16,fontFamily:'roboto_medium'}}>{params.name}</Text>
                        <Text style={{marginBottom:20,marginLeft: 30, color: 'white',fontSize:16,fontFamily:'roboto_light'}}>{params.color}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: '50%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 60
                    }}>
                        <TouchableOpacity
                            onPress={this.downlaodImg}><Image
                            style={{width: 25, height: 25, padding: 10, margin: 30}}
                            source={require('../images/download_white.png')}/></TouchableOpacity>
                        <TouchableOpacity onPress={this.setWallpaper}><Image
                            style={{width: 25, height: 25, padding: 10}}
                            source={require('../images/wallpaper_white.png')}/></TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});