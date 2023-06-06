import React, {createContext, useContext, useEffect} from 'react';
import SoundPlayer from 'react-native-sound-player';

const Context = createContext();
let _onFinishedPlayingSubscription = null;
export const StateContext = ({children}) => {
  useEffect(() => {
    _onFinishedPlayingSubscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      ({success}) => {
        PlaySound();
      },
    );

    return () => {
      _onFinishedPlayingSubscription.remove();
    };
  }, []);

  const PlaySound = () => {
    SoundPlayer.playSoundFile('back', 'mp3');
  };

  const StopSound = async () => {
    SoundPlayer.stop();
  };

  return (
    <Context.Provider
      value={{
        PlaySound,
        StopSound,
      }}>
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
