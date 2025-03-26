import { Button, StyleSheet, Text, View, Image, TouchableHighlight  } from 'react-native';
import PlayHTExample from "../../components/PlayHTExample"
import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';
import { RNTtsExample } from '@/components/RNTts';
import axios from "axios"
import { useEffect, useState } from 'react';
import Voice, {
  type SpeechRecognizedEvent,
  type SpeechResultsEvent,
  type SpeechErrorEvent,
}  from "@react-native-voice/voice"

interface dialogueRes{
    "role": string,
    "content": string,
}
export default function TabOneScreen() {
  const [dialogueOutput, setDialogueOutput] = useState("")
  const [fetchSuccess, setFetchSuccess] = useState(false)
  const [recognized, setRecognized] = useState<string>('');
  const [pitch, setPitch] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [started, setStarted] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);
  const [partialResults, setPartialResults] = useState<string[]>([]);
  const changeFetchStatus = (newStatus:boolean) =>{
    setFetchSuccess(newStatus)
  }
  const sendDialogue  = async (content:string)=>{
    try {
      console.log("send dialogue");
      
      const {data} = await axios({
        method:"post",
        url:process.env.EXPO_PUBLIC_MAIN_BASE_URL + "/open-ai",
        data:{
          content
        }
      })
      
      console.log(data.content, "<<<<< in index");
      
      const output = data.content? data.content : "this is an example of dialogue output"
      setDialogueOutput(output)
      setFetchSuccess(true)
    } catch (error) {
      console.log(JSON.stringify(error), "<<<<<< error");
      
    } 
  }
  useEffect(() =>{
    // sendDialogue()

    Voice.onSpeechStart = (e: any) => {
      console.log('onSpeechStart: ', e);
      setStarted('√');
    };

    Voice.onSpeechRecognized = (e: SpeechRecognizedEvent) => {
      console.log('onSpeechRecognized: ', e);
      setRecognized('√');
    };

    Voice.onSpeechEnd = (e: any) => {
      console.log('onSpeechEnd: ', e);
      setEnd('√');
    };

    Voice.onSpeechError = (e: SpeechErrorEvent) => {
      console.log('onSpeechError: ', e);
      setError(JSON.stringify(e.error));
    };

    Voice.onSpeechResults =  async (e: SpeechResultsEvent) => {
      console.log('onSpeechResults: ', e);

      if(e.value && e.value.length > 0){        
        setResults(e.value);
        await sendDialogue(e.value[0])
      }
    };

    Voice.onSpeechPartialResults = (e: SpeechResultsEvent) => {
      console.log('onSpeechPartialResults: ', e);
      setPartialResults(e.value && e.value.length > 0 ? e.value : []);
    };

    Voice.onSpeechVolumeChanged = (e: any) => {
      console.log('onSpeechVolumeChanged: ', e);
      setPitch(e.value);
    };

    // Cleanup listeners on unmount
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  
      return () => {
        // Remove listeners when unmounting
        Voice.destroy().then(Voice.removeAllListeners);
      };  
  }, [])
  const startRecognizing = async () => {
    // Reset state
    setRecognized('');
    setPitch('');
    setError('');
    setStarted('');
    setResults([]);
    setPartialResults([]);
    setEnd('');

    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    // Reset state
    setRecognized('');
    setPitch('');
    setError('');
    setStarted('');
    setResults([]);
    setPartialResults([]);
    setEnd('');
  };
  return (
  
    <>
   <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native Voice!</Text>
      <Text style={styles.instructions}>
        Press the button and start speaking.
      </Text>
      <Text style={styles.stat}>{`Started: ${started}`}</Text>
      <Text style={styles.stat}>{`Recognized: ${recognized}`}</Text>
      <Text style={styles.stat}>{`Pitch: ${pitch}`}</Text>
      <Text style={styles.stat}>{`Error: ${error}`}</Text>
      <Text style={styles.stat}>Results</Text>
      {results.map((result, index) => (
        <Text key={`result-${index}`} style={styles.stat}>
          {result}
        </Text>
      ))}
      <Text style={styles.stat}>Partial Results</Text>
      {partialResults.map((result, index) => (
        <Text key={`partial-result-${index}`} style={styles.stat}>
          {result}
        </Text>
      ))}
      <Text style={styles.stat}>{`End: ${end}`}</Text>
      <TouchableHighlight onPress={startRecognizing}>
        <Image style={styles.button} source={require("../../assets/images/button.png")} />
      </TouchableHighlight>
      <TouchableHighlight onPress={stopRecognizing}>
        <Text style={styles.action}>Stop Recognizing</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={cancelRecognizing}>
        <Text style={styles.action}>Cancel</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={destroyRecognizer}>
        <Text style={styles.action}>Destroy</Text>
      </TouchableHighlight>
    </View>
    { fetchSuccess && <RNTtsExample AiOutput={dialogueOutput} changeFetchStatus={changeFetchStatus} ></RNTtsExample>}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  titleVoice: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  result: {
    fontSize: 18,
    marginBottom: 40,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});
