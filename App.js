import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import * as FaceDetector from 'expo-face-detector'
import { Camera } from 'expo-camera'
import Rectangle from './Rectangle'
import { TRANSPARENT, WHITE } from './common/Colors'

const initialState = {
  hasPermission: '',
  face: {},
  faceDetected: false
}

const FaceDetectedPrompt = ({ faceDetected }) => {
  return (
    <View style={styles.faceDetectedPrompt}>
      <Text style={styles.prompt}>{faceDetected ? 'Face detected ✅' : 'No face detected ❌'}</Text>
    </View>
  )
}
class App extends React.Component {
  constructor () {
    super()
    this.state = { ...initialState }
    this.cameraRef = React.createRef()
  }

  async componentDidMount () {
    const { status } = await Camera.requestPermissionsAsync()
    if (status) {
      this.setState({ hasPermission: 'granted' })
    }
  }

  componentWillUnmount () {
    this.cameraRef = null
  }

  handleFacesDetected = (event) => {
    const { faces } = event
    if (faces && faces.length > 0) {
      this.setState({
        faceDetected: true,
        face: faces[0]
      })
    } else {
      this.setState({
        faceDetected: false,
        face: {}
      })
    }
  }

  render () {
    const { hasPermission, faceDetected, face } = this.state
    if (hasPermission === null) {
      return <View />
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>
    }

    return (
      <View style={styles.main}>
        <Camera
          ratio="4:3"
          autoFocus="on"
          flashMode="off"
          ref={(ref) => {
            this.cameraRef = ref
          }}
          style={styles.cameraWrapper}
          onFacesDetected={this.handleFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.fast,
            detectLandmarks: FaceDetector.Constants.Landmarks.all,
            runClassifications: FaceDetector.Constants.Classifications.none,
            minDetectionInterval: 1000,
            tracking: true
          }}
          type={Camera.Constants.Type.front}>
          <View style={styles.cameraContent}>
            {faceDetected && <Rectangle face={face} />}
            <FaceDetectedPrompt faceDetected={faceDetected} />
          </View>
        </Camera>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  cameraWrapper: {
    flex: 5
  },
  cameraContent: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: TRANSPARENT,
    marginBottom: 20
  },
  faceDetectedPrompt: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
    marginBottom: 20
  },
  prompt: {
    fontSize: 22,
    color: WHITE
  }
})

export default App
