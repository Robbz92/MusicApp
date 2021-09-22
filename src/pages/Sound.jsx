import React, { useEffect, useState, useRef } from 'react'

function Sound(props) {
    /**
     * Denna props.match.params.id kan antingen vara song.videoId eller playList.browseId
     * song.videoId är en låt och playList.browseId är en spellista.
    */

    let id = ""
    let browseId = ""
    let player = useRef(null); // används som en variabel som behåller värdet vid varje rendering.
    console.log(props)

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")

    /** 
     * Ternary : en låt (videoId) har ca 12 i längd. browseId har mer än 30 längd.
     *  Om längden är mindre än 20 är det en låt annars är det en playlista.
    */

    const type = props.match.params.id.length > 20 ? "playlist" : "song";

    if (type === "song") {
        id = props.match.params.id
    }
    if (type === "playlist") {
        browseId = props.match.params.id
        browseId = browseId.slice(2) // tar bort första 2 chars för att få fram rätt spellista.
    }

    // gets called automatically when YouTube player loads
    function onYouTubeIframeAPIReady() {
        console.log(id)
        player.current = new YT.Player('yt-player', {
            height: '0',
            width: '0',
            videoId: id,
            playerVars: isPlayList(),
            events: {
                'onStateChange': onPlayerStateChange,
            }
        });
    }

    /**
     * Denna funktionen returnerar playerlist med browseId ifall id (songId) inte är null.
     * Ifall id är mindre än 1 såfall är det en playlist. Då ska test objektet returneras.
     */
    function isPlayList() {
        if (id.length > 1) return

        const playListObject = {
            autoplay: 1,
            listType: 'playlist',
            list: browseId
        }

        return playListObject
    }

    // this function triggers when we change song in player
    // can be used to update things, like counters
    function onPlayerStateChange(event) {
        console.log(player)
         const { author, title } = player.current.getVideoData()

        setTitle(title)
        setAuthor(author)

        if (event.data != YT.PlayerState.PLAYING) return
    }

    /* När jag klickar på knapparna play/stop -> next
    *  så körs denna methoden, validerar vilen av funktionerna som ska köras.
    */
    const handleActions = (action) => {
        if (!player) return

        if (action === "play" && type === "song") return player.current.playVideo()
        else if (action === "pause") return player.current.pauseVideo()

        else if (action === "play" && type === "playlist") {
            player.current.loadPlaylist(browseId)
            player.current.playVideo()
        }

        else if (action === "next" && type === "playlist") {
            player.current.nextVideo()
        }

        else if (action === "previous" && type === "playlist") {
            player.current.previousVideo()
        }
    }

    // kör useEffect direkt vid inladdning.
    useEffect(() => {
        onYouTubeIframeAPIReady()

    }, [])

    // delar en låt på en länk
    const linkSoung = () => {

        const copyText = "http://localhost:3000" + props.location.pathname

        // lagrar pathen samt id i clipboard
        navigator.clipboard.writeText(copyText);

        // Bekräftar länken
        alert("Copied the text: " + copyText);
    }

    return (

        <div className="soud-player-buttun-container">
            <h2>{title}</h2>
            <button className="soud-player-button" onClick={() => handleActions("play")}>Play</button>
            <button className="soud-player-button" onClick={() => handleActions("pause")}>Pause</button>
            <button className="soud-player-button" onClick={() => handleActions("previous")}>Previous song</button>
            <button className="soud-player-button" onClick={() => handleActions("next")}>Next song</button>

            <div id="yt-player"></div>
            <button className="sound-share-link" onClick={() => linkSoung()}>Share link</button>
        </div>

    )
}

export default Sound
