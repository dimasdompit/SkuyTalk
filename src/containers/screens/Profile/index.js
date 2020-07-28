import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Image, Button} from 'react-native-elements';
import {baseColor} from '../../../styles/baseColor';
import {baseFont} from '../../../styles/baseFont';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          id: 1,
          image:
            'https://vignette.wikia.nocookie.net/kiminonawa/images/6/68/Mitsuha_Miyamizu_2022.png/revision/latest/scale-to-width-down/340?cb=20181114193911',
          senderName: 'Farhana Isabella',
          map: `Jakarta, Indonesia`,
        },
      ],
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Text style={styles.heading}>Profile</Text>
          <Button
            type="clear"
            title="Sign Out"
            titleStyle={styles.logout}
            onPress={() => alert('Button Logout')}
          />
        </View>
        <View style={styles.profile}>
          <Image
            source={{uri: this.state.users[0].image}}
            style={styles.image}
          />
          <Text style={styles.name}>{this.state.users[0].senderName}</Text>
          <Text style={styles.map}>{this.state.users[0].map}</Text>
        </View>
        <Button
          title="Edit Profile"
          buttonStyle={{marginTop: 20, backgroundColor: baseColor.purple}}
          titleStyle={{
            color: baseColor.white,
            fontFamily: baseFont.roboto.bold,
          }}
          onPress={() => alert('Button Edit')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseColor.dark,
    padding: 20,
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 25,
    fontFamily: baseFont.roboto.bold,
    color: baseColor.white,
    marginBottom: 100,
  },
  logout: {
    fontFamily: baseFont.roboto.bold,
    color: baseColor.purple,
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 170,
    width: 170,
    borderRadius: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontFamily: baseFont.roboto.bold,
    color: baseColor.white,
    alignSelf: 'center',
  },
  map: {
    fontFamily: baseFont.roboto.regular,
    color: baseColor.grey,
    alignSelf: 'center',
  },
});

export default Profile;
