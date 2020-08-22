import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Svg, {Path} from 'react-native-svg';
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
          <View
            style={[
              styles.arrow_container,
              this.props.mine
                ? styles.arrow_left_container
                : styles.arrow_right_container,
            ]}>
            <Svg
              style={this.props.mine ? styles.arrow_left : styles.arrow_right}
              width={moderateScale(15.5, 0.6)}
              height={moderateScale(17.5, 0.6)}
              viewBox="32.484 17.5 15.515 17.5"
              enable-background="new 32.485 17.5 15.515 17.5">
              <Path
                d={
                  this.props.mine
                    ? 'M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z'
                    : 'M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z'
                }
                fill={this.props.mine ? baseColor.black : baseColor.purple}
                x="0"
                y="0"
              />
            </Svg>
          </View>
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
    paddingHorizontal: moderateScale(8, 2),
    paddingTop: moderateScale(3, 2),
    paddingBottom: moderateScale(3, 2),
    borderRadius: 10,
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

  arrow_container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1,
  },

  arrow_left_container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },

  arrow_right_container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  arrow_left: {
    left: moderateScale(-6, 0.5),
  },
  arrow_right: {
    right: moderateScale(-6, 0.5),
  },
});
