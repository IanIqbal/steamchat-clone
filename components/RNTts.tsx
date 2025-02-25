import { useEffect } from 'react';
import Tts from 'react-native-tts';


export const RNTtsExample = () =>{

    useEffect(()=>{
        Tts.getInitStatus().then(() => {
            Tts.speak('Hello, world!');
          });        console.log("initiatedr");
        
    },[])
    return (
        <>
        </>
    )
}