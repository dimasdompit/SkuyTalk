import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {baseColor} from '../../../styles/baseColor';
import {baseFont} from '../../../styles/baseFont';
import {SearchBar, Image} from 'react-native-elements';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      chats: [
        {
          id: 1,
          image:
            'https://1.bp.blogspot.com/-SVIVQu7cH1U/XLu0gg-XbHI/AAAAAAAAN6E/u-Rsd-kSYekcWR0IpbHeyUWW4aJ5LM1PQCLcBGAs/s2560/pubg-4k-game-sw-2048x2048.jpg',
          senderName: 'Dompit Gantenk pake K',
          content: `WOOOYYYY`,
          date: '16:30',
        },
        {
          id: 2,
          image:
            'https://resize.cdn.otakumode.com/ex/350.350/shop/product/033c21499a3a43c0acdc8c18470fab31.jpg',
          senderName: 'Naruto Uzumaki',
          content: `Gantiin jadi hokage sini. CEPET!!!`,
          date: '18:30',
        },
        {
          id: 3,
          image:
            'https://i.pinimg.com/originals/ec/38/87/ec3887d7bbde69a98dd424ce434f9250.jpg',
          senderName: 'Lisa BlekPing',
          content: `Jadi beli cuangki gak?`,
          date: '00:00',
        },
        {
          id: 4,
          image:
            'https://id-test-11.slatic.net/p/95da2d3d51ec76c0aed25f9277aa7d8c.jpg_720x720q80.jpg_.webp',
          senderName: 'Tony Stark',
          content: `Besok aja deh ya`,
          date: '21:17',
        },
        {
          id: 5,
          image:
            'https://pbs.twimg.com/profile_images/3085541511/a2cff5090fa9d8da848a4c01facf0ee5.jpeg',
          senderName: 'Tukang Tikung Temen',
          content: `Ayooooo laaaahhh`,
          date: '02:00',
        },
        {
          id: 6,
          image:
            'https://resize.cdn.otakumode.com/ex/350.350/shop/product/033c21499a3a43c0acdc8c18470fab31.jpg',
          senderName: 'Admin Jastip',
          content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. A esse, molestiae qui, aut adipisci obcaecati praesentium enim id dolorem voluptas porro eveniet voluptatum, laboriosam vitae? Maiores omnis recusandae possimus fugit.`,
          date: '18:30',
        },
        {
          id: 7,
          image:
            'https://resize.cdn.otakumode.com/ex/350.350/shop/product/033c21499a3a43c0acdc8c18470fab31.jpg',
          senderName: 'Admin Jastip',
          content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. A esse, molestiae qui, aut adipisci obcaecati praesentium enim id dolorem voluptas porro eveniet voluptatum, laboriosam vitae? Maiores omnis recusandae possimus fugit.`,
          date: '18:30',
        },
      ],
    };
  }

  handleSearch = (search) => {
    this.setState({search});
  };

  render() {
    return (
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
            inputStyle={{color: baseColor.grey}}
          />
          <Text style={styles.heading}>Messages</Text>
          <Text style={styles.notifHeading}>You have 2 new messages</Text>
        </View>
        <ScrollView style={styles.middleContent}>
          {this.state.chats.map((chat) => {
            return (
              <TouchableNativeFeedback
                onPress={() => this.props.navigation.navigate('PersonalChat')}
                key={chat.id}
                style={styles.friendsChat}>
                <Image source={{uri: chat.image}} style={styles.friendPics} />
                <View style={styles.friendsMessage}>
                  <Text style={styles.friendsName}>{chat.senderName}</Text>
                  <Text style={styles.chatContent}>
                    {chat.content.length < 31
                      ? chat.content
                      : `${chat.content.substr(0, 31)}...`}
                  </Text>
                </View>
                <Text style={styles.chatDate}>{chat.date}</Text>
              </TouchableNativeFeedback>
            );
          })}
        </ScrollView>
      </View>
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
  chatContent: {
    width: 238,
    fontSize: 14,
    color: baseColor.grey,
    fontFamily: baseFont.roboto.regular,
  },
  chatDate: {
    color: baseColor.grey,
    fontFamily: baseFont.roboto.bold,
  },
});

export default Chat;
