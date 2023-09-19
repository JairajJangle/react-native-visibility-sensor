import React, { type ReactNode, useEffect, useRef, useState } from 'react';
import { Dimensions, type ScaledSize, View } from 'react-native';

export interface InViewProps {
  onChange: (visible: boolean) => void;
  disabled?: boolean;
  triggerOnce?: boolean;
  delay?: number | undefined;
  children?: ReactNode;
}

type RectDimensionsState = {
  rectTop: number;
  rectBottom: number;
  rectWidth: number;
};

export const InView = ({
  onChange,
  disabled = false,
  triggerOnce = false,
  delay,
  children,
  ...props
}: InViewProps) => {
  const innerViewRef: any = useRef(undefined);
  const [rectDimensions, setRectDimensions] = useState<RectDimensionsState>({
    rectTop: 0,
    rectBottom: 0,
    rectWidth: 0,
  });
  const [lastValue, setLastValue] = useState<boolean | undefined>(undefined);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

  useEffect(() => {
    if (!disabled) {
      startWatching();
    }

    return () => {
      stopWatching();
    };
  }, [disabled]);

  const startWatching = () => {
    if (intervalId) return;

    const timerId: NodeJS.Timeout = setInterval(() => {
      if (!innerViewRef.current) {
        return;
      }
      innerViewRef.current?.measure(
        (
          _x: number,
          _y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => {
          setRectDimensions({
            rectTop: pageY,
            rectBottom: pageY + height,
            rectWidth: pageX + width,
          });
        }
      );
    }, delay || 100);

    setIntervalId(timerId);
  };
  const stopWatching = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
  };

  useEffect(() => {
    const window: ScaledSize = Dimensions.get('window');
    const isVisible: boolean =
      rectDimensions.rectBottom !== 0 &&
      rectDimensions.rectTop >= 0 &&
      rectDimensions.rectBottom <= window.height &&
      rectDimensions.rectWidth > 0 &&
      rectDimensions.rectWidth <= window.width;
    if (lastValue !== isVisible) {
      setLastValue(isVisible);
      onChange(isVisible);
      if (isVisible && triggerOnce) {
        stopWatching();
      }
    }
  }, [rectDimensions, lastValue]);

  return (
    <View ref={innerViewRef} {...props}>
      {children}
    </View>
  );
};
