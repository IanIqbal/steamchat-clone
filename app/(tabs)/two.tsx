import { StyleSheet ,TouchableOpacity} from 'react-native';
import { useState } from 'react';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
      <TouchableOpacity style={styles.button} onPress={() => console.log('Button pressed')}>
        <Text style={styles.buttonText} onPress={()=> setIsPressed(true)} >Transparent Button</Text>
      </TouchableOpacity>
    </View>


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
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginTop: 20,
  },
  buttonText: {
    color: '#007AFF',
    fontSize: 16,
  },
});
