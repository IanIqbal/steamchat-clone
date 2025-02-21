import React from 'react';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, View } from '@/components/Themed';

// Interface for chat item
interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
}

// Mock data for the chat list
const chatData: ChatItem[] = [
  {
    id: '1',
    name: 'John Doe',
    lastMessage: 'Hey, how are you?',
    time: '10:30 AM',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Jane Smith',
    lastMessage: 'See you later!',
    time: 'Yesterday',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  // Add more mock data as needed
];

const ChatRow: React.FC<{ item: ChatItem }> = ({ item }) => (
  <View style={styles.chatRow}>
    <Image source={{ uri: item.avatar }} style={styles.avatar} />
    <View style={styles.chatInfo}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.lastMessage}>{item.lastMessage}</Text>
    </View>
    <Text style={styles.time}>{item.time}</Text>
  </View>
);

export default function TabThree() {
  return (
    <View style={styles.container}>
      <FlatList
        data={chatData}
        renderItem={({ item }) => <ChatRow item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatRow: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lastMessage: {
    fontSize: 14,
    color: '#888',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
});
