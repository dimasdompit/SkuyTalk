import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Header, Button, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {baseColor} from '../../../styles/baseColor';
import {baseFont} from '../../../styles/baseFont';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

const ButtonBack = ({onPress}) => {
  return (
    <Button
      buttonStyle={{backgroundColor: baseColor.dark}}
      icon={<Icon name="arrow-left" size={15} color={baseColor.white} />}
      onPress={onPress}
    />
  );
};

const Friends = (props) => {
  return (
    <TouchableNativeFeedback
      onPress={props.onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={{uri: props.image}}
        style={{height: 50, width: 50, borderRadius: 50}}
      />
      <Text
        style={{
          marginLeft: 10,
          fontFamily: baseFont.roboto.bold,
          color: baseColor.white,
          fontSize: 18,
        }}>
        {props.name}
      </Text>
    </TouchableNativeFeedback>
  );
};

export class PersonalChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          id: 1,
          image: `https://1.bp.blogspot.com/-SVIVQu7cH1U/XLu0gg-XbHI/AAAAAAAAN6E/u-Rsd-kSYekcWR0IpbHeyUWW4aJ5LM1PQCLcBGAs/s2560/pubg-4k-game-sw-2048x2048.jpg`,
          senderName: `Dimas Mokodompit`,
        },
      ],
    };
  }
  render() {
    return (
      <>
        <Header
          placement="left"
          backgroundColor={baseColor.dark}
          leftComponent={
            <ButtonBack onPress={() => this.props.navigation.goBack()} />
          }
          centerComponent={
            <Friends
              image={this.state.users[0].image}
              name={this.state.users[0].senderName}
              onPress={() => alert('Friends Profile')}
            />
          }
        />
        <View style={styles.container}>
          <View style={styles.senderContainer}>
            <Text style={styles.senderContent}>
              Halo lagi apa lo?fjiejfiejfiefjei
            </Text>
            <Text style={styles.senderDate}>12.00</Text>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseColor.darkGrey,
    paddingHorizontal: 5,
  },
  senderContainer: {
    // flex: 1,
    flexGrow: 1,
    padding: 10,
    marginVertical: 10,
    backgroundColor: baseColor.black,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    // maxWidth: moderateScale(250, 2),
    // maxHeight:
  },
  senderContent: {
    color: baseColor.white,
  },
});

export default PersonalChat;
