import { useEffect } from 'react';
import Tts from 'react-native-tts';

interface propsData {
    AiOutput:string
}
export const RNTtsExample : React.FC<propsData> = ({AiOutput}) =>{

    useEffect(()=>{
      console.log(AiOutput, "<<<<< in component");

        Tts.getInitStatus().then(() => {
            Tts.speak(AiOutput);
          });        console.log("initiatedr");
        
    },[])
    return (
        <>
        </>
    )
}