import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Input, CheckBox, Button} from 'react-native-elements';
import {baseColor} from '../../../styles/baseColor';
import {baseFont} from '../../../styles/baseFont';
import Logo from '../../../assets/images/skuytalk-logo.png';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
  }

  handleCheckbox = (e) => {
    this.setState({
      checked: true,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContent}>
          <View style={styles.logo}>
            <Image
              source={Logo}
              style={{
                height: 200,
                width: 200,
                alignSelf: 'center',
              }}
            />
          </View>
          <Text style={styles.heading}> Sign Up</Text>
          <View container={styles.formContainer}>
            <Input
              placeholder="Fullname"
              placeholderTextColor={baseColor.grey}
              inputStyle={{
                color: baseColor.white,
                fontFamily: baseFont.nunito.regular,
                fontSize: 16,
              }}
              inputContainerStyle={styles.inputContainer}
            />
            <Input
              placeholder="Email Address"
              placeholderTextColor={baseColor.grey}
              inputStyle={{
                color: baseColor.white,
                fontFamily: baseFont.nunito.regular,
                fontSize: 16,
              }}
              inputContainerStyle={styles.inputContainer}
            />
            <Input
              placeholder="Username"
              placeholderTextColor={baseColor.grey}
              inputStyle={{
                color: baseColor.white,
                fontFamily: baseFont.nunito.regular,
                fontSize: 16,
              }}
              inputContainerStyle={styles.inputContainer}
            />
            <Input
              placeholder="Password"
              placeholderTextColor={baseColor.grey}
              inputStyle={{
                color: baseColor.white,
                fontFamily: baseFont.nunito.regular,
                fontSize: 16,
              }}
              inputContainerStyle={styles.inputContainer}
              secureTextEntry
            />
          </View>
          <View style={{justifyContent: 'center', marginTop: 10}}>
            <Text
              style={{
                color: baseColor.white,
                textAlign: 'center',
                fontFamily: baseFont.roboto.bold,
              }}>
              By signing up you accept the{' '}
              <Text
                style={{
                  color: baseColor.purple,
                  textDecorationLine: 'underline',
                }}>
                Terms of service
              </Text>{' '}
              and
              <Text
                style={{
                  color: baseColor.purple,
                  textDecorationLine: 'underline',
                }}>
                {' '}
                Privacy Policy
              </Text>
            </Text>
          </View>
          <Button
            title="Sign Up"
            containerStyle={styles.btnSignContainer}
            buttonStyle={styles.btnSign}
            titleStyle={styles.btnTitleStyles}
            onPress={() => alert('sign up button')}
          />
          <View style={styles.bottomContent}>
            <Text style={styles.terms}>Already have an account? </Text>
            <Button
              title="Sign In"
              type="clear"
              buttonStyle={{alignSelf: 'center'}}
              titleStyle={{color: baseColor.purple}}
              onPress={() => this.props.navigation.navigate('Login')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseColor.dark,
    padding: 30,
  },
  logo: {
    marginTop: 0,
  },
  topContent: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    color: baseColor.white,
    fontFamily: baseFont.roboto.black,
    fontSize: 28,
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: baseColor.darkGrey,
    borderRadius: 50,
    paddingHorizontal: 20,
    backgroundColor: baseColor.darkGrey,
    color: baseColor.white,
    fontFamily: baseFont.nunito.regular,
    marginBottom: -15,
  },

  btnSignContainer: {
    borderRadius: 100,
    marginTop: 15,
  },
  btnSign: {
    backgroundColor: baseColor.purple,
  },
  btnTitleStyles: {
    color: baseColor.dark,
    fontSize: 18,
    fontFamily: baseFont.roboto.bold,
  },
  bottomContent: {
    bottom: -5,
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  terms: {
    alignSelf: 'center',
    color: baseColor.white,
    fontFamily: baseFont.roboto.bold,
  },
});

export default Login;
