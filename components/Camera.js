import React from 'react';
import { 
    Platform, 
    View, 
    TouchableOpacity, 
    StyleSheet, 
    StatusBar,
    Image,
    CameraRoll,
} from 'react-native';
import { 
    Camera, 
    Permissions, 
    ImageManipulator,
    ImagePicker
} from 'expo';

import {
    Ionicons,
} from '@expo/vector-icons';
/*  TO-DO: 
    1. Make a function that returns base64/uri from Camera or Photo Library for further Canvas/Image manipulation
    2. Tidy up the code
    3. Make it closeable (un-mountable/mountable) at a runtime
    4. Error handling
    5. More features?
*/ 
export class CameraView extends React.Component {
    constructor() {
        super();
        this.state = {
            flash: Camera.Constants.FlashMode.on,
            flashColor: "yellow",
            zoom: 0,
            autoFocus: Camera.Constants.Type.autoFocus,
            type: Camera.Constants.Type.back,
            whiteBalance: 'auto',
            ratio: '16:9',
            pictureSize: undefined,
            permissionCamera: false,
            permissionGallery: false,
            photoImg: undefined,
        };
    }
    __toggleCamera = () => {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back,
        })
    };
    __toggleFlashMode = () => {
        this.setState({ 
            flash: this.state.flash === Camera.Constants.FlashMode.on
            ? Camera.Constants.FlashMode.off 
            : Camera.Constants.FlashMode.on,
            flashColor: this.state.flash === Camera.Constants.FlashMode.on
            ? "white"
            : "yellow",
        })};
    __pickImage = async () => {
        let result = this.state.permissionGallery === false
            ? Permissions.askAsync(Permissions.CAMERA_ROLL).then( () => this.state.permissionGallery = true)
            : await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
                mediaTypes: 'Images',
            })
    };
    __takePicture = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync( { 
                quality: 1,
                base64: true,
                exif: true,
                })
            photo = await this.fixRotation(photo);
            await this.savePicture(photo);
        }
    };
    __closeCameraView = () => {
        ;//to-do!
    };
    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState( { permissionCamera: status === 'granted'});
    }
    fixRotation = async (photo) => await ImageManipulator.manipulate(photo.uri,
        [{
            rotate: -photo.exif.Orientation //This fixes rotation issue on my iPhone
        }, {
            resize: {
                width: photo.width,
                height: photo.height
            }
        }, {  
            crop: {
            originX: 0,
            originY: photo.height / 9,
            width: photo.width,
            height: photo.width
            }
        }], {
            compress: 1,
            format: 'jpeg',
    });
    setPermissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({
            permissionGallery: status === 'granted'
        })
    };
    savePicture = async (photo) => {
        await CameraRoll.saveToCameraRoll(photo.uri);
        this.setState({
            photoImg: photo.uri
        })
    };
    renderTopBar = () => (
        <View
        style={styles.topBar}>
        <TouchableOpacity onPress={this.__closeCameraView}>
            <Ionicons name="ios-close" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
            onPress={this.__toggleFlashMode}>
            <Ionicons name="ios-flash" size={40} color={this.state.flashColor} />
        </TouchableOpacity>  
        </View>
    );
    renderBottomBar = () => (
        <View
        style={styles.bottomBar}>
            <TouchableOpacity onPress={this.__pickImage}>
                <Ionicons name="ios-apps" size={48} color="white" />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                onPress={this.__takePicture}
                style={{ alignSelf: 'center' }}
                >
                    <Ionicons name="ios-radio-button-on" size={86} color="white" />
                </TouchableOpacity>
            </View> 
            <TouchableOpacity
                onPress={ this.__toggleCamera }>
                <Ionicons name="ios-reverse-camera" size={48} color="white" />
            </TouchableOpacity>
        </View>
    );
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
            }}>
                {this.renderTopBar()}
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                }}>
                    <Camera 
                    ref={ref => {
                        this.camera = ref;
                        }}
                    style={{
                        flex: 1,
                    }}
                    type={this.state.type}
                    flashMode={this.state.flash}
                    zoom={this.state.zoom}
                    autoFocus={this.state.autoFocus}
                    whiteBalance={this.state.whiteBalance}
                    ratio={this.state.ratio}
                    onMountError={this.handleMountError}
                    onCameraReady={this.setPermissions}
                    pictureSize={this.state.pictureSize}
                    />
                </View>
                {this.renderBottomBar()}
             </View>
            );
    }
}

const styles = StyleSheet.create({
    camera: {
      flex: 1,
      justifyContent: 'space-between',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: Platform.OS == 'ios' ? '12%' : '8%',
        marginTop: StatusBar.currentHeight,
        alignItems: 'flex-end',
        paddingRight: 15,
        paddingBottom: 10,
        paddingLeft: 15,
        backgroundColor: 'black',
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: Platform.OS == 'ios' ? '23%' : '21%',
        backgroundColor: 'black',
        paddingLeft: 15,
        paddingRight: 15,
    },
  });