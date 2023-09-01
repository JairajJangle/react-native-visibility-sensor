# react-native-component-inview

A React Native wrapper to check whether a component is in the view port to track impressions and clicks

<table border="0">
 <tr>
    <td style="width: 50%; border-color: transparent;">

## Installation

#### using npm
```sh
npm install react-native-component-inview
```
#### using Yarn
```sh
yarn add react-native-component-inview
```


## Usage

```js
import InView from 'react-native-component-inview'

const [isInView, setIsInView] = useState(false)

const checkVisible = (isVisible:boolean) => {
  if (isVisible){
    setIsInView(isVisible)
  } else {
    setIsInView(isVisible)
  }
}

<ScrollView>
  <InView onChange={(isVisible) => this.checkVisible(isVisible)}>
    <View style={[styles.item, {backgroundColor: isInView ? 'yellow' : '#f9c2ff'}]}>
      <Text>This View is currently visible? {isInView ? 'yes': 'no'}</Text>
    </View>
  </InView>
</ScrollView>

// ...
```
</td>

<td style="width: 50%; border-color: transparent; text-align: center;">

## Demo

  <a href="https://drive.google.com/uc?export=view&id=1bXfE6KDroe6az1qyhZNLtFoJ_7LRcvVD"><img src="https://drive.google.com/uc?export=view&id=1bXfE6KDroe6az1qyhZNLtFoJ_7LRcvVD" style="width: 250px; max-width: 100%; height: auto" title="The original legends in a demo." alt="demo" ></a>
</td>
 </tr>
</table>


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
