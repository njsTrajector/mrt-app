/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import tw from 'twrnc';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Unmask from './components/login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function DetailsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
    </View>
  );
}
const NoCameraDeviceError: React.FC = () => {
  console.log('No Device Detected');
  return (
    <View>
      <Text>No Camera Device Error</Text>
    </View>
  );
};
const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  // const {hasPermission, requestPermission} = useCameraPermission();
  // const device = useCameraDevice('back');
  // const [cameraPermission, setCameraPermission] = useState(false);

  // useEffect(() => {
  //   const checkCameraPermission = async () => {
  //     const status = await requestPermission();
  //     setCameraPermission(status === true);
  //   };

  //   if (!hasPermission) {
  //     checkCameraPermission();
  //   }
  // }, [hasPermission, requestPermission]);

  // if (device == null) return <NoCameraDeviceError />;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Unmask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
