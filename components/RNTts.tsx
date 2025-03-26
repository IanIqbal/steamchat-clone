import { useEffect } from 'react';
import Tts from 'react-native-tts';

interface propsData {
    AiOutput:string,
    changeFetchStatus:(newStatus:boolean) => void
}
export const RNTtsExample : React.FC<propsData> = ({AiOutput, changeFetchStatus}) =>{

    useEffect(()=>{
      console.log(AiOutput, "<<<<< in component");

        Tts.getInitStatus().then(() => {
            Tts.speak(AiOutput);
            changeFetchStatus(false)
          });        console.log("initiatedr");
        
    },[])
    return (
        <>
        </>
    )
}