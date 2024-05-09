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
import { useCallback, useMemo, useState } from 'react';

export default function App() {
  const renderItems: ListRenderItem<PocketMonsterInfo> = ({ item }) => (
    <View style={styles.spacer}>
      <InViewPocketMonster {...item} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal
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

  const opacity = useMemo(() => ({ opacity: isInView ? 1 : 0.4 }), [isInView]);

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
        left: 100,
        right: 100,
      }}
      onChange={checkVisible}
    >
      <View style={opacity}>
        <Image
          source={{ uri: spriteUri }}
          style={styles.pocketMonster}
          resizeMode={'contain'}
        />
        <Text style={styles.pocketMonsterName}>{name}</Text>
      </View>
    </VisibilitySensor>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  flatListContentContainer: {
    alignItems: 'center',
  },
  spacer: { marginHorizontal: 35 },
  pocketMonster: { width: 200, height: 200 },
  pocketMonsterName: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 16,
    fontSize: 20,
  },
  listHeaderFooter: {
    padding: 45,
  },
});
