/*
 This will contain everything to show the feed for user.
 Each 'card' is an instance of the same-name class.
 To-DO: 
    1. Setup async fetch requests to server to refresh the feed
*/
import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import Card from './Card';

const Feed = () => (
    <ScrollView style={styles.feed}>
        <Card uri='https://images-na.ssl-images-amazon.com/images/I/71Y%2BAEdxB6L._SX425_.jpg' />
        <Card uri='https://www.solidrop.net/photo/embroidery-scenery-needlework-cross-stitch-set-full-square-resin-diamond-star-diy-diamond-painting.jpg' />
    </ScrollView>
);

const styles = StyleSheet.create({
    feed: {
        flex: 3,
        backgroundColor: 'whitesmoke',
        zIndex: 1,
    }
});

export default Feed;