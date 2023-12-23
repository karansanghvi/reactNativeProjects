import { Image, SafeAreaView, Text, View } from "react-native";
import { themeColors } from "../theme";
import { TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native'


function WelcomeScreen() {

    const navigation = useNavigation();

    return (
        <SafeAreaView 
            className="flex-1"
            style={{backgroundColor: themeColors.bg}}
        >
            <View className="flex-1 flex justify-around my-4">
                <Text className="text-white font-bold text-4xl text-center">
                    Let's Get Started
                </Text>
                <View className="flex-row justify-center">
                    <Image
                        source={require('../assets/images/welcome.png')}
                        style={{width: 350, height: 350}}
                    />
                </View>
                <View className="space-y-4">
                    <TouchableOpacity 
                        className="py-3 bg-yellow-400 mx-7 rounded-xl"
                        onPress={() => navigation.navigate('SignUp')}
                    >
                        <Text className="text-xl font-bold text-center text-gray-700">
                            Sign Up
                        </Text>
                    </TouchableOpacity>  
                    <View className="flex-row justify-center">
                        <Text className="text-white font-semibold">Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text className="font-semibold text-yellow-400"> Log In</Text>
                        </TouchableOpacity>
                    </View>      
                </View>
            </View>
        </SafeAreaView>
    );
}

export default WelcomeScreen;