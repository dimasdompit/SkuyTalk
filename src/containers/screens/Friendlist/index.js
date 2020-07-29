import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {baseColor} from '../../../styles/baseColor';
import {baseFont} from '../../../styles/baseFont';
import {SearchBar, Image} from 'react-native-elements';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

class Friendlist extends Component {
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
        },
        {
          id: 2,
          image:
            'https://resize.cdn.otakumode.com/ex/350.350/shop/product/033c21499a3a43c0acdc8c18470fab31.jpg',
          senderName: 'Naruto Uzumaki',
        },
        {
          id: 3,
          image:
            'https://i.pinimg.com/originals/ec/38/87/ec3887d7bbde69a98dd424ce434f9250.jpg',
          senderName: 'Lisa BlekPing',
        },
        {
          id: 4,
          image:
            'https://id-test-11.slatic.net/p/95da2d3d51ec76c0aed25f9277aa7d8c.jpg_720x720q80.jpg_.webp',
          senderName: 'Tony Stark',
        },
        {
          id: 5,
          image:
            'https://pbs.twimg.com/profile_images/3085541511/a2cff5090fa9d8da848a4c01facf0ee5.jpeg',
          senderName: 'Tukang Tikung Temen',
        },
        {
          id: 6,
          image:
            'https://resize.cdn.otakumode.com/ex/350.350/shop/product/033c21499a3a43c0acdc8c18470fab31.jpg',
          senderName: 'Admin Jastip',
        },
      ],
    };
  }
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
          <Text style={styles.heading}>Friendlist</Text>
        </View>
        <ScrollView style={styles.middleContent}>
          {this.state.chats.map((chat) => {
            return (
              <TouchableNativeFeedback
                onPress={() => this.props.navigation.navigate('FriendProfile')}
                onLongPress={() => alert('ok')}
                key={chat.id}
                style={styles.friendList}>
                <Image source={{uri: chat.image}} style={styles.friendPics} />
                <Text style={styles.friendsName}>{chat.senderName}</Text>
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
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: baseColor.grey,
  },
  friendList: {
    paddingVertical: 15,
    flexDirection: 'row',
  },
  friendPics: {
    height: 55,
    width: 55,
    borderRadius: 50,
  },
  friendsName: {
    marginLeft: 15,
    alignSelf: 'center',
    color: baseColor.white,
    fontFamily: baseFont.roboto.bold,
    fontSize: 18,
    marginBottom: 2,
  },
});

export default Friendlist;
