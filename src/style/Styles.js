import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../utils/constant';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  btnText: {
    color: 'white',
    fontFamily: 'BTitrBold',
    fontSize: 18,
  },
  btnTextSmall: {
    color: 'white',
    fontFamily: 'BTitrBold',
    fontSize: 14,
  },
  flex: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  btn: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  modalcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalbox: {
    width: '70%',
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 8,
  },
  modaltexheader: {
    fontSize: 52,
    fontFamily: 'BTitrBold',
    lineHeight: 132,
  },

  Text: {
    fontFamily: 'BYekan',
    fontSize: 14,
    marginVertical: 30,
    lineHeight: 22,
    color: colors.black,
  },

  //learning
  container: {
    backgroundColor: colors.white,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    display: 'flex',
    padding: 55,
  },

  btn: {
    marginHorizontal: 5,
    marginVertical: 5,
  },

  title: {
    fontFamily: 'BTitrBold',
    fontSize: 26,
    marginVertical: 5,
    lineHeight: 56,
    textAlign: 'center',
    color: colors.black,
  },

  //setting

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  //wordle

  worldeContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },

  map: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cell: {
    borderWidth: 2,
    borderColor: colors.grey,
    flex: 1,
    maxWidth: 50,
    aspectRatio: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  cellText: {
    color: colors.darkgrey,
    fontFamily: 'BTitrBold',
    fontSize: 18,
  },
  modalcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalbox: {
    width: '70%',
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 8,
  },
  modaltexheader: {
    fontSize: 52,
    fontFamily: 'BTitrBold',
    lineHeight: 132,
  },

  scoreLine: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 0,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  gif: {
    width: screenWidth / 5,
    height: screenHeight / 7,
    aspectRatio: 1,
  },
  score: {
    fontFamily: 'BYekan',
    fontSize: 14,
    marginVertical: 5,
    lineHeight: 22,
    color: colors.black,
  },
});
