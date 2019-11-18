import React from 'react'
import Player from './Player'

export default function SelectedPlayList({ selectedPlayList }) {
  const uri = selectedPlayList.uri;
  return (
    <div>
      <Player uri={uri} />
    </div>
  )
}

