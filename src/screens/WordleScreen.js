import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Keyboard from '../components/Keyboard';
import {GetRandomWord, IsRealWord} from '../Data';
import {CLEAR, ENTER, colors} from '../utils/constant';
// import storage from "../utils/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getDayOfYear} from '../utils/tools';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/bojack';
import Styles from '../style/Styles';
const copyArray = arr => {
  return [...arr.map(rows => [...rows])];
};
const TOTAL_GUESS = 6;
const WordleScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState('');
  const [letters, setLetters] = useState('');
  const [rows, setRows] = useState(null);
  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);
  const [gameState, setGameState] = useState('playing'); // won,lost,playing
  const [gameScore, setGameScore] = useState('0');
  const [Hint, setHint] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [notWordModal, setNotWordModal] = useState(false);
  const [hintModalShow, setHintModalShow] = useState(false);

  const greenCaps = new Array(5);
  const yellowCaps = new Array(5);

  const getInitialGameStateFromStorage = async () => {
    const gamestate = await AsyncStorage.getItem('GameStats');
    const jsonGameState = JSON.parse(gamestate);
    const gamescore = await AsyncStorage.getItem('GameScore');
    setGameScore(gamescore || '0');
    if (jsonGameState !== null) {
      setInitialGameData(jsonGameState);
    } else {
      setInitialGameData(null);
    }
  };

  const setInitialGameData = data => {
    if (data === null) {
      const word = GetRandomWord();
      setSolution(word);
      setLetters(word.toLowerCase().split(''));
      setRows(new Array(TOTAL_GUESS).fill(new Array(word.length).fill('')));
      setCurCol(0);
      setCurRow(0);
      setGameState('playing');
      setIsLoading(false);
      return;
    }
    const word = data.solution;
    setSolution(word);
    setLetters(word.toLowerCase().split(''));
    setRows(data.rows);
    setCurRow(data.currentRow);
    setIsLoading(false);
    return;
  };

  useEffect(() => {
    getInitialGameStateFromStorage();
  }, []);

  useEffect(() => {
    if (curRow > 0) {
      checkGameState();
    }
  }, [curRow]);

  const checkGameState = async () => {
    if (checkIfWon()) {
      setGameState('won');
      await AsyncStorage.removeItem('GameStats');
      const day = getDayOfYear();
      await AsyncStorage.setItem('WonToday', day.toString());
      const Score =
        (TOTAL_GUESS - curRow + 1) * rows[0].length + Number(gameScore);
      await AsyncStorage.setItem('GameScore', Score.toString());
      setModalVisible(true);
    } else if (checkIfLost()) {
      setGameState('lost');
      await AsyncStorage.removeItem('GameStats');
      await AsyncStorage.setItem('GameScore', '0');
      setModalVisible(true);
    }
  };

  const onPressModalButton = () => {
    setModalVisible(false);
    if (gameState === 'won') {
      navigation.pop();
    } else if (gameState === 'lost') {
      setInitialGameData(null);
    }
  };
  const showHint = async (i, j) => {
    if (i !== curRow) {
      return;
    }
    let score = Number(gameScore);
    if (score > 30) {
      score -= 30;
      await AsyncStorage.setItem('GameScore', score.toString());
      setGameScore(score);
      setHint(letters[j]);
      setHintModalShow(true);
    } else {
      setHint('امتیازت کمه');
      setHintModalShow(true);
    }
  };

  const checkIfWon = () => {
    const row = rows[curRow - 1];
    return row.every((letter, i) => letter === letters[i]);
  };

  const checkIfLost = () => {
    return curRow === rows.length;
  };

  const onkeyPress = async key => {
    if (gameState !== 'playing') {
      return;
    }
    const updatedRows = copyArray(rows);

    if (key === CLEAR) {
      const prevCol = curCol - 1;
      if (prevCol >= 0) {
        updatedRows[curRow][prevCol] = '';
        setRows(updatedRows);
        setCurCol(prevCol);
      }
      return;
    }

    if (key === ENTER) {
      if (curCol === rows[0].length) {
        if (IsRealWord(rows[curRow].join(''))) {
          const updateCurRow = curRow + 1;
          setCurRow(updateCurRow);
          setCurCol(0);
          const dataToSave = {
            rows: rows,
            currentRow: updateCurRow,
            solution: solution,
          };

          await AsyncStorage.setItem('GameStats', JSON.stringify(dataToSave));
          return;
        }
        setNotWordModal(true);
      }

      return;
    }

    if (curCol < rows[0].length) {
      updatedRows[curRow][curCol] = key;
      setRows(updatedRows);
      setCurCol(curCol + 1);
    }
  };

  const isActiveCell = (row, col) => {
    return row === curRow && col === curCol;
  };

  const BgCellColor = (letter, row, col) => {
    if (row >= curRow) {
      return colors.white;
    }
    if (letter === letters[col]) {
      greenCaps.push(letter);
      return colors.primary;
    }
    if (letters.includes(letter)) {
      yellowCaps.push(letter);
      return colors.secondary;
    }
    return colors.lightgrey;
  };

  return (
    <SafeAreaView style={Styles.worldeContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={notWordModal}
        onRequestClose={() => {
          setNotWordModal(!notWordModal);
        }}>
        <View style={Styles.modalcontainer}>
          <View style={Styles.modalbox}>
            <Text style={Styles.Text}>
              این که وارد کردی نه اسمه نه صفت ! یه کلمه درست وارد کن
            </Text>
            <AwesomeButtonBlue
              width={120}
              onPress={() => setNotWordModal(!notWordModal)}>
              <Text style={Styles.btnTextSmall}>باشه</Text>
            </AwesomeButtonBlue>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          onPressModalButton();
        }}>
        <View style={Styles.modalcontainer}>
          <View style={Styles.modalbox}>
            <Text
              style={[
                Styles.modaltexheader,
                {
                  color:
                    gameState === 'won' ? colors.primary : colors.secondary,
                },
              ]}>
              {solution}
            </Text>
            <Text style={Styles.Text}>
              {gameState === 'won'
                ? 'آفرین کارت خوب بود! واسه امروز بسه برو به کارت برس :) '
                : 'دیدی سخت نبود؟ :) دوباره تلاش کن '}
            </Text>
            <AwesomeButtonBlue width={120} onPress={() => onPressModalButton()}>
              <Text style={Styles.btnTextSmall}>باشه</Text>
            </AwesomeButtonBlue>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={hintModalShow}
        onRequestClose={() => {
          setHintModalShow(!hintModalShow);
        }}>
        <View style={Styles.modalcontainer}>
          <View style={Styles.modalbox}>
            <Text
              style={[
                Styles.modaltexheader,
                {
                  color: colors.primary,
                },
              ]}>
              {Hint}
            </Text>
            <Text style={Styles.Text}>
              زیاد راهنمایی نگیر امتیازت تموم میشه !
            </Text>
            <AwesomeButtonBlue
              width={120}
              onPress={() => setHintModalShow(!hintModalShow)}>
              <Text style={Styles.btnTextSmall}>باشه</Text>
            </AwesomeButtonBlue>
          </View>
        </View>
      </Modal>

      <View style={Styles.scoreLine}>
        <View>
          <Image
            source={require('../../assets/animation/pencil.gif')}
            style={Styles.gif}
          />
        </View>
        <View>
          <Text style={Styles.score}>امتیاز :{gameScore}</Text>
        </View>
      </View>
      <ScrollView style={Styles.map}>
        {!isLoading &&
          rows.map((row, i) => (
            <View key={`rows-${i}`} style={Styles.row}>
              {row.map((letter, j) => (
                <TouchableWithoutFeedback
                  onLongPress={() => showHint(i, j)}
                  key={`col-${i}-${j}`}>
                  <View
                    style={[
                      Styles.cell,
                      {
                        borderColor: isActiveCell(i, j)
                          ? colors.darkgrey
                          : colors.lightgrey,
                        backgroundColor: BgCellColor(letter, i, j),
                      },
                    ]}>
                    <Text style={Styles.cellText}>{letter}</Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
          ))}
      </ScrollView>
      <Keyboard
        onKeyPressed={onkeyPress}
        greenCaps={greenCaps}
        yellowCaps={yellowCaps}
      />
    </SafeAreaView>
  );
};

export default WordleScreen;
