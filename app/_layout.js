import { Stack } from 'expo-router';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import { FavoritesProvider } from '../Providers/FavoritesContext';

export default function Layout() {
  return (
    <>
    
      <Header />
        <FavoritesProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="books" />
          <Stack.Screen name="dumy" />
          <Stack.Screen name="post/[id]" />
        </Stack>
        </FavoritesProvider>
      <BottomNav />
    </>
  );
}