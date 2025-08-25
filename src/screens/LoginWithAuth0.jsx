import React from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import Auth0, {useAuth0, Auth0Provider} from 'react-native-auth0';
import config, {auth0} from '../../AuthService';
import PhoneAuthScreen from './PhoneAuthScreen';

const Home = () => {
  const {authorize, clearSession, user, getCredentials, error, isLoading} =
    useAuth0();
  // const clientIdOAuth = 237925443227-agdsb7bnlgi4692iepegtgr3k1nolp9t.apps.googleusercontent.com
  const onLogin = async () => {
    await authorize({}, {});
    const credentials = await getCredentials();
    console.log('AccessToken: ' + credentials?.accessToken);
  };

  const loggedIn = user !== undefined && user !== null;

  const onLogout = async () => {
    await clearSession({}, {});
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }
  const loginWithFacebook = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        connection: 'facebook',
      });
      console.log('User Info:', credentials);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}> Auth0Sample - Login </Text>
      {user && <Text>You are logged in </Text>}
      {!user && <Text>You are not logged in</Text>}
      <Button
        onPress={loggedIn ? onLogout : onLogin}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
      <Button
        onPress={() => loginWithFacebook({connection: 'facebook'})}
        title="Login with Facebook"
      />
    </View>
  );
};

const App = () => {
  return (
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Home />
      </View>
    </Auth0Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  error: {
    margin: 20,
    textAlign: 'center',
    color: '#D8000C',
  },
});

export default App;
