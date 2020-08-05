import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Moment from 'react-moment';
import {moderateScale} from 'react-native-size-matters';
import {baseColor} from '../../../styles/baseColor';
import {baseFont} from '../../../styles/baseFont';

class MessageBubble extends Component {
  render() {
    return (
      <View
        style={[
          styles.message,
          this.props.mine ? styles.mine : styles.not_mine,
        ]}>
        <View
          style={[
            styles.cloud,
            {
              backgroundColor: this.props.mine
                ? baseColor.black
                : baseColor.purple,
            },
          ]}>
          {this.props.image ? (
            <Image
              style={{alignSelf: this.props.mine ? 'flex-start' : 'flex-end'}}
              borderRadius={10}
              source={this.props.image}
            />
          ) : null}
          {this.props.text ? (
            <Text
              style={[
                styles.text,
                {
                  color: this.props.mine ? baseColor.white : baseColor.black,
                },
              ]}>
              {this.props.text}
            </Text>
          ) : null}
          {this.props.date ? (
            <Text
              style={[
                styles.date,
                {
                  color: this.props.mine ? baseColor.grey : baseColor.grey,
                },
              ]}>
              <Moment element={Text} format="HH:mm">
                {this.props.date}
              </Moment>
            </Text>
          ) : null}
        </View>
      </View>
    );
  }
}

export default MessageBubble;

const styles = StyleSheet.create({
  message: {
    flexDirection: 'row',
    marginVertical: moderateScale(2, 0),
  },
  mine: {
    marginLeft: 20,
  },
  not_mine: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  cloud: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 20,
  },
  text: {
    paddingTop: 3,
    fontSize: 16,
    // lineHeight: 22,
    fontFamily: baseFont.roboto.regular,
  },
  date: {
    fontSize: 12,
    fontFamily: baseFont.roboto.bold,
    alignSelf: 'flex-end',
  },
});
