import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { auth0 } from '../../AuthService';

const PhoneAuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Function to send OTP
  const handleSendOTP = async () => {
    try {
      await auth0.auth.passwordlessWithSMS({
        phoneNumber,
        code: otp
      });
      setOtpSent(true);
      console.log('OTP Sent', 'Please check your phone for the verification code.');
    } catch (error) {
      console.log('Error Sending OTP:', error);
      console.log('Error', 'Failed to send OTP. Please try again.');
    }
  };

  // Function to verify OTP
  const handleVerifyOTP = async () => {
    try {
      const response = await auth0.auth.loginWithSMS({
        phoneNumber,
        code: otp
      });
      console.log('User Authenticated:', response);
    } catch (error) {
      console.log('OTP Verification Failed:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Login with Phone</Text>

      <TextInput
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      {!otpSent ? (
        <Button title="Send OTP" onPress={handleSendOTP} />
      ) : (
        <>
          <TextInput
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
          />
          <Button title="Verify OTP" onPress={handleVerifyOTP} />
        </>
      )}
    </View>
  );
};

export default PhoneAuthScreen;