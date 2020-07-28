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
          <Text style={styles.heading}> Sign In</Text>
          <View container={styles.formContainer}>
            <Input
              placeholder="Username"
              placeholderTextColor={baseColor.grey}
              inputStyle={{
                color: baseColor.white,
                fontFamily: baseFont.nunito.regular,
                fontSize: 16,
              }}
              inputContainerStyle={styles.inputContainer}
              leftIcon={{
                type: 'font-awesome',
                name: 'user',
                color: baseColor.grey,
              }}
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
              leftIcon={{
                type: 'font-awesome',
                name: 'lock',
                color: baseColor.grey,
              }}
            />
          </View>
          <View style={styles.forgot}>
            <CheckBox
              title="Remember Me"
              containerStyle={styles.checkboxContainer}
              textStyle={styles.checkboxTextStyle}
              checkedColor={baseColor.purple}
              checked={this.state.checked}
            />
            <Button
              title="Forgot Password?"
              type="clear"
              titleStyle={styles.forgotPassword}
              onPress={() => alert('forgot password')}
            />
          </View>
          <Button
            title="Sign In"
            containerStyle={styles.btnSignContainer}
            buttonStyle={styles.btnSign}
            titleStyle={styles.btnTitleStyles}
            onPress={() => this.props.navigation.navigate('AppNavigator')}
          />
          <View style={styles.bottomContent}>
            <Text style={styles.terms}>Don't have an account? </Text>
            <Button
              title="Create new one"
              type="clear"
              buttonStyle={{alignSelf: 'center'}}
              titleStyle={{color: baseColor.purple}}
              onPress={() => this.props.navigation.navigate('Register')}
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
    marginTop: -90,
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
    marginBottom: -10,
  },
  forgot: {
    marginTop: -10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxContainer: {
    backgroundColor: baseColor.dark,
    borderWidth: 0,
  },
  checkboxTextStyle: {
    color: baseColor.grey,
  },
  forgotPassword: {
    color: baseColor.white,
    fontFamily: baseFont.roboto.regular,
    fontSize: 14,
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
    bottom: -100,
    // height: 40,
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
