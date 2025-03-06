import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import React, {useState} from 'react';

export default function Header() {
  const handleInfoPress = () => {
    alert(`Освіта має бути простою та про сенси. Книги мають бути БЕЗКОШТОВНИМИ. 
      Нам як виду вистачає прогресу, що нам потрібно так це мудрості, можливості не заглиблюватись в глибші заморочені перескази, а говорити ПРОСТО ПРО СКЛАДНЕ, але не обманювати себе що "ВСЕ ПРОСТО", бо все до біса "МУЛЬТИСТРУКТУРНО", 
      а ми просто мавпи на грьобаному камені в безкінечному космосі які в кращому випадку що можуть знати з впевненістю, так це що вони не сильно розумніші за молюсків.
      Проект ДУМИ має відкритий код, створений волонтерами та не заробляє. Якщо ти розділяєш наші цінності, напиши будь ласка в інстаграм або телеграм @makarkarma, та стань частиною проекту.`);
  };

  const [isHeartActive, setIsHeartActive] = useState(false);
  const handleHeartPress = () => {
    setIsHeartActive(!isHeartActive);
    alert(`Надіюсь вам подобаються ДУМИ, будь ласка поставте відгук в PlayMarket якщо не складно, ми маємо зробити цей світ кращим!`)
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleInfoPress}>
        <Image
          source={require('../../assets/info_icon.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      <View style={styles.rightIcons}>
        <Link href="/favorites" asChild>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../../assets/star_icon.png')} style={styles.icon} />
          </TouchableOpacity>
        </Link>

        <TouchableOpacity onPress={handleHeartPress}>
          <Image
             source={isHeartActive ? require('../../assets/heart_icon_active.png') : require('../../assets/heart_icon.png')}
             style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#b7b6af',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  rightIcons: {
    flexDirection: 'row', // Keep star and heart in a row
    justifyContent: 'flex-end', // Align icons to the right
  },
  iconButton: {
    marginRight: 16, // Adds space between the star and the heart
  },
});
