import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

import { Form } from 'semantic-ui-react'

import Playlists from './components/PlayLists'
import SelectedPlayList from './components/SelectedPlayList';
import FoundTracks from './components/FoundTracks'
import Player from './components/Player'

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      playlists: [],
      selectedPlayList: {},
      trackInfo: '',
      foundTracks: [],
      selectedSong: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.searchTrack = this.searchTrack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickSelectedTrack = this.handleClickSelectedTrack.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  async componentDidMount() {
    //Loading User's playlists
    let playlists = await spotifyApi.getUserPlaylists()
    this.setState({
      playlists: playlists.items
    })

  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  setSelectedPlayListId(id) {
    this.setState({
      setSelectedPlayListId: id
    })
  }

  async handleClick(id) {
    const selectedPlayList = await spotifyApi.getPlaylist(id)

    this.setState({
      selectedPlayList: selectedPlayList
    })
  }

  //Track search:
  handleChange(e) {
    this.setState({
      trackInfo: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.searchTrack(this.state.trackInfo)
    this.setState({
      trackInfo: '',
    })
  }

  async searchTrack(trackInfo) {
    const foundTracks = await spotifyApi.searchTracks(trackInfo)
    this.setState({
      foundTracks: foundTracks.tracks.items
    })
  }

  handleClickSelectedTrack(uri) {
    this.setState({
      selectedSong: uri,
      foundTracks: [],
    })
  }

  clearState() {
    this.setState({
      trackInfo: '',
      foundTracks: [],
      selectedSong: ''
    })
  }

  render() {
    return (
      <Router>
        <div className="App" >
          {this.state.loggedIn ?
            <div>
              <Link to={'/'} onClick={this.clearState}>  PLAYLISTS </Link>
              <Form onSubmit={this.handleSubmit}>
                <div>
                  <label htmlFor="trackInfo">
                  </label>
                  <input name="trackInfo" type="text" onChange={this.handleChange} placeholder='Search for tracks' />
                </div>
              </Form>

              {this.state.foundTracks[0] ? (
                <div className="foundTracks">
                  <FoundTracks foundTracks={this.state.foundTracks} handleClickSelectedTrack={this.handleClickSelectedTrack} />
                </div>
              ) : null}

              {this.state.selectedSong ? (
                <Player selectedTrack={this.state.selectedSong} />
              ) : <Playlists playLists={this.state.playlists} handleClick={this.handleClick} isAuthed={true} />}

              <Switch>
                <Route exact path='/playlists/:id' render={() => <SelectedPlayList selectedPlayList={this.state.selectedPlayList} isAuthed={true} />} />
              </Switch>
            </div>

            : (
              <a href='http://localhost:8888' > Login to Spotify </a>
            )
          }
        </div >
      </Router>
    );
  }
}

export default App;
