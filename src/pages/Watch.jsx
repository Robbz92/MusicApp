import React, { useEffect } from 'react'

function Watch(props) {
    /* props.match.params.id == :id från /watch/:id */

    // accessible variable for calling player functions
    let player;

    // gets called automatically when YouTube player loads
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('yt-player', {
            height: '300',
            width: '400',
            videoId: props.match.params.id,
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

    return (
        <div>
            <button>Play</button>
            <button>Pause</button>
            <button>Next</button>
            <div id="yt-player"></div>
        </div>
    )
}

export default Watch