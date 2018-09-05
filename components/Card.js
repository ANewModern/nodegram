/*
 This will contain everything to show the feed for user.
 Each 'card' is an instance of the same-name class.
 To-DO: 
    1. Improve intereactivy (aka add event handlers)
    2. Assign a unique id for every card
*/
import React, { Component } from 'react';
import { View, TouchableHighlight, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default class Card extends Component {
    constructor(props){
        super(props);
        this.state = {
            likeActive: false
        };
    }
    hideElements(props) {
        // TO-DO: Hide children (except user profile pic) of class "card" after a few seconds
    }
    _onLikePress = () => {
        // TO-DO: send  data to the server
        this.setState({ likeActive: !this.state.likeActive });
    }
    render() {
        let profilePic = this.props.profilePictureMini ? this.props.profilePictureMini : '../images/account_picture_mini.png';
        return (
            <View style={styles.card}>
                <View style={styles.card__container}>
                    <TouchableOpacity style={styles.card__buttonLeft}><Image source={require('../images/account_picture_mini.png')} /></TouchableOpacity>
                    <TouchableOpacity style={styles.card__buttonRight}><Image source={require('../images/menu.png')} /></TouchableOpacity>
                </View>
                <Image  source={{uri: this.props.uri}} style={styles.card__image} />
                <View style={styles.card__container}>
                    <TouchableHighlight 
                        style={this.state.likeActive ? styles.card__buttonLikeActive : styles.card__buttonBottom}
                        onPress={this._onLikePress}
                    ><Image source={require('../images/likes.png')} /></TouchableHighlight>
                    <TouchableOpacity style={styles.card__buttonBottom}><Image source={require('../images/comment.png')} /></TouchableOpacity>
                    <TouchableOpacity style={styles.card__buttonBottom}><Image source={require('../images/share.png')} /></TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        justifyContent: 'space-between',
        backgroundColor: 'pink',
        marginTop: 5,
        marginBottom: 5,
        paddingRight: 10,
        paddingLeft: 10,
        zIndex: 2,
    },
    card__image: {
        aspectRatio: 1
    },
    card__container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    card__buttonLeft: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
    },
    card__buttonRight: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    card__buttonBottom: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card__buttonLike: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card__buttonLikeActive: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
});