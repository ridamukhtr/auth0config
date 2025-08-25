import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {supabase} from '../config/SupabaseClient';

const SignInWithSupabase = () => {
  // https://dyakaanxmnioqmwhspzw.supabase.co/auth/v1/callback
  const [loading, setLoading] = useState(false);
  const [authUrl, setAuthUrl] = useState(null);

  const signInWithLinkedIn = async () => {
    setLoading(true);
    const {data, error} = await supabase.auth.signInWithOAuth({
      provider: 'linkedin',
      options: {
        redirectTo: 'https://dyakaanxmnioqmwhspzw.supabase.co/auth/v1/callback',
      },
    });

    if (error) {
      console.log('LinkedIn Auth Error:', error);
      setLoading(false);
      return;
    }

    setAuthUrl(data.url);
    setLoading(false);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {loading && <ActivityIndicator size="large" />}

      {authUrl ? (
        <Text>{'uri'}</Text>
      ) : (
        // <WebView source={{uri: authUrl}} style={{flex: 1, width: '100%'}} />
        <Button title="Login with LinkedIn" onPress={signInWithLinkedIn} />
      )}
    </View>
  );
};

export default SignInWithSupabase;

const styles = StyleSheet.create({});
