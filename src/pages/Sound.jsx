import React, {useEffect} from 'react'

function Sound(props) {
    const {id} = props.match.params

    let player;

    // gets called automatically when YouTube player loads
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('yt-player', {
            height: '0',
            width: '0',
            videoId: id,
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    }

    // this function triggers when we change song in player
    // can be used to update things, like counters
    function onPlayerStateChange(event) {
        if (event.data != YT.PlayerState.PLAYING) return
    }

    useEffect(() => {
        onYouTubeIframeAPIReady()
    }, [])

    const handleActions = (action) =>{
        if (!player) return
        if (action === "play") return player.playVideo()
        if (action === "pause") return player.pauseVideo()
    }
    // <Component data={getData()} />
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
