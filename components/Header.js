// The footer of the application

import React from 'react';
import { View, Text, Image, StatusBar, StyleSheet, Platform } from 'react-native';


const Header = () => (
    <View style={styles.header}>
        <View style={styles.header__containerLeft}>
            <Image source={require('../images/logo.png')} style={styles.header__logo} />
            <Text>NODEGRAM</Text>
        </View>
        <View style={styles.header__containerRight}>
            <Image source={require('../images/explore.png')} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: Platform.OS == 'ios' ? '12%' : '8%',
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
    header__logo: {
        width: 35,
        height: 35,
        marginRight: 10,
    },
    header__containerRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: Platform.OS == 'ios' ? 40 : 0,
    },
    header__containerLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Platform.OS == 'ios' ? 40 : 0,
    }
});

export default Header;