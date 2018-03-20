import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, Dimensions, TouchableOpacity, ToastAndroid} from "react-native";
import RNFetchBlob from 'react-native-fetch-blob'
import PushNotification from 'react-native-push-notification';
import WallPaperManager from 'react-native-wallpaper-manager';

type Props = {};

export default class RecentModel extends Component<Props> {

    componentDidMount() {
        PushNotification.configure({
            onNotification: function (notification) {
                console.log('NOTIFICATION: ', notification);
            },
            popInitialNotification: true,
        });
    }

    constructor() {
        super();
        this.state = {
            imageUrl: '',
            imageName: ''
        };
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
        const height = Dimensions.get('screen').height*0.54;
        const imageUrl = text['urls']['regular'];
        const imageName = text['user']['name'];
        this.state.imageUrl = imageUrl;
        this.state.imageName = imageName;
        const imageLocation = text['user']['location'];
        const imageId = text['id'];
        const imageColor = text['color'];
        const {navigate} = this.props;
        return (
            <TouchableOpacity style={{
                flex: 1,height:height
            }}
                              onPress={() => navigate('DetailWallpaperScreen', {
                                  url: imageUrl,
                                  color: imageColor,
                                  name: imageName
                              })}>
                <Image
                    style={{width: '100%', height: '100%'}}
                    source={{uri: imageUrl}}
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
                        <Text style={{marginTop:14,marginLeft: 30, color: '#4a90e2',fontSize:16,fontFamily:'roboto_medium'}}>{imageName}</Text>
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
                            source={require('../../images/download.png')}/></TouchableOpacity>
                        <TouchableOpacity onPress={this.setWallpaper}><Image
                            style={{width: 25, height: 25, padding: 10}}
                            source={require('../../images/like.png')}/></TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
