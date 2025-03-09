import { View, Text, FlatList, StyleSheet } from 'react-native';

const books = [
  { id: '1', title: 'Book 1' },
  { id: '2', title: 'Book 2' },
  { id: '3', title: 'Book 3' },
];

export default function BooksScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  bookItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});