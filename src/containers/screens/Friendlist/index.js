import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {baseColor} from '../../../styles/baseColor';
import {baseFont} from '../../../styles/baseFont';
import {SearchBar, Image} from 'react-native-elements';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

import {connect} from 'react-redux';
import {getAllContact} from '../../../config/redux/actions/contact';

class Friendlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      contact: [],
    };
  }

  showAllContact = async () => {
    const token = this.props.auth.data.token;
    await this.props
      .getAllContact(token)
      .then((response) => {
        this.setState({
          contact: this.props.contact.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  componentDidMount() {
    this.showAllContact();
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
          {this.props.contact.isLoading && (
            <ActivityIndicator
              style={{
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: 150,
              }}
              size="large"
              color={baseColor.white}
            />
          )}
          {this.state.contact.map((contact) => {
            console.log(contact);
            return (
              <TouchableNativeFeedback
                onPress={() => this.props.navigation.navigate('FriendProfile')}
                onLongPress={() => alert('ok')}
                key={contact.id}
                style={styles.friendList}>
                <Image
                  source={{uri: contact.image}}
                  style={styles.friendPics}
                />
                <Text style={styles.friendsName}>
                  {contact.user_id === this.props.auth.data.id
                    ? contact.friend_name
                    : contact.friend_name}
                </Text>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  contact: state.contact,
});

const mapDispatchToProps = {getAllContact};

export default connect(mapStateToProps, mapDispatchToProps)(Friendlist);
