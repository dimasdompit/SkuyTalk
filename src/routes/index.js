import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
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
  EditProfile,
  UserMaps,
} from '../containers/screens/index';
import {baseColor} from '../styles/baseColor';
import {baseFont} from '../styles/baseFont';

import {connect} from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStack = (props) => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

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
            <Fontawesome name="address-book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Fontawesome name="user" color={color} size={size} />
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
      <Stack.Screen name="FriendProfile" component={FriendProfile} />
      <Stack.Screen
        name="UserMaps"
        component={UserMaps}
        // options={{headerShown: false, headerBackground: baseColor.dark}}
      />
    </Stack.Navigator>
  );
};

const RootContainers = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {props.auth.isLoggedIn ? (
          <Stack.Screen
            name="AppNavigator"
            component={AppNavigator}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(RootContainers);
