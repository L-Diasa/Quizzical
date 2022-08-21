import React, { useState } from "react"

import Home from "./pages/Home"
import Quiz from "./pages/Quiz"

import useSound from "use-sound"
import game from "./sounds/game.mp3"
import toggle from "./sounds/toggle.wav"
import settings from "./sounds/settings.wav"

export default function App() {
    const [settingsOn, setSettingsOn] = useState(false)
    const [musicOn, setMusicOn] = useState(false)
    const [soundsOn, setSoundsOn] = useState(true)
    const [musicFirsOn, setMusicFirsOn] = useState(false)

    const [started, setStarted] = useState(false)
    const [quizDetails, setQuizDetails] = useState({
        category: "10",
        difficulty: "medium",
        type: "boolean"
        })

    const [playMusic, { pause }] = useSound(game, {
        loop: true,
        volume: 0.5  
    })
    const [settingsSound] = useSound(settings, {
        volume: 0.75 
    })
    const [toggleSound] = useSound(toggle, {
        volume: 0.75 
    })
    function playToggle() {
        if(soundsOn) {
            toggleSound()
        }
    }
    function playSettings() {
        if(soundsOn) {
            settingsSound()
        }
    }
    
    function handleMusicFirstStart() {
        if(!musicFirsOn) {
            toggleMusic()
        }
    }

    function handleStart(details) {
        setQuizDetails({
            category: details.category,
            difficulty: details.difficulty,
            type: details.isMulChoice ? 
                        details.isTorF ? "" : "multiple" :
                        details.isTorF ? "boolean" : ""
        })
        setStarted(true)
        return () => {
            setQuizDetails({});
        };
    }
    
    function toggleSettings() {
        setSettingsOn(prev => !prev)
        playSettings()
    }

    function toggleMusic() {
        playToggle()
        if(!musicFirsOn) {
            setMusicFirsOn(true)
        }
        setMusicOn(prev => !prev)
        if (!musicOn) {
            playMusic();
        } else {
            pause();
        }
    }

    function toggleSounds() {
        playToggle()
        setSoundsOn(prev => !prev)
    }

    return (
        <main>
            <div className="settings">
                <div className={`settings-togglers ${settingsOn ? "" : "hidden"}`}>
                    <div onClick={toggleMusic}>
                        <i 
                            aria-hidden="true" 
                            className={`${ musicOn ? "music" : "dont"} icon`}
                        ></i> Music
                    </div>
                    <div onClick={toggleSounds}>
                        <i 
                            aria-hidden="true" 
                            className={`volume ${ soundsOn ? "up" : "off"} icon`}
                        ></i> Sounds
                    </div>
                </div>
                <i 
                    aria-hidden="true" 
                    className="ellipsis horizontal icon"
                    onClick={toggleSettings}
                ></i> 
            </div>
            <div className="yellow-decor">
            </div>
            <div className="blue-decor"></div>
            {
                started ?
                <Quiz handleRestart={() => setStarted(false)}
                      quizDetails={quizDetails}
                      soundsOn={soundsOn}
                    />
                :
                <Home 
                    handleStart={handleStart} 
                    soundsOn={soundsOn}
                    handleMusicFirstStart={handleMusicFirstStart}
                /> 
            }
        </main>
    )
}