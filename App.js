import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/redux/store';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View} from 'react-native';

import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn';
import Home from './src/screens/Home';
import Home2 from './src/screens/Home2';

const Stack = createNativeStackNavigator();
const MainTab = createMaterialTopTabNavigator();

const StartUpStackNavigator = props => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};

// const MainTabNavigator = props => {

//   return (
//     <MainTab.Navigator
//       initialRouteName="Chats"
//       tabBarOptions={{
//         activeTintColor: '#fff',
//         style: {
//           backgroundColor: Colors[colorScheme].tint,
//         },
//         indicatorStyle: {
//           backgroundColor: Colors[colorScheme].background,
//           height: 4,
//         },
//         labelStyle: {
//           fontWeight: 'bold'
//         },
//         showIcon: true,
//       }}>
//       <MainTab.Screen
//         name="Camera"
//         component={TabOneNavigator}
//         options={{
//           tabBarIcon: ({ color }) => <Fontisto name="camera" color={color} size={18} />,
//           tabBarLabel: () => null
//         }}
//       />
//       <MainTab.Screen
//         name="Chats"
//         component={ChatsScreen}
//       />
//       <MainTab.Screen
//         name="Status"
//         component={TabTwoNavigator}
//       />
//       <MainTab.Screen
//         name="Calls"
//         component={TabTwoNavigator}
//       />
//     </MainTab.Navigator>
//   );
// }


const ChatStackNavigator = props => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: "#B983FF",
      },
      headerTintColor: "#fff",
      headerTitleAlign: "left",
      headerTitleStyle: {
        fontWeight:"bold",
      }
      }}>
      <Stack.Screen name="Home" component={Home} 
       options={{ 
         title:"ChatterBox",
         headerRight: () => (
          <View style={{
            flexDirection: 'row',
            width: 60,
            justifyContent: 'space-between',
            marginRight: 10,
          }}>
            <MaterialCommunityIcons name="magnify" size={22} color={'white'} />
            <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'} />
          </View>
         )
       }}/>
    </Stack.Navigator>
  );
};

const AppNavigator = () => {

  const users = useSelector(state => state.chatuser.users);
  const user = users.find(user => user.isLogin === true);

  return (
    <NavigationContainer>
        {
          (user === undefined) ?
          <StartUpStackNavigator /> :
          <ChatStackNavigator />
        }
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigator/>
      </PersistGate>
    </Provider>
  );
};

export default App;
