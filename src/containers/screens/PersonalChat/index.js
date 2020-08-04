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
import MessageBubble from '../../organism/MessageBubble';

import {connect} from 'react-redux';
import {getUsersById} from '../../../config/redux/actions/users';
import {showAllChats, postChats} from '../../../config/redux/actions/chat';

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

// MAIN COMPONENT
export class PersonalChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      chats: [],
      newMessage: '',
    };
  }

  getUsers = async () => {
    const token = this.props.auth.data.token;
    const id = this.props.route.params.id;

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
    const id = this.props.route.params.id;

    await this.props
      .showAllChats(token, id)
      .then((response) => {
        this.setState({
          chats: response.value.data.data,
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

  postChats = async () => {
    const token = this.props.auth.data.token;
    let formData = new FormData();
    formData.append('sender', this.props.auth.data.id);
    formData.append('receiver', this.props.route.params.id);
    formData.append('content', this.state.newMessage);

    await this.props
      .postChats(token, formData)
      .then((response) => {
        this.props.showAllChats(token, this.props.route.params.id);
        this.setState({newMessage: ''});
      })
      .catch((error) => console.log(error.message));
  };

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
          centerComponent={
            <Friends
              image={this.state.users['image']}
              name={this.state.users['fullname']}
              onPress={() => this.props.navigation.navigate('FriendProfile')}
            />
          }
        />
        <ScrollView style={styles.container}>
          {this.state.chats.map((chat) => {
            return (
              <MessageBubble
                key={chat.id}
                text={chat.content}
                date={chat.date}
                mine={chat.receiver === this.props.auth.data.id}
              />
            );
          })}
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
            value={this.state.newMessage}
            onChangeText={(input) => this.setState({newMessage: input})}
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
            onPress={() => this.postChats()}
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

const mapDispatchToProps = {getUsersById, showAllChats, postChats};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalChat);
