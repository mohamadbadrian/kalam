import {View, Text, Linking} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/bojack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStateContext} from '../context/StateContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from '../style/Styles';
const SettingScreen = ({navigation}) => {
  const {PlaySound, StopSound} = useStateContext();

  const [playMuic, setPlayMuic] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        const sound = await AsyncStorage.getItem('PlaySound');
        if (sound === 'false') {
          setPlayMuic(false);
        }
      } catch (e) {
        //console.log("err is:", e);
      }
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const MusciHandler = async () => {
    const updatedPlayMusic = !playMuic;
    await AsyncStorage.setItem('PlaySound', String(updatedPlayMusic));
    if (updatedPlayMusic) {
      PlaySound();
    } else {
      StopSound();
    }

    setPlayMuic(updatedPlayMusic);
  };
  const emailHandler = () => {
    Linking.openURL('mailto:mohamad.badrian@gmail.com');
  };
  const version = '1.0.1';
  return (
    <SafeAreaView style={Styles.container}>
      <Text style={Styles.title}>تنظیمات</Text>
      <View style={Styles.settingRow}>
        <Text style={Styles.Text}>پخش موسیقی</Text>
        <AwesomeButtonBlue
          width={70}
          style={Styles.btn}
          type="primary"
          onPress={e => MusciHandler()}>
          <Text>
            <IconM
              name={playMuic ? 'music-note' : 'music-note-off'}
              size={30}
              color="#fff"
            />
          </Text>
        </AwesomeButtonBlue>
      </View>

      <Text style={Styles.title}>درباره بازی</Text>

      <View style={Styles.settingRow}>
        <Text style={Styles.Text}>برنامه نویس </Text>
        <Text style={Styles.Text}>محمد بدریان</Text>
      </View>
      <View style={Styles.settingRow}>
        <Text style={Styles.Text}>کاری داری؟ ایمیل بزن </Text>
        <AwesomeButtonBlue
          width={70}
          style={Styles.btn}
          type="anchor"
          onPress={e => emailHandler()}>
          <Text>
            <Icon name="email" size={30} color="#fff" />
          </Text>
        </AwesomeButtonBlue>
      </View>
      <View style={Styles.settingRow}>
        <Text style={Styles.Text}>نسخه نرم افزار </Text>
        <Text style={Styles.Text}>{version}</Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;
