import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

export default function TabThree (){
    return (
        <View style={styles.main} >
            <Text style={styles.midTitle} >
                This is Tab Three
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },

    midTitle:{
        fontSize:40
    }
})