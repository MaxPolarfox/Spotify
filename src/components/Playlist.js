import React from 'react'
import { Link } from 'react-router-dom'
import './PlayList.css'

export default function PlayLists({ playList, handleClick }) {
  return (
    <div className="playlist">
      <Link to={'/playlists/' + playList.id} onClick={() => handleClick(playList.id)} className='playlistLink' >
        <span className="iconify icon" data-icon="icomoon-free:spotify" data-inline="false"></span>
        <h3>{playList.name}</h3>
        <h4>{playList.tracks.total} songs</h4>
      </Link>

    </div>
  )
}
