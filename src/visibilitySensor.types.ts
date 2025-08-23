import type { View, ViewProps } from 'react-native';

export interface VisibilitySensorProps extends ViewProps {
  onChange: (visible: boolean) => void;
  onPercentVisibleChange?: (percent: number) => void;
  disabled?: boolean;
  triggerOnce?: boolean;
  delay?: number | undefined;
  threshold?: VisibilitySensorThreshold;
}

export interface VisibilitySensorRef {
  getInnerRef: () => View | null;
}

export interface VisibilitySensorThreshold {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export interface RectDimensionsState {
  rectTop: number;
  rectBottom: number;
  rectWidth: number;
  rectHeight: number;
  rectLeft: number;
  rectRight: number;
}
