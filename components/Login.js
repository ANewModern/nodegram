import React from 'react';
import {
    Text,
    View, 
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableHighlight,
    StatusBar,
} from 'react-native';
import {
    Ionicons,
} from '@expo/vector-icons';
/*
    To-DO:
    1. Study storage component of RN
    2. Mounting components
    3. Styling: font family & fetching background image with blur
    4. Fetching and WebSockets APIs - R&D
    5. Error handling
    6. Testing
*/
export class LoginView extends React.Component {
    constructor() {
        super();
        this.state = {
            isLogged: false,
            username: undefined,
            password: undefined,
        }
    }
    getResponse = async () => {

    };
    __login = async () => {
        console.log('your logged n');
    };
    __register = async () => {
        console.log("yo");
    };
    render() {
        //check if has data on device
        StatusBar.setBarStyle("light-content");
        return (
            <ImageBackground source={require('../images/background.jpg')} style={{width: '100%', height: '100%'}} >
                <View style={styles.window}>
                    <View style={styles.logo}>
                        <Ionicons style={styles.icons} name="md-person" color='white' size={96} />
                        <Text style={{color: 'white', fontSize: 24}}>
                            Welcome to Nodegram!
                        </Text>
                    </View> 
                    <View style={styles.inputView}>
                        <Ionicons style={styles.icons} name="ios-log-in" size={24}/>
                        <TextInput style={{width: '100%', height: '100%'}}placeholder="Username"/>
                    </View>
                    <View style={styles.inputView}>
                        <Ionicons style={styles.icons} name="ios-person-add" size={24}/>
                        <TextInput style={{width: '100%', height: '100%'}}placeholder="Password"/>
                    </View>
                    <View style={styles.buttonsView}>
                            <TouchableHighlight style={styles.loginButton} onPress={this.__login}>
                                <Text style={styles.loginText}>
                                    LOGIN
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.regButton} onPress={this.__register}>
                                <Text style={styles.regText}>
                                    REGISTER
                                </Text>
                            </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.copyright}>
                    <Text style={{color: 'white', fontSize: 16}}>
                        Placeholder text, 2018 incroporated yo
                    </Text>
                </View>
            </ImageBackground>

        )
    }
}

const styles = StyleSheet.create({
    window: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'white',
        margin: 10,
    },
    inputView: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '85%',
        height: '50%',
        padding: 5,
        color: 'white',
        borderRadius: 10,
        margin: 5,
    },
    icons: {
        margin: 10,
    },
    buttonsView: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '85%',
    },
    loginButton: {
        width: '45%',
        height: '90%',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#43A047',
        borderRadius: 10,
    },
    loginText: {
        color: '#1B5E20',
        fontSize: 24,
    },
    regButton: {
        width: '45%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#039BE5',
        borderRadius: 10,
    },
    regText: {
        color: '#01579B',
        fontSize: 24,
    },
    copyright: {
        flex: 0.15,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
    }
})