import { useEffect } from "react"
import axios from "axios"
import { Audio } from 'expo-av';
import {File,Paths} from "expo-file-system/next"

export default function PlayHTExample() {
    useEffect(() => {
        initPlayHT()
    }, [])
    const PLAYHT_API_URL = 'https://play.ht/api/v2/tts/stream';
    const PLAYHT_API_KEY = '08269a1c90454aff812add01144f3864';  // Replace with your API key
    const PLAYHT_USER_ID = 'WYiOfNngEhWT000m2NZpHn5M6Dp2';
    const playAudio = async (audioUrl) => {
        try {
            const soundInit = new Audio.Sound()
   
            
            const sound = await soundInit.loadAsync({uri:audioUrl, shouldPlay:true})
            console.log(sound, "<<<<");
            
            await sound.playAsync()
        } catch (error) {
            console.log(error, "<<<<<<< error play");
        }
    }
    const initPlayHT = async () => {
        try {
            console.log(PLAYHT_API_URL, PLAYHT_API_KEY, PLAYHT_USER_ID);

            const { data } = await axios({
                url: PLAYHT_API_URL,
                headers: {
                    accept: 'audio/mpeg',
                    AUTHORIZATION: PLAYHT_API_KEY,
                    'X-USER-ID': PLAYHT_USER_ID
                },
                method: "post",
                data: {
                    voice: "s3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json",
                    text: "Hello Human",
                     output_format: 'mp3',
                }
            })

            global.Buffer = require('buffer').Buffer;

            const mp3Bytes = Uint8Array.from([data]);
            const base64String = global.Buffer.from(mp3Bytes).toString('base64');
            
           const file = new File(Paths.cache, "test.wav")
            file.create()
            file.write(data)
            let test = file.size
            console.log(test, "<<< test");
            
            // const mp3Bytes = Uint8Array.from([data]);
            // const mp3Blob = new Blob([mp3Bytes], { type: 'audio/mpeg' });
            // const mp3Url = URL.createObjectURL(mp3Blob);
            await playAudio(file.uri)
            console.log("after save");
            
        } catch (error) {
            console.log(error, "<<<<ERROR test");
        }

    }

    return (
        <>

        </>
    )
}