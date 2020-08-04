import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Image, Button} from 'react-native-elements';
import {baseColor} from '../../../styles/baseColor';
import {baseFont} from '../../../styles/baseFont';
import ImagePicker from 'react-native-image-picker';
import {withNavigation} from '@react-navigation/compat';
import {showMessage} from 'react-native-flash-message';
// import {BASE_API_URL} from '@env';
import {config} from '../../../config/baseUrl';

import {connect} from 'react-redux';
import {getUsersById, putUsers} from '../../../config/redux/actions/users';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      fullname: '',
      email: '',
    };
  }

  getUsers = async () => {
    const token = this.props.auth.data.token;
    const id = this.props.auth.data.id;

    this.props
      .getUsersById(token, id)
      .then((response) => {
        this.setState({
          image: response.value.data.data[0].image,
          fullname: response.value.data.data[0].fullname,
          email: response.value.data.data[0].email,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  componentDidMount() {
    this.getUsers();
  }

  handleChooseImage = () => {
    const options = {
      noData: true,
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        this.setState({image: response});
      }
      console.log(response.uri);
    });
  };

  handlePutProfile = async () => {
    const token = this.props.auth.data.token;
    const id = this.props.auth.data.id;

    let formData = new FormData();
    formData.append('fullname', this.state.fullname);
    formData.append('email', this.state.email);
    formData.append('image', {
      uri: this.state.image.uri,
      type: this.state.image.type,
      name: this.state.image.fileName,
    });

    await this.props
      .putUsers(token, id, formData)
      .then((response) => {
        this.props.getUsersById(token, id);
        console.log(response);
        showMessage({
          message: 'Edit Profile Success',
          duration: 3000,
          type: 'default',
          icon: 'success',
          backgroundColor: baseColor.lightgreen,
          color: baseColor.black,
        });
        setTimeout(() => {
          this.props.navigation.replace('Profile');
        }, 3000);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  render() {
    const {image} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          {image && (
            <Image
              source={{
                uri: image.uri || `${config.baseUrl}/images/${image}`,
              }}
              style={{height: 200, width: 200, alignSelf: 'center'}}
            />
          )}
          <Button
            title="Choose Image"
            buttonStyle={{
              backgroundColor: baseColor.grey,
              width: 200,
              alignSelf: 'center',
              marginTop: 10,
            }}
            onPress={this.handleChooseImage}
          />
          <Input
            label="Full Name"
            labelStyle={{bottom: -15, textAlign: 'center'}}
            placeholder="Enter your name..."
            placeholderTextColor={baseColor.grey}
            inputStyle={{
              color: baseColor.white,
              fontFamily: baseFont.nunito.regular,
              fontSize: 16,
              textAlign: 'center',
            }}
            inputContainerStyle={styles.inputContainer}
            value={this.state.fullname}
            onChangeText={(text) => this.setState({fullname: text})}
          />
          <Input
            label="Email"
            labelStyle={{bottom: -15, textAlign: 'center'}}
            placeholder="Enter your email..."
            placeholderTextColor={baseColor.grey}
            inputStyle={{
              color: baseColor.white,
              fontFamily: baseFont.nunito.regular,
              fontSize: 16,
              textAlign: 'center',
            }}
            inputContainerStyle={styles.inputContainer}
            value={this.state.email}
            onChangeText={(text) => this.setState({email: text})}
          />
          <Button
            title="Save"
            buttonStyle={{
              backgroundColor: baseColor.purple,
              width: 300,
            }}
            onPress={this.handlePutProfile}
          />
          <Button
            title="Back to Profile"
            buttonStyle={{
              backgroundColor: baseColor.grey,
              width: 300,
              marginTop: 20,
            }}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
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
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: baseColor.darkGrey,
    borderRadius: 50,
    paddingHorizontal: 20,
    backgroundColor: baseColor.darkGrey,
    color: baseColor.white,
    fontFamily: baseFont.nunito.regular,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

const mapDispatchToProps = {getUsersById, putUsers};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(EditProfile));
