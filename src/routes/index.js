import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Fontawesome from 'react-native-vector-icons/FontAwesome';
import {
  Login,
  Register,
  Chat,
  Friendlist,
  Profile,
  PersonalChat,
  FriendProfile,
} from '../containers/screens/index';
import {baseColor} from '../styles/baseColor';
import {baseFont} from '../styles/baseFont';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ChatTab = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: baseColor.purple,
        activeBackgroundColor: baseColor.dark,
        inactiveBackgroundColor: baseColor.darkGrey,
        labelStyle: {fontFamily: baseFont.roboto.bold},
      }}>
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({color, size}) => (
            <Fontawesome name="comment" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Friendlist"
        component={Friendlist}
        options={{
          tabBarLabel: 'Friendlist',
          tabBarIcon: ({color, size}) => (
            <Fontawesome name="users" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Fontawesome name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatTab"
        component={ChatTab}
        options={{headerShown: false, headerBackground: baseColor.dark}}
      />
      <Stack.Screen
        name="PersonalChat"
        component={PersonalChat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FriendProfile"
        component={FriendProfile}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const RootContainers = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AppNavigator"
        component={AppNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootContainers;
