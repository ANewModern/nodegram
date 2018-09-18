import React, { Component } from 'react';
import { 
    Alert, 
    Slider, 
    Platform, 
    Text, 
    View, 
    TouchableOpacity, 
    StyleSheet, 
    ScrollView,
    StatusBar,
    Image,
    CameraRoll
} from 'react-native';
import { 
    Camera, 
    Permissions, 
    FileSystem, 
    MediaLibrary, 
    Constants 
} from 'expo';

import {
    Octicons,
    Ionicons,
    Foundation,
    MaterialIcons,
    wbIcons
} from '@expo/vector-icons';

const flashModeOrder = {
    auto: 'auto',
    on: 'on',
    off: 'off'
};
const flashIcons = {
    auto: 'flash-auto',
    on: 'flash-on',
    off: 'flash-off'
};

export class CameraView extends React.Component {
    constructor() {
        super();
        this.state = {
        flash: 'auto',
        zoom: 0,
        autoFocus: 'on',
        type: 'back',
        whiteBalance: 'auto',
        ratio: '1:1',
        pictureSize: undefined,
        permissionCamera: false,
        permissionGallery: false,
        };
    }
    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState( { permissionCamera: status === 'granted'});
    }
    
    toggleView = () => this.setState({ showGallery: !this.state.showGallery});
    render() {
        return (
            <View style={{
                
                flex: 1,
                flexDirection: 'column' }}>
                {this.renderTopBar()}
                <Image source="" />
                <Camera 
                ref={ref => {
                    this.camera = ref;
                    }}
                style={{ 
                    flex: 1,
                    width: '100%',
                    height: '50%',
                }}
                type={this.state.type}
                flashMode={this.state.flashMode}
                zoom={this.state.zoom}
                autoFocus={this.state.autoFocus}
                whiteBalance={this.state.whiteBalance}
                ratio={this.state.ratio}
                pictureSize={this.state.pictureSize}
                onMountError={this.handleMountError} 
                >
                </Camera>
                
                {this.renderBottomBar()}
            </View>
        );
    }

    takePicture = () => {
        if (this.camera) {
            this.camera.takePictureAsync( { 
                quality: 1,
                base64: false, //maybe later set it to true to display it in Image?
                exif: true,
            }).then(this.savePicture);
        }
    };
    savePicture = async (photo) => {
        await CameraRoll.saveToCameraRoll(photo.uri);
    };
    renderBottomBar = () =>
        <View
        style={styles.bottomBar}>
        <TouchableOpacity>
            <Text>...</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
            <TouchableOpacity
            onPress={this.takePicture}
            style={{ alignSelf: 'center' }}
            >
            <Text> Snap </Text>
            </TouchableOpacity>
        </View> 
        <TouchableOpacity>
            <Text>Previews</Text>
        </TouchableOpacity>
        </View>

    renderTopBar = () => 
        <View
        style={styles.topBar}>
        <TouchableOpacity>
            <Text>Change camera</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text>Flash</Text>
        </TouchableOpacity>
        <TouchableOpacity >
            <Text>AF</Text>
        </TouchableOpacity>   
        </View>

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    camera: {
      flex: 1,
      justifyContent: 'space-between',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: Platform.OS == 'ios' ? '25%' : '21%',
        marginTop: StatusBar.currentHeight,
        paddingRight: 5,
        paddingLeft: 5,
        backgroundColor: 'whitesmoke',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        zIndex: 2,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: Platform.OS == 'ios' ? '25%' : '23%',
        backgroundColor: 'whitesmoke',
        zIndex: 2,
    }
  });