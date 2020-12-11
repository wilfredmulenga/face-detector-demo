import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TRANSPARENT, WHITE } from './common/Colors'
const componentName = ({ face }) => {
  const styles = StyleSheet.create({
    rectangle: {
      width: face?.bounds.size.width,
      height: face?.bounds.size.height,
      borderWidth: 5,
      borderColor: WHITE,
      borderRadius: 5,
      position: 'absolute',
      top: face?.bounds.origin.y,
      left: face?.bounds.origin.x,
      backgroundColor: TRANSPARENT
    }
  })

  return <View style={styles.rectangle} />
}

export default componentName
