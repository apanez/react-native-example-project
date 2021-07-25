import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-ionicons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'center',
    marginRight: 10,
  },
  icon: {
    color: '#000000',
    marginLeft: 'auto',
  },
});

const ListMembers: React.FC<any> = ({member, onPress}) => {
  return (
    <TouchableHighlight onPress={() => onPress()}>
      <View style={styles.container}>
        <Text>{member.name}</Text>
        <Icon name="arrow-dropright" style={styles.icon} />
      </View>
    </TouchableHighlight>
  );
};

export default ListMembers;
