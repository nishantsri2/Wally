import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, Dimensions, TouchableOpacity} from "react-native";

type Props = {};

export default class CategoryModel extends Component<Props> {

    render() {
        const {text} = this.props;
        var imageUrl = text['cover_photo'];
        if (imageUrl === null) {
            imageUrl = "https://images.unsplash.com/photo-1489442513325-6e77bc98de06?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=edc53b16732b1431cbea354fb7dac826";
        }else{
            imageUrl = imageUrl['urls']['regular']
        }
        const imageName = text['title'];
        const totalImages = text['total_photos'];
        const imageId = text['id'];
        const {navigate} = this.props;
        const height = Dimensions.get('screen').height*0.38;
        const image_height=0.68*height;
        return (

            <TouchableOpacity style={{
                flex: 1,height:height,backgroundColor:'white',flexDirection:'column',margin:5,elevation:2,shadowColor:'#19000000'
            }}
                              onPress={() => navigate('CategoryItem', {id: imageId})}>
                <Image
                    style={{width: '100%', height: image_height}}
                    source={{uri: imageUrl}}
                />
                <View style={{
                    flexDirection: 'column',
                    marginTop:20,marginLeft:20
                }}>
                    <Text style={{color: '#4a90e2',fontFamily:'roboto_medium'}}>{imageName}</Text>
                    <Text style={{color: '#4a90e2',fontFamily:'roboto_light'}}>{totalImages} Wallpapers</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
