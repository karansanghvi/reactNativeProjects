import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Header = (props) => {
  return (
    <View style={styles.headerMain}>
      <Text style={styles.headerTitle}>
        {props.title}
      </Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    headerMain: {
        marginLeft: 15
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 28
    }
})