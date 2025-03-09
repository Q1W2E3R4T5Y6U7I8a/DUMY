import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useCounter = (maxValue) => {
  const [counter, setCounter] = useState(1);

  // Load the counter from storage
  useEffect(() => {
    const loadCounter = async () => {
      const savedCounter = await AsyncStorage.getItem('counter');
      if (savedCounter) {
        setCounter(parseInt(savedCounter, 10));
      }
    };
    loadCounter();
  }, []);

  // Increment the counter every minute
  useEffect(() => {
    const interval = setInterval(async () => {
      setCounter((prevCounter) => {
        const newCounter = prevCounter === maxValue ? 1 : prevCounter + 1; // Reset to 1 after maxValue
        AsyncStorage.setItem('counter', newCounter.toString()); // Save the new counter
        return newCounter;
      });
    }, 60000); // 60000ms = 1 minute

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [maxValue]);

  return { counter };
};

export default useCounter;