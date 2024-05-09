# react-native-visibility-sensor

🔍 Component visibility sensor wrapper to sense whether or not a component is in viewport. 

It works on **Android, iOS & Web** .

<table border="0">
 <tr>
    <td style="width: 50%; border-color: transparent;">

## Installation

#### using npm
```sh
npm install react-native-visibility-sensor
```
#### using Yarn
```sh
yarn add react-native-visibility-sensor
```


## Usage

```typescript
import { VisibilitySensor } from 'react-native-visibility-sensor';

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
