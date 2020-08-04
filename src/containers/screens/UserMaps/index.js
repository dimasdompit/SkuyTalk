import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import MapView, {Marker} from 'react-native-maps';
import {config} from '../../../config/baseUrl';

import {connect} from 'react-redux';
import {getUsersById} from '../../../config/redux/actions/users';

export class UserMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
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
  }

  render() {
    return (
      <MapView
        style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          title="MyLocs"
          description="This is my location"
          coordinate={{latitude: 37.78825, longitude: -122.4324}}
          draggable>
          <Image
            source={{uri: `${config.baseUrl}/images/${this.state.users.image}`}}
            style={{height: 50, width: 50, borderRadius: 50}}
          />
        </Marker>
      </MapView>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

const mapDispatchToProps = {getUsersById};

export default connect(mapStateToProps, mapDispatchToProps)(UserMaps);
