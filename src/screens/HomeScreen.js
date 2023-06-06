import {View, Text, Modal, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDayOfYear} from '../utils/tools';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/bojack';
import {useStateContext} from '../context/StateContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../style/Styles';
import Timer from '../components/Timer';
const HomeScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [wonToday, setWonToday] = useState(false);
  const {PlaySound} = useStateContext();
  const [gameScore, setGameScore] = useState('0');

  //development
  const handleWonToday = () => {
    setWonToday(false);
  };

  useEffect(() => {
    async function LoadStorage() {
      const sound = await AsyncStorage.getItem('PlaySound');
      if (sound === 'false') {
        return;
      }
      PlaySound();
    }
    LoadStorage();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        const today = getDayOfYear().toString();
        const value = await AsyncStorage.getItem('WonToday');
        if (value === today) {
          setWonToday(true);
        }
        const gamescore = await AsyncStorage.getItem('GameScore');
        setGameScore(gamescore || '0');
      } catch (e) {
        //console.log("err is:", e);
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={Styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={Styles.modalcontainer}>
          <View style={Styles.modalbox}>
            <Text style={Styles.Text}>
              امروز بردی دیگه! کافیه برو به کارت برس
            </Text>
            <AwesomeButtonBlue
              type="primary"
              width={200}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text className="text-base text-white" style={Styles.btnText}>
                باشه
              </Text>
            </AwesomeButtonBlue>
          </View>
        </View>
      </Modal>

      <View style={Styles.flex}>
        <Image
          source={require('../../assets/animation/think.gif')}
          style={{width: 300, height: 300}}
        />
        <AwesomeButtonBlue
          width={300}
          type="primary"
          textLineHeight={35}
          style={Styles.btn}
          onPress={e => {
            if (!wonToday) {
              navigation.navigate('Wordle');
            } else {
              setModalVisible(true);
            }
          }}>
          <Text className="text-lg text-white" style={Styles.btnText}>
            {wonToday ? (
              <Timer onEnd={() => handleWonToday()} />
            ) : (
              'شـــروع بـــازی'
            )}
          </Text>
        </AwesomeButtonBlue>
        <View style={{flexDirection: 'row'}}>
          <AwesomeButtonBlue
            width={220}
            type="anchor"
            textLineHeight={25}
            style={Styles.btn}
            onPress={e => navigation.navigate('Learning')}>
            <Text style={Styles.btnTextSmall}>آموزش بازی</Text>
          </AwesomeButtonBlue>
          <AwesomeButtonBlue
            width={70}
            style={Styles.btn}
            type="secondary"
            onPress={e => navigation.navigate('Setting')}>
            <Text>
              <Icon name="settings" size={30} color="#fff" />
            </Text>
          </AwesomeButtonBlue>
        </View>
        <AwesomeButtonBlue width={300} style={Styles.btn} type="disable">
          <Text style={Styles.btnTextSmall}>امتیاز : {gameScore}</Text>
        </AwesomeButtonBlue>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
