import React from 'react';
import {
    Text,
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
    1. Tidy up the code
    2. Error handling
    3. Move styles from each element to style
    4. More features?
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
            photoImg: undefined, //photo object. Props: uri, base64 (if was taken with camera), width, height
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
        if (result !== undefined && !result['cancelled']) {
            this.setState({
                photoImg: result
            });
        }
    };
    __takePicture = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({ 
                quality: 1,
                base64: true,
                exif: true,
                })
            photo = await this.fixRotation(photo);
            await this.savePicture(photo);
        }
    };
    __closeImageView = () => {
        this.setState({
            photoImg: undefined
        });
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
                width: photo.width, //maybe the size of the resulting picture should be less? 
                height: photo.width
            }
        }], {
            compress: 1,
            format: 'jpeg',
            base64: true,
    });
    renderTopBar = () => (
        <View
        style={styles.topBar}>
        <TouchableOpacity>
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
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'

                }}>
                <TouchableOpacity onPress={this.__pickImage}>
                    <Ionicons name="ios-apps" size={48} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={this.__takePicture}
                style={{ alignSelf: 'center' }}
                >
                    <Ionicons name="ios-radio-button-on" size={86} color="white" />
                    </TouchableOpacity>
                <TouchableOpacity
                    onPress={ this.__toggleCamera }>
                    <Ionicons name="ios-reverse-camera" size={48} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
    renderImageOrCamera = () => {
        if (this.state.photoImg) {
            return (
                <View style={{
                    flex: 1
                }}>
                    <Image
                        style={{
                            flex: 1
                        }}
                        source={{uri: this.state.photoImg.uri}}
                    />
                    <TouchableOpacity 
                        style={{
                            justifyContent: 'center',
                            borderRadius: '50%',
                            backgroundColor: '#212121',
                            alignItems: 'center',
                            width: 60,
                            height: 30,
                            marginTop: -40,
                            marginLeft: '42%',
                            
                        }}
                        onPress={this.__closeImageView}>
                        <Text
                            style={{
                                color: 'white',
                            }}>
                            Close
                        </Text>
                    </TouchableOpacity>    
                </View>);
        } else {
            return (
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
                />);
        }
    };
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                height: '100%',
                width: '100%'
            }}>
                {this.renderTopBar()}
                <View style={{
                    flex: 0.5,
                }}>
                    {this.renderImageOrCamera()}
                </View>
                {this.renderBottomBar()}
             </View>
            );
    };
    setPermissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({
            permissionGallery: status === 'granted'
        })
    };
    savePicture = async (photo) => {
        await CameraRoll.saveToCameraRoll(photo.uri);
        this.setState({
            photoImg: photo
        })
    };
    upload = async () => {
        //await ImageMegaUpload(this.state.photoImg.uri);
    };
}

const styles = StyleSheet.create({
    topBar: {
        flex: 0.25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: StatusBar.currentHeight,
        alignItems: 'center',
        paddingRight: 15,
        paddingBottom: 10,
        paddingLeft: 15,
        backgroundColor: 'black',
    },
    bottomBar: {
        flex: 0.25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingLeft: 15,
        paddingRight: 15,
    },
  });