import React from 'react'
import './FoundTracks.css'

export default function FoundTracks({ foundTracks, handleClickSelectedTrack }) {
  return (
    <div className='foundTracks'>
      {foundTracks.map(track => {
        return (
          <div className="singleTrack" key={track.id} onClick={() => handleClickSelectedTrack(track.uri)} >
            <span className="iconify" data-icon="ant-design:play-circle-outline" data-inline="false"></span>
            <h1>{track.artists[0].name + '-' + track.name}</h1>
          </div>
        )
      })}

    </div>
  )
}
