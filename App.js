import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PropertyInspectionForm from './src/screens/PropertyInspectionForm';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar translucent={false} barStyle={"dark-content"} backgroundColor={'#f5f5f5'} />
      <PropertyInspectionForm />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', flex: 1 },
});
