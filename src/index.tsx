import React, { Component } from 'react';
import { Dimensions, type ScaledSize, View } from 'react-native';

export interface InViewProps {
  onChange: (visible: boolean) => void;
  disabled?: boolean;
  triggerOnce?: boolean;
  delay?: number | undefined;
}

type InViewState = {
  rectTop: number;
  rectBottom: number;
  rectWidth: number;
};

export class InView extends Component<InViewProps, InViewState> {
  private lastValue: boolean | null | undefined;
  private interval: NodeJS.Timeout | undefined;
  private myView: any;
  constructor(props: InViewProps) {
    super(props);
    this.state = { rectTop: 0, rectBottom: 0, rectWidth: 0 };
  }

  componentDidMount() {
    if (!this.props.disabled) {
      this.startWatching();
    }
  }

  componentWillUnmount() {
    this.stopWatching();
  }

  componentDidUpdate(nextProps: InViewProps) {
    if (nextProps.disabled) {
      this.stopWatching();
    } else {
      this.lastValue = null;
      this.startWatching();
    }
  }

  startWatching() {
    if (this.interval) {
      return;
    }
    this.interval = setInterval(() => {
      if (!this.myView) {
        return;
      }
      this.myView.measure(
        (
          _x: number,
          _y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => {
          this.setState({
            rectTop: pageY,
            rectBottom: pageY + height,
            rectWidth: pageX + width,
          });
        }
      );
      this.isInViewPort();
    }, this.props.delay || 100);
  }

  stopWatching() {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  isInViewPort() {
    const window: ScaledSize = Dimensions.get('window');
    const isVisible: boolean =
      this.state.rectBottom !== 0 &&
      this.state.rectTop >= 0 &&
      this.state.rectBottom <= window.height &&
      this.state.rectWidth > 0 &&
      this.state.rectWidth <= window.width;
    if (this.lastValue !== isVisible) {
      this.lastValue = isVisible;
      this.props.onChange(isVisible);
      if (isVisible) {
        if (this.props.triggerOnce) {
          this.stopWatching();
        }
      }
    }
  }

  render() {
    return (
      <View
        ref={(component) => {
          this.myView = component;
        }}
        {...this.props}
      >
        {this.props.children}
      </View>
    );
  }
}
