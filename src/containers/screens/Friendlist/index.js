import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {baseColor} from '../../../styles/baseColor';
import {baseFont} from '../../../styles/baseFont';
import {SearchBar, Image} from 'react-native-elements';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {config} from '../../../config/baseUrl';

import {connect} from 'react-redux';
import {getAllContact} from '../../../config/redux/actions/contact';

class Friendlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      contact: [],
      refresh: false,
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

  handleRefresh = () => {
    this.setState({refresh: true});
    setTimeout(() => {
      this.setState({refresh: false});
    }, 200);
  };

  handleSearch = (keyword) => {
    this.setState({search: keyword});
  };

  componentDidMount() {
    this.showAllContact();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topContent}>
          <Text style={styles.heading}>Contacts</Text>
        </View>
        <ScrollView
          style={styles.middleContent}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this.handleRefresh}
            />
          }>
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
            return (
              <TouchableNativeFeedback
                onPress={() =>
                  this.props.navigation.navigate('FriendProfile', {
                    id: contact.idFriend,
                  })
                }
                onLongPress={() => alert('ok')}
                key={contact.id}
                style={styles.friendList}>
                <Image
                  source={{
                    uri: `${config.baseUrl}/images/${contact.friendImage}`,
                  }}
                  style={styles.friendPics}
                />
                <Text style={styles.friendsName}>{contact.friendName}</Text>
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
