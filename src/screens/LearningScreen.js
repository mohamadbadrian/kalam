import {ScrollView, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../utils/constant';
import Styles from '../style/Styles';
const LearningScreen = () => {
  return (
    <SafeAreaView style={Styles.container}>
      <ScrollView>
        <Text style={Styles.title}>آموزش بازی</Text>
        <Text style={Styles.Text}>
          توی این بازی باید کلمه مورد نظر ما رو حدس بزنی . برای موفق شدن 6 شانس
          داری که میتونی ازش استفاده کنی ، شاید هم زودتر از 6 بار تونستی کلمه رو
          حدس بزنی. هربار که کلمه رو حدس زدی روی کلید ↲ بزن تا نتیجه حدست رو
          ببینی اینو یادت باشه که کلمه ها فقط شامل اسم ها و صفت هاست
        </Text>
        <Text style={[Styles.Text, {color: colors.primary}]}>
          حرفی که سبز میشه یعنی اینکه هم حرف درسته و هم جای حرف تو کلمه
        </Text>
        <Text style={[Styles.Text, {color: colors.secondary}]}>
          حرفی که زرد میشه یعنی این حرف توی کلمه مورد نظر هست ولی جاش رو درست
          حدس نزدی
        </Text>
        <Text style={[Styles.Text, {color: colors.grey}]}>
          حرفی که خاکستری میشه رو کلا بیخیال شو توی کلمه نیست
        </Text>

        <Text style={Styles.Text}>
          توی روز هرچقدر بخوای میتونی بازی کنی تا وقتی که برنده نشی !
        </Text>
        <Text style={Styles.Text}>
          چرا ؟ خب معلومه باید بری به کارت برسی :)
        </Text>
        <Text style={Styles.Text}>
          برای راهنمایی گرفتن انگشتت رو روی حرفی که میخوای نگه دار تا بهت تقلب
          برسونیم فقط یادت باشه خرج داره و 30 امتیاز از امتیازات کم میشه
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LearningScreen;
