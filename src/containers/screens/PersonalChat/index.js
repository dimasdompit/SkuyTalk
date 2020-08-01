import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {Header, Button, Image, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {baseColor} from '../../../styles/baseColor';
import {baseFont} from '../../../styles/baseFont';
import {moderateScale} from 'react-native-size-matters';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {API_URL} from '@env';

import {connect} from 'react-redux';
import {getUsersById} from '../../../config/redux/actions/users';
import {showAllChats} from '../../../config/redux/actions/chat';

// EXTERNAL COMPONENTS
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
        source={{uri: `${API_URL}/images/${props.image}`}}
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

const SenderBalloon = (props) => {
  return (
    <View style={[styles.item, styles.itemIn]}>
      <TouchableOpacity
        onLongPress={props.onLongPress}
        style={[styles.senderBalloon, {backgroundColor: baseColor.black}]}>
        <Text style={styles.senderContent}>{props.message}</Text>
        <Text style={styles.senderDate}>{props.date}</Text>
      </TouchableOpacity>
    </View>
  );
};

const ReceiverBalloon = (props) => {
  return (
    <View style={[styles.item, styles.itemOut]}>
      <TouchableOpacity
        onLongPress={props.onLongPress}
        style={[styles.receiverBalloon, {backgroundColor: baseColor.purple}]}>
        <Text style={styles.receiverContent}>{props.message}</Text>
        <Text style={styles.receiverDate}>{props.date}</Text>
      </TouchableOpacity>
    </View>
  );
};

// MAIN COMPONENT
export class PersonalChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      chats: [],
    };
  }

  getUsers = async () => {
    const token = this.props.auth.data.token;
    const id = this.props.auth.data.id;

    await this.props
      .getUsersById(token, id)
      .then((response) => {
        this.setState({
          users: this.props.users.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  showChats = async () => {
    const token = this.props.auth.data.token;

    await this.props
      .showAllChats(token)
      .then((response) => {
        this.setState({
          chats: this.props.chat.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  componentDidMount() {
    this.getUsers();
    this.showChats();
  }

  render() {
    console.log(this.state.users);
    return (
      <>
        <Header
          placement="left"
          backgroundColor={baseColor.dark}
          leftComponent={
            <ButtonBack onPress={() => this.props.navigation.goBack()} />
          }
          // centerComponent={
          //   <Friends
          //     image={this.state.users[0].image}
          //     name={this.state.users[0].senderName}
          //     onPress={() => this.props.navigation.navigate('FriendProfile')}
          //   />
          // }
        />
        <ScrollView style={styles.container}>
          {this.state.chats.map((chat) => {
            {
              chat.receiver_name !== this.props.auth.data.fullname ? (
                <SenderBalloon
                  key={chat.id}
                  message={chat.content}
                  date={chat.date}
                  // onLongPress={() => alert('sender message')}
                />
              ) : (
                <ReceiverBalloon
                  key={chat.id}
                  message={chat.content}
                  date={chat.date}
                  onLongPress={() => alert('sender message')}
                />
              );
            }
          })}
          {/* <ReceiverBalloon
            message="Lagi ena ena"
            date="00:00"
            onLongPress={() => alert('sender message')}
          /> */}
        </ScrollView>
        <View
          style={{
            // maxHeight: moderateScale(250, 2),
            // paddingHorizontal: 10,
            flexDirection: 'row',
            backgroundColor: baseColor.dark,
          }}>
          <Input
            placeholder="Send message"
            placeholderTextColor={baseColor.grey}
            inputStyle={{
              color: baseColor.white,
              fontFamily: baseFont.roboto.regular,
            }}
            containerStyle={{
              flex: 1,
              backgroundColor: baseColor.dark,
            }}
          />
          <Button
            containerStyle={{
              alignSelf: 'center',
              paddingHorizontal: 10,
              paddingRight: 10,
              backgroundColor: baseColor.dark,
            }}
            buttonStyle={{backgroundColor: baseColor.purple}}
            icon={<Icon name="send" size={20} color="white" />}
            onPress={() => alert('button send')}
          />
        </View>
      </>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: baseColor.darkGrey,
  },
  item: {
    marginVertical: moderateScale(3, 2),
    flexDirection: 'row',
    // marginBottom: 80,
  },
  itemIn: {
    marginLeft: 20,
  },
  itemOut: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  senderBalloon: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  senderContent: {
    color: baseColor.white,
    marginRight: 5,
  },
  senderDate: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    color: baseColor.grey,
    fontFamily: baseFont.roboto.bold,
    fontSize: 12,
  },
  receiverBalloon: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  receiverContent: {
    color: baseColor.black,
    marginRight: 5,
  },
  receiverDate: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    color: baseColor.grey,
    fontFamily: baseFont.roboto.bold,
    fontSize: 12,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
  chat: state.chat,
});

const mapDispatchToProps = {getUsersById, showAllChats};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalChat);
