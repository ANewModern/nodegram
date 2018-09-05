// This will contain all the components to display the dashboard

import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Header from './Header';
import Feed from './Feed';
import Footer from './Footer';

const Dashboard = () => (
    <View style={styles.dashboard}>
        <Header />
        <Feed />
        <Footer />
    </View>
);

const styles = StyleSheet.create({
    dashboard: {
        flex: 1,
    },
});

export default Dashboard;