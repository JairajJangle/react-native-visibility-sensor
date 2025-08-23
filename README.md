# @futurejj/react-native-visibility-sensor

🔍 Component visibility sensor wrapper to sense whether or not a component is in viewport with configurable inset thresholds. 

[![npm version](https://img.shields.io/npm/v/%40futurejj%2Freact-native-visibility-sensor)](https://badge.fury.io/js/%40futurejj%2Freact-native-visibility-sensor) [![License](https://img.shields.io/github/license/JairajJangle/react-native-visibility-sensor)](https://github.com/JairajJangle/react-native-visibility-sensor/blob/main/LICENSE) [![Workflow Status](https://github.com/JairajJangle/react-native-visibility-sensor/actions/workflows/ci.yml/badge.svg)](https://github.com/JairajJangle/react-native-visibility-sensor/actions/workflows/ci.yml)  ![Android](https://img.shields.io/badge/-Android-555555?logo=android&logoColor=3DDC84) ![iOS](https://img.shields.io/badge/-iOS-555555?logo=apple&logoColor=white) ![Web](https://img.shields.io/badge/-Web-555555?logo=google-chrome&logoColor=0096FF) [![GitHub issues](https://img.shields.io/github/issues/JairajJangle/react-native-visibility-sensor)](https://github.com/JairajJangle/react-native-visibility-sensor/issues?q=is%3Aopen+is%3Aissue) ![TS](https://img.shields.io/badge/TypeScript-strict_💪-blue) [![Expo Snack](https://img.shields.io/badge/Expo%20Snack-555555?style=flat&logo=expo&logoColor=white)](https://snack.expo.dev/@futurejj/react-native-visibility-sensor-example) ![NPM Downloads](https://img.shields.io/npm/dm/%40futurejj%2Freact-native-visibility-sensor) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/%40futurejj%2Freact-native-visibility-sensor)

<div align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTlsaGEyaXd4ZDdicWdtYnM4d3FibWltZjJwd3RrOG80b2pzemQ4dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hNCfKTz7YMuDPIM7eV/giphy.gif" alt="Visibility Sensor demo" style="border: 1px solid gray;" />
</div>


## Installation

Using yarn 

```sh
yarn add @futurejj/react-native-visibility-sensor
```

using npm:

```sh
npm install @futurejj/react-native-visibility-sensor
```


## Usage

```tsx
import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { VisibilitySensor } from '@futurejj/react-native-visibility-sensor';

export default function VisibilitySensorExample() {
  const [isVisible, setIsVisible] = useState(false);
  const [percentVisible, setPercentVisible] = useState<number>(0);

  return (
    <ScrollView>
      <VisibilitySensor
        onChange={setIsVisible}
        onPercentChange={setPercentVisible} // optional callback for % change
        threshold={{ top: 100, bottom: 100 }}
        style={[styles.item, { backgroundColor: isVisible ? 'green' : 'red' }]}>
          
        {/* Visibility state */}
        <Text>This View is currently visible? {isVisible ? 'yes' : 'no'}</Text>

        {/* Percent visibility state */}
        <Text>{`Percent visible: ${percentVisible}%`}</Text>
      </VisibilitySensor>
    </ScrollView>
  );
}
```
### Properties

`VisibilitySensorProps` extends `ViewProps` from React Native, which includes common properties for all views, such as `style`, `onLayout`, etc. 

| Property        | Type                                                    | Required | Description                                                  |
| --------------- | ------------------------------------------------------- | -------- | ------------------------------------------------------------ |
| onChange        | (visible: boolean) => void                              | Yes      | Callback function that fires when visibility changes.        |
| onPercentChange | (percentVisible: number) => void                        | No       | Callback function that fires when visibility % changes.      |
| disabled        | boolean                                                 | No       | If `true`, disables the sensor.                              |
| triggerOnce     | boolean                                                 | No       | If `true`, the sensor will only trigger once.                |
| delay           | number \| undefined                                     | No       | The delay in milliseconds before the sensor triggers.        |
| threshold       | [VisibilitySensorThreshold](#visibilitysensorthreshold) | No       | Defines the part of the view that must be visible for the sensor to trigger. |

Additionally, all properties from `ViewProps` are also applicable. 

---

### VisibilitySensorThreshold

| Property | Type   | Required | Description                                |
| -------- | ------ | -------- | ------------------------------------------ |
| top      | number | No       | The top threshold value for visibility.    |
| bottom   | number | No       | The bottom threshold value for visibility. |
| left     | number | No       | The left threshold value for visibility.   |
| right    | number | No       | The right threshold value for visibility.  |

---

## Notes 

1. ⚠️ Facing problem on Android? Refer this discussion: https://github.com/JairajJangle/react-native-visibility-sensor/pull/1#issuecomment-2251569005

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

## Support the project

<p align="center" valign="center">
  <a href="https://liberapay.com/FutureJJ/donate">
    <img src="https://liberapay.com/assets/widgets/donate.svg" alt="LiberPay_Donation_Button" height="50" > 
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href=".github/assets/Jairaj_Jangle_Google_Pay_UPI_QR_Code.jpg">
    <img src=".github/assets/upi.png" alt="Paypal_Donation_Button" height="50" >
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://www.paypal.com/paypalme/jairajjangle001/usd">
    <img src=".github/assets/paypal_donate.png" alt="Paypal_Donation_Button" height="50" >
  </a>
</p>


## ❤️ Thanks to 

- Module built using [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
- Forked & detached from: [react-native-component-inview](https://github.com/changey/react-native-component-inview) & [@se09deluca/react-native-component-inview](https://github.com/se09deluca/react-native-component-inview)
- Pokemon image source: [PokémonDB](https://pokemondb.net/)
- Readme is edited using [Typora](https://typora.io/)

---
