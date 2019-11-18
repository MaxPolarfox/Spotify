import React from 'react'
import SpotifyPlayer from 'react-spotify-player';

const size = {
  width: '100%',
  height: 300,
};

export default function Player({ uri, selectedTrack }) {
  return (
    <div>
      {uri || selectedTrack ? < SpotifyPlayer
        uri={selectedTrack || uri}
        size={size}
        view='list'
        theme='white'
      /> : <h3>Loading data</h3>}

    </div>
  )
}


