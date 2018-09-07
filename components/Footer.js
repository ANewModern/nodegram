// The footer of the application
// The state of the buttons will be managed by Redux

import React, { Component } from 'react'
import { Alert, View, TouchableHighlight, Image, StyleSheet, Platform } from 'react-native';

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homeActive: true,
            messeagesActive: false,
            postActive: false,
            notificationsActive: false,
            profileActive: false
        };
    }
    _onHomePress = () => {
        this.setState({ 
            homeActive: !this.state.homeActive,
            messeagesActive: false,
            postActive: false,
            notificationsActive: false,
            profileActive: false
        });
    }
    _onMessagesPress = () => {
        this.setState({ 
            homeActive: false,
            messeagesActive: !this.state.messeagesActive,
            postActive: false,
            notificationsActive: false,
            profileActive: false
        });
    }
    _onPostPress = () => {
        this.setState({ 
            homeActive: false,
            messeagesActive: false,
            postActive: !this.state.postActive,
            notificationsActive: false,
            profileActive: false
        });
    } 
    _onNotificationsPress = () => {
        this.setState({ 
            homeActive: false,
            messeagesActive: false,
            postActive: false,
            notificationsActive: !this.state.notificationsActive,
            profileActive: false
        });
    }
    _onProfilePress = () => {
        this.setState({ 
            homeActive: false,
            messeagesActive: false,
            postActive: false,
            notificationsActive: false,
            profileActive: !this.state.profileActive,
        });
    }
    render() {
        return (
            <View style={styles.footer}>
                <TouchableHighlight 
                    style={this.state.homeActive ? styles.footer__container__highlight : styles.footer__container} 
                    onPress={this._onHomePress}
                >
                    <Image source={require('../images/home.png')} />
                </TouchableHighlight>
                <TouchableHighlight 
                    style={this.state.messeagesActive ? styles.footer__container__highlight : styles.footer__container} 
                    onPress={this._onMessagesPress}
                >
                    <Image source={require('../images/messages.png')} />
                </TouchableHighlight>
                <TouchableHighlight 
                    style={this.state.postActive ? styles.footer__container__highlight : styles.footer__container} 
                    onPress={this._onPostPress}
                >
                    <Image source={require('../images/post.png')} />
                </TouchableHighlight>
                <TouchableHighlight 
                    style={this.state.notificationsActive ? styles.footer__container__highlight : styles.footer__container} 
                    onPress={this._onNotificationsPress}
                >
                    <Image source={require('../images/notifications.png')} />
                </TouchableHighlight>
                <TouchableHighlight 
                    style={this.state.profileActive ? styles.footer__container__highlight : styles.footer__container} 
                    onPress={this._onProfilePress}
                >
                    <Image source={require('../images/profile.png')} />
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: Platform.OS == 'ios' ? '10%' : '8%',
        backgroundColor: 'whitesmoke',
        zIndex: 2,
    },
    footer__container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: Platform.OS == 'ios' ? 25 : 0,
    },
    footer__container__highlight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        paddingBottom: Platform.OS == 'ios' ? 25 : 0,
    },
    Image: {
        color: 'white',
    }

});