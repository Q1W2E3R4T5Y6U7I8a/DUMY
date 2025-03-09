import { View, Text, Image, StyleSheet } from 'react-native';
import useCounter from '../hooks/useCounter';
import imageMapping from '../assets/imageMapping';

export default function HomeScreen() {
  const maxValue = 5; // Set the maximum value (later you can change it to 366)
  const { counter } = useCounter(maxValue);
  const imageSource = imageMapping[counter];

  return (
    <View style={styles.container}>
      <Image
        source={imageSource}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
});