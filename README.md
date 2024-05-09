# @futurejj/react-native-visibility-sensor

🔍 Component visibility sensor wrapper to sense whether or not a component is in viewport. 

[![npm version](https://img.shields.io/npm/v/%40futurejj%2Freact-native-visibility-sensor)](https://badge.fury.io/js/%40futurejj%2Freact-native-visibility-sensor) [![License](https://img.shields.io/github/license/JairajJangle/react-native-visibility-sensor)](https://github.com/JairajJangle/react-native-visibility-sensor/blob/main/LICENSE) [![Supported Platform Badge](https://img.shields.io/badge/platform-android%20%26%20ios-blue)](https://github.com/JairajJangle/react-native-visibility-sensor/tree/main/example) [![GitHub issues](https://img.shields.io/github/issues/JairajJangle/react-native-visibility-sensor)](https://github.com/JairajJangle/react-native-visibility-sensor/issues?q=is%3Aopen+is%3Aissue) ![TS](https://img.shields.io/badge/TypeScript-strict_💪-blue)


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

```typescript
import { VisibilitySensor } from '@futurejj/react-native-visibility-sensor';

const [isInView, setIsInView] = useState(false)

const checkVisible = (isVisible: boolean) => {
  if (isVisible){
    setIsInView(isVisible)
  } else {
    setIsInView(isVisible)
  }
}

<ScrollView>
  <VisibilitySensor onChange={(isVisible) => this.checkVisible(isVisible)}>
    <View style={[styles.item, {backgroundColor: isInView ? 'yellow' : '#f9c2ff'}]}>
      <Text>This View is currently visible? {isInView ? 'yes': 'no'}</Text>
    </View>
  </VisibilitySensor>
</ScrollView>

// ...
```
</td>

<td style="width: 50%; min-width: 200px; border-color: transparent; text-align: center;">

## Demo

  <img src="https://drive.google.com/uc?export=view&id=1jjU2o1SnUEMvFR9MMqQHOaGtPOVdW7M-" style="width: 250px; max-width: 100%; height: auto" title="The original legends in a demo." alt="demo"/>
</td>
 </tr>
</table>


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
