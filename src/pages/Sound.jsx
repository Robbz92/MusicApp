import React, { useEffect, useState } from 'react'

function Sound(props) {
    // hämtar enbart på låg
    const { id } = props.match.params

    // const type = id.length > 20 ? "playlist" : "song";

    // const [playlist, setPlayList] = useState([id]); // Denna ska vara en lista med strängar
    // const [playlistIndex, setPlaylistIndex] = useState(0);
    // const [ready, setReady] = useState(false);

    // async function getPlaylist() {
    //     let herokuappAPI = "https://yt-music-api.herokuapp.com/api/yt/playlist/"
    //     let result = await fetch(herokuappAPI + id)
    //     const data = await result.json();
    //     const { content } = data

    //     // om det är en play list sparar vi allt i useState.
    //     const playList = content.map((videoId) => videoId.videoId)
    //     return playList;
    // } 

    let player;

    // gets called automatically when YouTube player loads
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('yt-player', {
            height: '0',
            width: '0',
            videoId: id,
            events: {
                'onStateChange': onPlayerStateChange,
            }
        });
    }

    // this function triggers when we change song in player
    // can be used to update things, like counters
    function onPlayerStateChange(event) {
        if (event.data != YT.PlayerState.PLAYING) return
    }

    const handleActions = (action) => {
        if (!player) return
        if (action === "play") return player.playVideo()
        if (action === "pause") return player.pauseVideo()
    }

    // Om vi är på index 0, ladda index 1
    const loadSong = (id) => {
        if (!player) return
        player.loadVideoById(id)
    } 
    
    useEffect(() => {
        onYouTubeIframeAPIReady()
    }, [])

   // Jag vill kunna dela en låt på en länk
    return (
        <div className="soud-player-buttun-container">
            <button className="soud-player-button" onClick={() => handleActions("play")}>Play</button>
            <button className="soud-player-button" onClick={() => handleActions("pause")}>Pause</button>
            <button className="soud-player-button">Next</button>
            <div id="yt-player"></div>
        </div>
    )
}

export default Sound
