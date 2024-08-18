import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TrackPlayer, { Event, useTrackPlayerEvents } from 'react-native-track-player'
import { playListData } from '../constants';
import SongInfo from '../components/SongInfo';
import SongSlider from '../components/SongSlider';
import ControlCenter from '../components/ControlCenter';

const {width} = Dimensions.get('window');

const MusicPlayer = () => {

    const [track, setTrack] = useState();

    useEffect(() => {
        console.log(playListData)
    }, [])

    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
        switch(event.type)
        {
            case Event.PlaybackActiveTrackChanged:
                if(event.index !== undefined)
                {
                    try
                    {
                        const playingTrack = await TrackPlayer.getTrack(event.index);
                        setTrack(playingTrack);
                    }
                    catch(error)
                    {
                        console.error("Error fetching track: ", error);
                    }
                }
                else
                {
                    console.warn('event.index is undefined');
                }
                break;
            default:
                break;
        }
    });

    const renderArtwork = () => {
        return(
            <View style={styles.listArtWrapper}>
                <View style={styles.albumContainer}>
                    {track?.artwork && (
                        <Image 
                            style={styles.albumArtImg}
                            source={{uri: track?.artwork?.toString()}}
                        />
                    )}
                </View>
            </View>
        )
    }

  return (
    <View style={styles.container}>

        <FlatList
            horizontal
            data={playListData}
            renderItem={renderArtwork}
            keyExtractor={song => song.id.toString()}
        />

        <SongInfo trackId={track} />
        <SongSlider />
        <ControlCenter />

    </View>
  )
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#001d23',
    },

    listArtWrapper: {
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
    },

    albumContainer: {
      width: 300,
      height: 300,
    },

    albumArtImg: {
      height: '100%',
      borderRadius: 4,
    },
})

export default MusicPlayer