import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { playListData } from '../constants'


const SongInfo = ({trackId}) => {

    const track = playListData.find(t => t.id === trackId)

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}> {track?.title} </Text>
        <Text style={styles.artist}> {track?.artist} </Text>
        <Text style={styles.album}> {track?.album} </Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({

    container: {
        width: '90%',
        marginTop: 18,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center'
    },

    name: {
        marginBottom: 8,
        textAlign: 'center',
        color: '#fff',
        fontSize: 24,
        fontWeight: '800'
    },

    artist: {
        color: '#d9d9d9',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '800'
    },

    album: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '800',
        textAlign: 'center',
        color: '#5C1E68'
    }
})

export default SongInfo