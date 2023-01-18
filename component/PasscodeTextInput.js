import React from 'react';
import {
  View,
  TextInput,
} from 'react-native';

const PasscodeTextInput = ({ ref, autoFocus, onSubmitEditing, onChangeText, value}) => {

  const { inputStyle, underlineStyle } = styles;

  return(
    <View>
      <TextInput
        ref={ref}
        autoFocus={autoFocus}
        onSubmitEditing={onSubmitEditing}
        style={[inputStyle]}
        maxLength={1}
        keyboardType="numeric"
        placeholderTextColor="#212121"
        secureTextEntry={true}
        onChangeText={onChangeText}
        value={value}
      />
      <View style={underlineStyle} />
    </View>
  );
}

const styles = {
  inputStyle: {
    height: 80,
    width: 60,
    fontSize: 50,
    color: '#212121',
    fontSize: 40,
    padding: 18,
    margin: 10,
    marginBottom: 0
  },
  underlineStyle: {
    width: 60,
    height: 4,
    backgroundColor: '#202020',
    marginLeft: 10,
  }
}

export { PasscodeTextInput };