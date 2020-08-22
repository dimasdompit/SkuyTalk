import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {SearchBar, Image} from 'react-native-elements';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {baseColor} from '../../../styles/baseColor';
import {baseFont} from '../../../styles/baseFont';
import {config} from '../../../config/baseUrl';

import {connect} from 'react-redux';
import {searchContact} from '../../../config/redux/actions/contact';

class SearchFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      contact: [],
    };
  }

  //   getContact = async (q) => {
  //     const token = this.props.auth.data.token;
  //     await this.props
  //       .searchContact(token, q)
  //       .then((response) => {
  //         console.log(response);
  //         this.setState({
  //           contact: response.value.data.data,
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(error.response);
  //       });
  //   };

  //   componentDidMount() {
  //     this.getContact();
  //   }

  handleSearch = async () => {
    const token = this.props.auth.data.token;
    await this.props
      .searchContact(token, this.state.search)
      .then((response) => {
        this.setState({
          contact: response.value.data.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topContent}>
          <SearchBar
            placeholder="Search here..."
            onChangeText={(text) => this.setState({search: text})}
            onBlur={this.handleSearch}
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
          {this.state.search !== '' ? (
            <Text
              style={styles.heading}>{`Result of "${this.state.search}"`}</Text>
          ) : (
            <Text style={styles.heading}>Search</Text>
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
                    uri: `${config.baseUrl}/images/${contact.image}`,
                  }}
                  style={styles.friendPics}
                />
                <Text style={styles.friendsName}>{contact.fullname}</Text>
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

const mapDispatchToProps = {searchContact};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFriend);
