import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {config} from '../../../config/baseUrl';
import Geolocation from '@react-native-community/geolocation';

import {connect} from 'react-redux';
import {getUsersById, putUsers} from '../../../config/redux/actions/users';

const initialRegion = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export class UserMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      ready: false,
      currentPosition: initialRegion,
    };
  }

  getUsers = () => {
    const token = this.props.auth.data.token;
    const id = this.props.auth.data.id;

    this.props
      .getUsersById(token, id)
      .then((response) => this.setState({users: response.value.data.data[0]}))
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getUsers();
    Geolocation.getCurrentPosition(
      async (position) => {
        const {latitude, longitude} = position.coords;
        const token = this.props.auth.data.token;
        const id = this.props.auth.data.id;
        let formData = new FormData();
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);

        await this.props
          .putUsers(token, id, formData)
          .then(async (response) => {
            await this.setState({
              currentPosition: {
                ...this.state.currentPosition,
                latitude,
                longitude,
              },
            });
          })
          .catch((error) => console.log(error.message));
      },
      (error) => {
        console.log(error.message);
      },
      {timeout: 20000, maximumAge: 1000},
    );
  }

  render() {
    const {currentPosition} = this.state;
    return currentPosition.latitude ? (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}
        initialRegion={this.state.currentPosition}
        showsUserLocation>
        <Marker
          title={this.state.users.fullname}
          coordinate={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
          }}
          draggable>
          <Image
            source={{uri: `${config.baseUrl}/images/${this.state.users.image}`}}
            style={{height: 50, width: 50, borderRadius: 50}}
          />
        </Marker>
      </MapView>
    ) : (
      <View>
        <ActivityIndicator style={{flex: 1}} animating size="large" />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

const mapDispatchToProps = {getUsersById, putUsers};

export default connect(mapStateToProps, mapDispatchToProps)(UserMaps);
