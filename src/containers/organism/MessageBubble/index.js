import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {baseColor} from '../../../styles/baseColor';
import {baseFont} from '../../../styles/baseFont';

class MessageBubble extends Component {
  render() {
    return (
      <View
        style={[
          styles.message,
          !this.props.mine ? styles.mine : styles.not_mine,
        ]}>
        <View
          style={[
            styles.cloud,
            {
              backgroundColor: this.props.mine
                ? baseColor.purple
                : baseColor.black,
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
                  color: this.props.mine ? baseColor.black : baseColor.white,
                },
              ]}>
              {this.props.text}
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
    marginVertical: moderateScale(4, 2),
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
});
