import { StyleSheet } from 'react-native';
import PlayHTExample from "../../components/PlayHTExample"
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { RNTtsExample } from '@/components/RNTts';
import axios from "axios"
import { useEffect, useState } from 'react';

interface dialogueRes{
    "role": string,
    "content": string,
}
export default function TabOneScreen() {
  const [dialogueOutput, setDialogueOutput] = useState("")
  const [fetchSuccess, setFetchSuccess] = useState(false)
  const sendDialogue  = async ()=>{
    try {
      console.log("send dialogue");
      console.log(process.env.EXPO_PUBLIC_MAIN_BASE_URL, "<<<<<");
      
      const {data} = await axios({
        method:"post",
        url:process.env.EXPO_PUBLIC_MAIN_BASE_URL + "/open-ai",
        data:{
          content:"hello, who are you?"
        }
      })
      console.log(data, "<<<<<, data");
      
      console.log(data.content, "<<<<< in index");
      
      const output = data.content? data.content : "this is an example of dialogue output"
      setDialogueOutput(output)
      setFetchSuccess(true)
    } catch (error) {
      console.log(JSON.stringify(error), "<<<<<< error");
      
    } 
  }

  useEffect(() =>{
    sendDialogue()
  }, [])
  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>Tab One</Text>
    //   <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    //   <EditScreenInfo path="app/(tabs)/index.tsx" />
    // </View>
    <>
    {/* <PlayHTExample>

    </PlayHTExample> */}
    { fetchSuccess && <RNTtsExample AiOutput={dialogueOutput} ></RNTtsExample>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
