import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Dimensions, type ScaledSize, View } from 'react-native';
import type {
  VisibilitySensorRef,
  VisibilitySensorProps,
  RectDimensionsState,
} from './visibilitySensor.types';

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null || delay === undefined) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

const VisibilitySensor = forwardRef<VisibilitySensorRef, VisibilitySensorProps>(
  (props, ref) => {
    const {
      onChange,
      disabled = false,
      triggerOnce = false,
      delay,
      threshold = {},
      children,
      ...rest
    } = props;

    const localRef = useRef<View>(null);

    useImperativeHandle(ref, () => ({
      getInnerRef: () => localRef.current,
    }));

    const [rectDimensions, setRectDimensions] = useState<RectDimensionsState>({
      rectTop: 0,
      rectBottom: 0,
      rectLeft: 0,
      rectRight: 0,
      rectWidth: 0,
      rectHeight: 0,
    });
    const [lastValue, setLastValue] = useState<boolean | undefined>(undefined);
    const [active, setActive] = useState<boolean>(false);
    const hasMeasuredRef = useRef(false);

    const measureInnerView = () => {
      /* Check if the sensor is active to prevent unnecessary measurements
      This avoids running measurements when the sensor is disabled or stopped */
      if (!active) return;

      localRef.current?.measure(
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
            rectLeft: pageX,
            rectRight: pageX + width,
            rectWidth: width,
            rectHeight: height,
          };
          if (
            rectDimensions.rectTop !== dimensions.rectTop ||
            rectDimensions.rectBottom !== dimensions.rectBottom ||
            rectDimensions.rectLeft !== dimensions.rectLeft ||
            rectDimensions.rectRight !== dimensions.rectRight ||
            rectDimensions.rectWidth !== dimensions.rectWidth ||
            rectDimensions.rectHeight !== dimensions.rectHeight
          ) {
            setRectDimensions(dimensions);
            /* Set hasMeasuredRef to true to indicate that a valid measurement has been taken
            This ensures visibility checks only proceed after initial measurement */
            hasMeasuredRef.current = true;
          }
        }
      );
    };

    useInterval(measureInnerView, delay || 100);

    const startWatching = useCallback(() => {
      if (!active) setActive(true);
    }, [active]);

    const stopWatching = useCallback(() => {
      if (active) {
        setActive(false);
        /* Reset measurement state when stopping to ensure fresh measurements
        when the sensor is reactivated */
        hasMeasuredRef.current = false;
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
      /* Ensure visibility checks only run when the sensor is active and
      at least one measurement has been completed. This prevents
      premature visibility calculations with invalid or stale dimensions */
      if (!active || !hasMeasuredRef.current) return;

      const window: ScaledSize = Dimensions.get('window');
      const isVisible: boolean =
        rectDimensions.rectTop + (threshold.top || 0) <= window.height && // Top edge is within the bottom of the window
        rectDimensions.rectBottom - (threshold.bottom || 0) >= 0 && // Bottom edge is within the top of the window
        rectDimensions.rectLeft + (threshold.left || 0) <= window.width && // Left edge is within the right of the window
        rectDimensions.rectRight - (threshold.right || 0) >= 0; // Right edge is within the left of the window

      if (lastValue !== isVisible) {
        setLastValue(isVisible);
        onChange(isVisible);
        if (isVisible && triggerOnce) {
          stopWatching();
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rectDimensions, lastValue, active]);

    return (
      <View ref={localRef} {...rest}>
        {children}
      </View>
    );
  }
);

export default VisibilitySensor;
