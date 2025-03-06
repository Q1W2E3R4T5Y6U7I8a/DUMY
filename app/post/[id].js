import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { FavoritesContext } from '../../Providers/FavoritesContext';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../firebase';

export default function PostDetails() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(db, 'posts', id);
        const postDoc = await getDoc(postRef);
        if (postDoc.exists()) {
          const postData = postDoc.data();
          setPost({ id: postDoc.id, ...postData });
          await updateDoc(postRef, { views: increment(1) });
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const toggleLike = async () => {
    try {
      const postRef = doc(db, 'posts', id); // Reference to the post in Firestore

      // Update likes using Firestore's increment function
      await updateDoc(postRef, { likes: isLiked ? increment(-1) : increment(1) });

      // Update local state
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const toggleFavorite = () => {
    if (isFavorite(post.id)) {
      removeFavorite(post.id);
    } else {
      addFavorite(post);
    }
  };

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Post not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.description}>
  {post.description
    ? post.description.split('<br>').map((line, index) => (
        <Text key={index}>{line}{'\n'}</Text> // Render each line separately
      ))
    : "No description available"}
</Text>

      </ScrollView>
      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
        <Image
          source={isFavorite(post.id) ? require('../../assets/star_icon_active.png') : require('../../assets/star_icon.png')}
          style={styles.favoriteIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleLike} style={styles.likeButton}>
        <Image
          source={isLiked ? require('../../assets/heart_icon_active.png') : require('../../assets/heart_icon.png')}
          style={styles.likeButton}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e5e4db',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,  // Adds spacing between lines
    paddingHorizontal: 16,  // Adds padding on the left & right
    paddingVertical: 8,  // Adds padding on top & bottom
    textAlign: 'justify', // Makes the text look cleaner
  },
  likeButton: {
    position: 'absolute',
    bottom: 8,
    right: 32,
    width: 32,
    height: 32,
    
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 32,
    height: 32
  },
  favoriteIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});