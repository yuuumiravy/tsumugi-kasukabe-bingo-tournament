import React, { useEffect, useRef, useState } from 'react';
import AvatarNormal from '../assets/avatars/normal.png';
import AvatarTalking from '../assets/avatars/talking.png';
import AvatarClosedEyes from '../assets/avatars/closed-eyes.png';
import { useAvatar } from '../contexts/AvatarContext';
import { cn } from '../utils/cn';
import { useSettings } from '../contexts/SettingsContext';

type Props = {
  className?: string;
};

const Avatar: React.FC<Props> = ({ className }) => {
  const [img, setImg] = useState<string>(AvatarNormal);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const { avatar } = useAvatar();
  const settings = useSettings();

  const wink = () => {
    setImg(AvatarNormal);
    setTimeout(() => {
      setImg(AvatarClosedEyes);
    }, 2300);
    setTimeout(() => {
      setImg(AvatarNormal);
    }, 2400);
    setTimeout(() => {
      setImg(AvatarClosedEyes);
    }, 4200);
    setTimeout(() => {
      setImg(AvatarNormal);
    }, 4300);
    setTimeout(() => {
      setImg(AvatarClosedEyes);
    }, 5100);
    setTimeout(() => {
      setImg(AvatarNormal);
    }, 5200);
    setTimeout(() => {
      setImg(AvatarClosedEyes);
    }, 5300);
    setTimeout(() => {
      setImg(AvatarNormal);
    }, 5400);
    setTimeout(() => {
      setImg(AvatarClosedEyes);
    }, 8500);
    setTimeout(() => {
      setImg(AvatarNormal);
    }, 8600);
  };

  const talking = () => {
    setImg(AvatarTalking);
    setTimeout(() => {
      setImg(AvatarNormal);
    }, 100);
  };

  useEffect(() => {
    wink();
  }, []);

  useEffect(() => {
    setImg(AvatarNormal);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    switch (avatar.status) {
      case 'none':
        intervalRef.current = setInterval(() => {
          wink();
        }, 10000);
        break;
      case 'talking':
        if (settings.char.voice && !settings.sound.mute) {
          talking();
          intervalRef.current = setInterval(() => {
            talking();
          }, 200);
        }
        break;
    }
  }, [avatar]);

  return <>{settings.char.display ? <img src={img} className={cn(className)} /> : <></>}</>;
};

export default Avatar;
