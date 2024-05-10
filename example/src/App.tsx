import * as React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import { VisibilitySensor } from '@futurejj/react-native-visibility-sensor';
import { pocketMonsters, type PocketMonsterInfo } from './pocketMonsters';
import { useCallback, useState } from 'react';

export default function App() {
  const renderItems: ListRenderItem<PocketMonsterInfo> = ({ item }) => (
    <View style={styles.spacer}>
      <InViewPocketMonster {...item} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pocketMonsters}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderItems}
        contentContainerStyle={styles.flatListContentContainer}
        ListHeaderComponent={<View style={styles.listHeaderFooter} />}
        ListFooterComponent={<View style={styles.listHeaderFooter} />}
      />
    </SafeAreaView>
  );
}

const InViewPocketMonster = ({
  name,
  spriteUri,
}: {
  name: string;
  spriteUri: string;
}) => {
  const [isInView, setIsInView] = useState<boolean>(false);

  const checkVisible = useCallback(
    (isVisible: boolean) => {
      setIsInView(isVisible);

      console.log(
        // eslint-disable-next-line prettier/prettier
        `${name} ${isVisible ? 'is now' : "isn't"} visible ${isInView && !isVisible ? 'anymore' : ''
        }`
      );
    },
    [name, isInView]
  );
  return (
    <VisibilitySensor
      threshold={{
        top: 300,
        bottom: 300,
      }}
      onChange={checkVisible}
      style={[
        styles.visibilitySensor,
        isInView ? styles.inView : styles.notInView,
      ]}
    >
      <Image
        source={{ uri: spriteUri }}
        style={[
          styles.pocketMonster,
          isInView ? styles.pocketMonsterInView : styles.pocketMonsterNotInView,
        ]}
        resizeMode={'contain'}
      />
      <Text style={styles.pocketMonsterName}>{name}</Text>
    </VisibilitySensor>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  flatListContentContainer: {
    alignItems: 'center',
  },
  spacer: { marginHorizontal: 35 },
  pocketMonster: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  pocketMonsterInView: {
    opacity: 1,
  },
  pocketMonsterNotInView: {
    opacity: 0.4,
  },
  pocketMonsterName: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 16,
    fontSize: 26,
  },
  listHeaderFooter: {
    padding: 20,
  },
  visibilitySensor: {
    marginBottom: 20,
    width: 300,
    height: 300,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inView: {
    backgroundColor: 'yellow',
  },
  notInView: {
    backgroundColor: 'pink',
    opacity: 0.8,
  },
});
