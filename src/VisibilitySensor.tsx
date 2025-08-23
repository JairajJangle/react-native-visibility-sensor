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
      onPercentChange,
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
    const lastPercentRef = useRef<number | undefined>(undefined);

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

      // Calculate percent visible if callback is requested / provided
      if (
        onPercentChange &&
        rectDimensions.rectWidth > 0 &&
        rectDimensions.rectHeight > 0 &&
        isVisible // Don't perform % calculation if not visible for efficiency
      ) {
        // Thresholds reduce the effective viewport
        const viewportTop = 0 + (threshold.top || 0);
        const viewportBottom = window.height - (threshold.bottom || 0);
        const viewportLeft = 0 + (threshold.left || 0);
        const viewportRight = window.width - (threshold.right || 0);

        // Calculate the visible portion of the element within the reduced viewport
        const visibleTop = Math.max(viewportTop, rectDimensions.rectTop);
        const visibleBottom = Math.min(
          viewportBottom,
          rectDimensions.rectBottom
        );
        const visibleLeft = Math.max(viewportLeft, rectDimensions.rectLeft);
        const visibleRight = Math.min(viewportRight, rectDimensions.rectRight);

        // Calculate visible dimensions
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibleWidth = Math.max(0, visibleRight - visibleLeft);

        // Calculate percent visible based on actual element area
        const visibleArea = visibleHeight * visibleWidth;
        const totalArea = rectDimensions.rectHeight * rectDimensions.rectWidth;
        const percentVisible =
          totalArea > 0 ? Math.round((visibleArea / totalArea) * 100) : 0;

        // Only fire callback if percent has changed
        if (lastPercentRef.current !== percentVisible) {
          lastPercentRef.current = percentVisible;
          onPercentChange(percentVisible);
        }
      } else if (
        onPercentChange &&
        rectDimensions.rectWidth > 0 &&
        rectDimensions.rectHeight > 0 &&
        !isVisible // If not visible, always report 0%
      ) {
        onPercentChange(0);
      }

      if (lastValue !== isVisible) {
        setLastValue(isVisible);
        onChange(isVisible);
        if (isVisible && triggerOnce) {
          stopWatching();
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rectDimensions, window, lastValue, active, onPercentChange]);

    return (
      <View ref={localRef} {...rest}>
        {children}
      </View>
    );
  }
);

export default VisibilitySensor;
