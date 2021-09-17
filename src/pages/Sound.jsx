import React, { useEffect, useState } from 'react'

function Sound(props) {
    /**
     * Denna props.match.params.id kan antingen vara song.videoId eller playList.browseId
     * song.videoId är en låt och playList.browseId är en spellista.
    */
    const { id } = props.match.params
    console.log(props)

    /** 
     * Ternary : en låt (videoId) har ca 12 i längd. browseId har mer än 30 längd.
     *  Om längden är mindre än 20 är det en låt annars är det en playlista.
    */

    const type = id.length > 20 ? "playlist" : "song";
    let playList = []
    //const [playlist, setPlayList] = useState([id]); // Denna ska vara en lista med strängar
    // const [playlistIndex, setPlaylistIndex] = useState(0);
    // const [ready, setReady] = useState(false);

    async function getPlaylist() {
        let herokuappAPI = "https://yt-music-api.herokuapp.com/api/yt/playlist/"
        let result = await fetch(herokuappAPI + id)
        const data = await result.json();
        const { content } = data

        // om det är en play list sparar vi allt i useState.
        // const playList = content.map((videoId) => videoId.videoId)
        // return playList;
        playList.push(content.map((videoId) => videoId.videoId))

    } 

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

    /* När jag klickar på knapparna play/stop -> next
    *  så körs denna methoden, validerar vilen av funktionerna som ska köras.
    */
    const handleActions = (action) => {
        if (!player) return
        if (type === "playlist") {
            getPlaylist()
            loadSong()
        }

        if (action === "play") return player.playVideo()
        if (action === "pause") return player.pauseVideo()
    }

    // Om vi är på index 0, ladda index 1
    const loadSong = () => {
        if (!player) return
        for(let i = 0; i <= playList.length; i++){
            console.log(playList)
        }
        
    } 
    
    // kör useEffect direkt vid inladdning.
    useEffect(() => {
        onYouTubeIframeAPIReady()
    }, [])

     // Jag vill kunna dela en låt på en länk
    const linkSoung = () => {

        const copyText = "http://localhost:3000"+ props.location.pathname
        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText);

        /* Alert the copied text */
        alert("Copied the text: " + copyText);
    }

    return (
        <div className="soud-player-buttun-container">
            <button className="soud-player-button" onClick={() => handleActions("play")}>Play</button>
            <button className="soud-player-button" onClick={() => handleActions("pause")}>Pause</button>
            <button className="soud-player-button">Next</button>
            <div id="yt-player"></div>
            <button className="sound-share-link" onClick={() => linkSoung()}>Share link</button>
        </div>
    )
}

export default Sound
