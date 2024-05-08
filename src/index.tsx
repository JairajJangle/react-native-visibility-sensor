import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Dimensions, type ScaledSize, View } from 'react-native';

export interface InViewProps {
  onChange: (visible: boolean) => void;
  disabled?: boolean;
  triggerOnce?: boolean;
  delay?: number | undefined;
  children?: ReactNode;
}

interface RectDimensionsState {
  rectTop: number;
  rectBottom: number;
  rectWidth: number;
}

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

export function InView(inViewProps: InViewProps) {
  const {
    onChange,
    disabled = false,
    triggerOnce = false,
    delay,
    children,
    ...props
  } = inViewProps;

  const innerViewRef = useRef<View>(null);
  const [rectDimensions, setRectDimensions] = useState<RectDimensionsState>({
    rectTop: 0,
    rectBottom: 0,
    rectWidth: 0,
  });
  const [lastValue, setLastValue] = useState<boolean | undefined>(undefined);
  const [active, setActive] = useState<boolean>(false);

  const measureInnerView = () => {
    if (!active) {
      return;
    }
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
        const dimensions = {
          rectTop: pageY,
          rectBottom: pageY + height,
          rectWidth: pageX + width,
        };
        if (
          rectDimensions.rectTop !== dimensions.rectTop ||
          rectDimensions.rectBottom !== dimensions.rectBottom ||
          rectDimensions.rectWidth !== dimensions.rectWidth
        ) {
          setRectDimensions(dimensions);
        }
      }
    );
  };

  useInterval(measureInnerView, delay || 100);

  const startWatching = useCallback(() => {
    if (active) return;
    setActive(true);
  }, [active]);

  const stopWatching = useCallback(() => {
    if (active) {
      setActive(false);
    }
  }, [active]);

  useEffect(() => {
    if (!disabled) {
      startWatching();
    }

    return () => {
      stopWatching();
    };
  }, [disabled, startWatching, stopWatching]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rectDimensions, lastValue]);

  return (
    <View ref={innerViewRef} {...props}>
      {children}
    </View>
  );
}
