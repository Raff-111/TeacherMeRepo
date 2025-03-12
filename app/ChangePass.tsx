import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const ChangePass = () => {
    const [OldPassword, SetOldPassword] = useState('');
    const [NewPassword, SetNewPassword] = useState('');
    const [ConfirmNew, SetConfirmNew] = useState('');

  return (
    <View>
      <TextInput
      value={OldPassword}
      onChangeText={SetOldPassword}
      />

     <TextInput
      value={NewPassword}
      onChangeText={SetNewPassword}
      />

      <TextInput
      value={ConfirmNew}
      onChangeText={SetConfirmNew}
      />
    </View>
  )
}

export default ChangePass

const styles = StyleSheet.create({
    
})


