import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Image, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { baseColor } from '../../../styles/baseColor';
import { baseFont } from '../../../styles/baseFont';
// import {API_URL} from '@env';
import { config } from '../../../config/baseUrl';

import { connect } from 'react-redux';
import { getUsersById } from '../../../config/redux/actions/users';

class FriendProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [] || this.props.users.data[0],
      isFriend: false,
    };
  }

  getFriend = async () => {
    const token = this.props.auth.data.token;
    const id = this.props.route.params.id;

    await this.props
      .getUsersById(token, id)
      .then(async (response) => {
        await this.setState({
          friends: response.value.data.data[0],
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // checkFriend = () => {

  // }

  // addFriend = async () => {

  // }

  componentDidMount() {
    this.getFriend();
    // this.checkFriend();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Text style={styles.heading}>
            {/* Profile */}
            <Button
              type="clear"
              icon={<Icon name="plus" size={15} color="white" />}
              title="Add Friend"
              titleStyle={styles.logout}
              onPress={() => alert('ok')}
            />
          </Text>
        </View>
        <View style={styles.profile}>
          <Image
            source={{
              uri: `${config.baseUrl}/images/${this.state.friends.image}`,
            }}
            style={styles.image}
          />
          <Text style={styles.username}>{this.state.friends.username}</Text>
          <Text style={styles.name}>{this.state.friends.fullname}</Text>
          <Button
            type="clear"
            title="Show Location"
            icon={
              <Icon name="map-marker" size={20} color={baseColor.lightgreen} />
            }
            titleStyle={{
              color: baseColor.lightgreen,
              fontFamily: baseFont.roboto.bold,
              paddingLeft: 5,
              textDecorationLine: 'underline',
            }}
            onPress={() => this.props.navigation.push('UserMaps')}
          />
        </View>
        <Button
          title="SEND MESSAGE"
          icon={<Icon name="envelope" size={20} color={baseColor.black} />}
          buttonStyle={{ marginTop: 20, backgroundColor: baseColor.purple }}
          titleStyle={{
            color: baseColor.black,
            fontFamily: baseFont.roboto.bold,
            paddingLeft: 5,
          }}
          onPress={() =>
            this.props.navigation.navigate('PersonalChat', {
              id: this.state.friends.id,
            })
          }
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
  username: {
    fontSize: 16,
    fontFamily: baseFont.roboto.regular,
    fontStyle: 'italic',
    color: baseColor.grey,
    alignSelf: 'center',
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
  contact: state.contact,
});

const mapDispatchToProps = { getUsersById };

export default connect(mapStateToProps, mapDispatchToProps)(FriendProfile);
