import {View, Text, Modal} from 'react-native';
import React from 'react';

const AndriodPrompt = () => {
  return (
    <Modal visible={true} transparent={true}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 20,
          backgroundColor: 'pink',
        }}>
        <Text>Hello Nfc</Text>
      </View>
    </Modal>
  );
};

export default AndriodPrompt;
