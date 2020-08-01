import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Image, Button} from 'react-native-elements';
import {baseColor} from '../../../styles/baseColor';
import {baseFont} from '../../../styles/baseFont';
import {BASE_API_URL} from '@env';

import {connect} from 'react-redux';
import {getUsersById} from '../../../config/redux/actions/users';
import {logout} from '../../../config/redux/actions/auth';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  getUsers = async () => {
    const token = this.props.auth.data.token;
    const id = this.props.auth.data.id;

    await this.props
      .getUsersById(token, id)
      .then((response) => {
        this.setState({
          users: response.value.data.data[0],
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  componentDidMount() {
    this.getUsers();
  }

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Text style={styles.heading}>Profile</Text>
          <Button
            type="clear"
            title="Sign Out"
            titleStyle={styles.logout}
            onPress={this.handleLogout}
          />
        </View>
        <View style={styles.profile}>
          <Image
            source={{uri: `${BASE_API_URL}/images/${this.state.users.image}`}}
            style={styles.image}
          />
          <Text style={styles.name}>{this.state.users.fullname}</Text>
          {/* <Text style={styles.map}>{this.state.users.map}</Text> */}
        </View>
        <Button
          title="Edit Profile"
          buttonStyle={{marginTop: 20, backgroundColor: baseColor.purple}}
          titleStyle={{
            color: baseColor.white,
            fontFamily: baseFont.roboto.bold,
          }}
          onPress={() => this.props.navigation.push('EditProfile')}
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {getUsersById, logout};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
