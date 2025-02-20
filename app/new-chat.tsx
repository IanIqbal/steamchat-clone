import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NewChat() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Chat</Text>
      {/* Add more components for your new chat page here */}
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
});
