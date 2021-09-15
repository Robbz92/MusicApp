import React, { useState, useEffect } from 'react'

function Watch(props) {
    /* props.match.params.id == :id från /watch/:id */
    // accessible variable for calling player functions

    let player;

    // gets called automatically when YouTube player loads
    function onYouTubeIframeAPIReady(id) {
        player = new YT.Player('yt-player', {
            height: '300',
            width: '400',
            videoId: id,
            events: {
                'onStateChange': onPlayerStateChange,
                'onReady': onPlayerReady,
            }
        });
    }

    // this function triggers when we change song in player
    // can be used to update things, like counters
    function onPlayerStateChange(event) {
        if (event.data != YT.PlayerState.PLAYING) return
    }

    function onPlayerReady(id) {
        console.log("My plaer is onReady");
        player.playVideo()
    }

    function playSongTrack(id){
        console.log("Hey " + id)
        onYouTubeIframeAPIReady(id)
    }

    return (
        <div className="playMusic">
            <div id="yt-player"></div>

            {props.data.map((item, index) => (
                <li key={index}>
                    <p>{item.type} : {item.name}</p>
                    <p>{item.videoId}</p>

                    <button onClick={playSongTrack(item.videoId)}>Play</button>
                    <button >Pause</button>
                    <button>Next</button>
                </li>
            ))}
        </div>
    )
}

export default Watch