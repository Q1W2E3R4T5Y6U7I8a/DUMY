import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import Post from '../components/Post';

export default function DumyScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const postsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => <Post post={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#a0a099',
  },
  listContainer: {
    paddingHorizontal: 8,
  },
});