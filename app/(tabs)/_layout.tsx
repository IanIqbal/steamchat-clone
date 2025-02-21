import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, Link } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function Header() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <FontAwesome name="bars" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Drain</Text>
      <Link href={{ pathname:"/new-chat" }}asChild>
        <TouchableOpacity>
          <FontAwesome name="plus" size={24} color="black" />
        </TouchableOpacity>
      </Link>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          {/* Add your modal content here */}
          <TouchableOpacity onPress={() => 
          setModalVisible(false)}>
            <Text style={{marginTop:20}} >Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Header />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Tab One',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: 'Tab Two',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name='three'
          options={{
            title: "Tab Three",
            tabBarIcon: ({ color }) => <TabBarIcon name="comments" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,  // Increased overall padding
    paddingTop: 50,  // Increased top padding for status bar
    paddingHorizontal: 24,  // Added extra horizontal padding
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Arial-BoldMT', // You might want to use a custom font here
  },
  modalView: {
    width: '60%',
    height: '100%',
    backgroundColor: 'white',
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});
