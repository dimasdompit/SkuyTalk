import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image
} from 'react-native';
import { baseColor } from '../../../styles/baseColor';
import { baseFont } from '../../../styles/baseFont';
import { CheckedActiveIcon, CheckedIcon } from '../../../assets'
import { SearchBar } from 'react-native-elements';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Moment from 'react-moment';
// import {API_URL} from '@env';
import { config } from '../../../config/baseUrl';
import io from 'socket.io-client';

import { connect } from 'react-redux';
import { getChats } from '../../../config/redux/actions/chat';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      chats: [],
    };
  }

  getChats = async () => {
    const token = this.props.auth.data.token;

    await this.props
      .getChats(token)
      .then((response) => {
        console.log(response);
        this.setState({
          chats: response.value.data.data,
        });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.getChats();
    this.socket = io(`${config.baseUrl}`);
    this.socket.on('last-chat', (msg, id) => {
      console.log(id);
      if (id === this.props.auth.data.id) {
        return this.setState({ chats: msg });
      }
    });

    this.socket.on('chat', (response) => {
      if (response.receiver === this.props.auth.data.id) {
        this.getChats();
        return console.log('success!');
      }
    });

    this.socket.on('read', response => {
      return console.log(response, 'read')
    })
  }

  componentWillUnmount() {
    this.socket.removeAllListeners();
    this.socket.disconnect();
  }

  handleSearch = (search) => {
    this.setState({ search });
  };

  render() {
    return (
      <>
        <View style={styles.mainContainer}>
          <View style={styles.topContent}>
            <SearchBar
              placeholder="Search here..."
              onChangeText={this.handleSearch}
              value={this.state.search}
              containerStyle={{
                backgroundColor: baseColor.dark,
                borderBottomColor: baseColor.dark,
                borderTopColor: baseColor.dark,
              }}
              inputContainerStyle={{
                backgroundColor: baseColor.darkGrey,
                borderRadius: 50,
              }}
              placeholderTextColor={baseColor.grey}
              inputStyle={{ color: baseColor.grey }}
            />
            <Text style={styles.heading}>Messages</Text>
            <Text style={styles.notifHeading}>You have a new messages</Text>
          </View>
          <ScrollView style={styles.middleContent}>
            {this.state.chats.map((chat) => {
              return (
                <TouchableNativeFeedback
                  onPress={() =>
                    this.props.navigation.navigate('PersonalChat', {
                      id:
                        chat.receiver === this.props.auth.data.id
                          ? chat.sender
                          : chat.receiver,
                    })
                  }
                  key={chat.id}
                  style={styles.friendsChat}>
                  <Image
                    source={{ uri: `${config.baseUrl}/images/${chat.image}` }}
                    style={styles.friendPics}
                  />
                  <View style={styles.friendsMessage}>
                    <Text style={styles.friendsName}>{chat.fullname}</Text>
                    <Text style={styles.chatContent(chat.status, chat.sender === parseInt(this.props.auth.data.id))}>
                      {chat.content.length < 31
                        ? chat.content
                        : `${chat.content.substr(0, 31)}...`}
                    </Text>
                  </View>
                  <View style={styles.rightTitle}>
                    <Text style={styles.chatDate}>
                      <Moment element={Text} format="HH:mm">
                        {chat.date}
                      </Moment>
                    </Text>
                    {chat.sender === parseInt(this.props.auth.data.id) ? (
                      chat.status === 1 ? (
                        <Image source={CheckedActiveIcon} />
                      ) : (
                          <Image source={CheckedIcon} />
                        )
                    ) : chat.status === 0 ? (
                      <Icon name='exclamation-circle' color={baseColor.purple} size={17} />
                    ) : null}
                  </View>
                </TouchableNativeFeedback>
              );
            })}
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: baseColor.dark,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  heading: {
    marginTop: 10,
    fontSize: 30,
    fontFamily: baseFont.roboto.black,
    color: baseColor.white,
  },
  notifHeading: {
    fontSize: 14,
    color: baseColor.grey,
    fontFamily: baseFont.roboto.regular,
    marginBottom: 20,
  },
  friendsChat: {
    paddingVertical: 15,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: baseColor.grey,
    borderBottomWidth: 0.5,
    borderBottomColor: baseColor.grey,
  },
  friendPics: {
    height: 55,
    width: 55,
    borderRadius: 50,
  },
  friendsMessage: {
    marginLeft: 15,
    alignSelf: 'center',
  },
  friendsName: {
    color: baseColor.white,
    fontFamily: baseFont.roboto.bold,
    fontSize: 16,
    marginBottom: 2,
  },
  chatContent: (status, mine) => ({
    width: 238,
    fontSize: 14,
    color: !mine && status === 0 ? baseColor.purple : baseColor.grey,
    fontFamily: baseFont.roboto.regular,
    fontWeight: !mine && status === 0 ? 'bold' : '400',
  }),
  rightTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatDate: {
    color: baseColor.grey,
    fontFamily: baseFont.roboto.bold,
    marginBottom: 5
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
});

const mapDispatchToProps = { getChats };

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
