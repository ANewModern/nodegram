import React from 'react';
import {
    Text,
    View, 
    TouchableOpacity,
    Slider,
    StyleSheet, 
    StatusBar,
    Image,
    CameraRoll,
} from 'react-native';
import { 
    Permissions, 
    ImageManipulator,
    ImagePicker,
} from 'expo';
import {
    Ionicons,
} from '@expo/vector-icons';
/*  TO-DO: 
    3. Move styles from each element to style
    4. More features?
*/ 
export class CameraView extends React.Component {
    constructor() {
        super();
        this.state = {
            permissionCamera: false,
            permissionGallery: false,
            isEditing: false,
            photo: undefined, //photo object. Props: uri, base64 (if was taken with camera), width, height
        };
    }
    askPermissions = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (status === 'denied') {
            alert("You have not enabled Camera permissions!");
        }
        
    };
    setTruePermissions = () => {
        this.setState({
            permissionCamera: true,
            permissionGallery: true,
        });
    };
    checkPermissions = async () => {
            let { status } = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
            if (status === 'granted') {
                this.setTruePermissions();
            } else {
                this.askPermissions();
    }};
    // __closeImageEditing = () => {
    //     this.setState({
    //         photo: undefined,
    //         isEditing: false,
    //     });
    // };
    renderTopBar = () => {
        };
    renderBottomBar = () => {
        if (this.state.isEditing){
            return (
                <View>
                </View>
            );
        }
    };
    renderLibrary = () => {
        //let pics = getLastPics();
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <TouchableOpacity onPress={this.launchCamera} style={{padding: 50}}>
                    <Ionicons name="ios-radio-button-on-outline" size={32} />
                </TouchableOpacity>
                {this.renderImage()}
                <TouchableOpacity>
                    <Text color="black">PLS</Text>
                </TouchableOpacity>
            </View>
        );
    }
    renderImage = () => {
        if (this.state.photo) {
            return (
                <View style={{
                        flex: 0.5
                    }}>
                    <Image style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                    }}
                    source={{uri: this.state.photo.uri}} />
                </View>);
        }
    }
    render() {
        this.checkPermissions();
        return (
            <View style={styles.render}>
                {this.renderLibrary()}
             </View>
            );
    };
    launchCamera = async () => {
        if (this.state.permissionCamera && this.state.permissionGallery)
        {
            let pic = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1.0,
                base64: true,
                exif: true
            });
            this.setState({
                photo: pic["cancelled"] !== true
                ? pic
                : undefined
            })
        } else {
            this.checkPermissions();
        }
    };
}

const styles = StyleSheet.create({
    render: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        justifyContent: 'space-between'
    }
  });