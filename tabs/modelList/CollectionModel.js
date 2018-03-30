import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, Dimensions, TouchableOpacity, ToastAndroid} from "react-native";
import DetailWallpaperScreen from "../DetailWallpaperScreen";
import RNFetchBlob from 'react-native-fetch-blob'
import PushNotification from 'react-native-push-notification';
import WallPaperManager from "react-native-wallpaper-manager";

type Props = {};

export default class CollectionModel extends Component<Props> {

    componentDidMount() {
        PushNotification.configure({
            onNotification: function (notification) {
                console.log('NOTIFICATION: ', notification);
            },
            popInitialNotification: true,
        });
    }

    constructor(props) {
        super(props);
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
        const imageUrl = text['urls']['regular'];
        this.state.imageUrl = imageUrl;
        const imageName = text['user']['name'];
        this.state.imageName = imageName;
        const imageLocation = text['user']['location'];
        const imageId = text['id'];
        const imageColor = text['color'];
        const {navigate} = this.props;
        const height = Dimensions.get('screen').height*0.18;

        return (

            <TouchableOpacity style={{
                flex: 1,
                height: height,
                flexDirection: 'row',
                backgroundColor: 'white',
                margin: 5,elevation:2,shadowColor:'#19000000'
            }}
                              onPress={() => navigate('DetailWallpaperScreen', {
                                  url: imageUrl,
                                  color: imageColor,
                                  name: imageName
                              })}>
                <Image
                    source={{uri: imageUrl}}
                    style={{width: '34%', margin: 10}}
                />
                <View style={{
                    flexDirection: 'column',
                    marginLeft:10,
                    marginTop:26
                }}>
                    <View style={{
                        flexDirection: 'column',
                        width: '100%',
                        justifyContent: 'flex-end',
                        alignItems:'flex-start',
                        height: '50%'
                    }}>
                        <Text style={{
                            color: '#4a90e2',fontSize:14,fontFamily:'roboto_medium'
                        }}
                              numberOfLines={1}
                              ellipsizeMode='tail'>{imageName}</Text>
                        <Text style={{
                            color: '#4a90e2',fontSize:14,fontFamily:'roboto_light'
                        }}
                              numberOfLines={1}
                              ellipsizeMode='tail'>{imageLocation}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        height:'50%',
                        alignItems:'center',
                        justifyContent:'flex-start'
                    }}>
                        <TouchableOpacity
                            onPress={this.downlaodImg}><Image
                            style={{width: 15, height: 15, padding: 10, marginRight: 7}}
                            source={require('../../images/download.png')}/></TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.setWallpaper}><Image
                            style={{width: 15, height: 15, padding: 10, marginLeft: 7}}
                            source={require('../../images/like.png')}/></TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
