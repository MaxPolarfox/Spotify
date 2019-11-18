import React from 'react'
import PlayList from './Playlist'
import './PlayLists.css'

export default function PlayLists({ playLists, handleClick }) {
  return (
    <div className="playlists">
      <h1>My playlists: </h1>
      {playLists.map(playList => {
        return (
          <PlayList key={playList.id} handleClick={handleClick} playList={playList} />
        )
      })}
    </div>
  )
}
