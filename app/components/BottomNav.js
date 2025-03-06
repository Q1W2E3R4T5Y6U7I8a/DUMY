import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function BottomNav() {
  return (
    <View style={styles.nav}>
      <Link href="/" asChild>
        <TouchableOpacity>
          <Text>Main</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/books" asChild>
        <TouchableOpacity>
          <Text>Books</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/dumy" asChild>
        <TouchableOpacity>
          <Text>Dumy</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#b7b6af',
  },
});