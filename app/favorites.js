import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FavoritesContext } from '../Providers/FavoritesContext';
import { Link } from 'expo-router';

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.noFavoritesText}>Жодного поста в збережених</Text>
      ) : (
        <FlatList
          data={favorites}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Link href={`/post/${item.id}`} asChild>
              <TouchableOpacity style={styles.postItem}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.postTitle}>{item.title}</Text>
              </TouchableOpacity>
            </Link>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFB908',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'white',
  },
  noFavoritesText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  postItem: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});