/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import {observer} from 'mobx-react/native'
import {observable} from 'mobx'


import {
  PropTypes,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';


import React, {Component} from 'react'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10
  }
});


@observer class CounterUI extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Mobx Counter</Text>
        <TouchableHighlight onPress={() => this.props.store.increment()}>
          <Text style={styles.text}>| + | </Text>
        </TouchableHighlight>

        <Text style={styles.text}>Clicked: {this.props.store.counter} times</Text>

        <TouchableHighlight onPress={() => this.props.store.decrement()}>
          <Text style={styles.text}>| - | </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this.props.store.incrementAsync()}>
          <Text style={styles.text}>| + Async | </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const counterStore = observable({
  counter: 0
})

counterStore.increment = function () {
  this.counter++
}

counterStore.decrement = function () {
  this.counter--
}

counterStore.incrementAsync = function () {
  setTimeout(() => {
    this.counter++
  }, 1000)
}


export default function () {
  return <CounterUI store={counterStore}/>
}
