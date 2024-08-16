import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addTrack, setupPlayer } from '../musicPlayerServices';


const App = () => {

  const [isPlayerReady, setIsPLayerReady] = useState(false);

  const setup = async() => {
    let isSetUp = await setupPlayer();
    if(isSetUp)
    {
      await addTrack();
    }
    setIsPLayerReady(isSetUp);
  };

  useEffect(() => {
    setup();
  }, [])

  if(!isPlayerReady)
  {
    return(
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text>App</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App