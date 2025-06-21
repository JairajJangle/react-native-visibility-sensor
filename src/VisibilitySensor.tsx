import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useWindowDimensions, View } from 'react-native';
import type {
  VisibilitySensorRef,
  VisibilitySensorProps,
  RectDimensionsState,
} from './visibilitySensor.types';

enum MeasurementState {
  IDLE = 'IDLE', // Not yet measured
  MEASURING = 'MEASURING', // Measurement in progress
  MEASURED = 'MEASURED', // Has valid measurements
}

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

    useImperativeHandle(ref, () => ({
      getInnerRef: () => localRef.current,
    }));

    const window = useWindowDimensions();

    const localRef = useRef<View>(null);
    const isMountedRef = useRef(true);
    const measurementStateRef = useRef<MeasurementState>(MeasurementState.IDLE);

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

    const measureInnerView = useCallback(() => {
      /* Check if the sensor is active to prevent unnecessary measurements
      This avoids running measurements when the sensor is disabled or stopped */
      if (
        !active ||
        !isMountedRef.current ||
        measurementStateRef.current === MeasurementState.MEASURING
      ) {
        return;
      }

      measurementStateRef.current = MeasurementState.MEASURING;

      localRef.current?.measure(
        (
          _x: number,
          _y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => {
          // Check if component is still mounted before setting state because measurement can be asynchronous
          if (!isMountedRef.current) {
            return;
          }

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
          }

          /* Set measurementStateRef to MEASURED to indicate that a valid measurement has 
          been taken. This ensures visibility checks only proceed after initial measurement */
          measurementStateRef.current = MeasurementState.MEASURED;
        }
      );
    }, [active, rectDimensions]);

    useInterval(measureInnerView, delay || 100);

    const startWatching = useCallback(() => {
      if (!active) setActive(true);
    }, [active]);

    const stopWatching = useCallback(() => {
      if (active) {
        setActive(false);
        /* Reset measurement state when stopping to ensure fresh measurements
        when the sensor is reactivated */
        measurementStateRef.current = MeasurementState.IDLE; // Reset state
      }
    }, [active]);

    // Effect to trigger initial measurement when component becomes active:
    useEffect(() => {
      let timer: ReturnType<typeof setTimeout>;

      if (active && measurementStateRef.current === MeasurementState.IDLE) {
        // Use setTimeout with 0 delay to ensure layout is complete
        timer = setTimeout(() => {
          measureInnerView();
        }, 0);
      }

      return () => {
        if (timer) clearTimeout(timer);
      };
    }, [active, measureInnerView]);

    // Reset measurement state when dimensions change:
    useEffect(() => {
      if (
        isMountedRef.current &&
        measurementStateRef.current === MeasurementState.MEASURED
      ) {
        // Reset measurement state to force remeasurement with new dimensions
        measurementStateRef.current = MeasurementState.IDLE;
      }
    }, [window]);

    useEffect(() => {
      isMountedRef.current = true;
      return () => {
        isMountedRef.current = false;
      };
    }, []);

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
      if (
        !active ||
        measurementStateRef.current !== MeasurementState.MEASURED ||
        !isMountedRef.current
      ) {
        return;
      }

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
    }, [rectDimensions, window, lastValue, active]);

    return (
      <View ref={localRef} {...rest}>
        {children}
      </View>
    );
  }
);

export default VisibilitySensor;
