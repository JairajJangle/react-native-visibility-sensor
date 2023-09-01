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
import { InView } from '@se09deluca/react-native-component-inview';
import { pocketMonsters, type PocketMonsterInfo } from './pocketMonsters';
import { useMemo, useState } from 'react';

export default function App() {
  const renderItems: ListRenderItem<PocketMonsterInfo> = ({ item }) => (
    <View style={styles.spacer}>
      <InViewPocketMonster {...item} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal={true}
        data={pocketMonsters}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderItems}
        contentContainerStyle={styles.flatListContentContainer}
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
  const [isInView, setIsInView] = useState(false);

  const opacity = useMemo(() => ({ opacity: isInView ? 1 : 0.4 }), [isInView]);

  const checkVisible = (isVisible: boolean) => {
    if (isVisible) {
      setIsInView(isVisible);
    } else {
      setIsInView(isVisible);
    }
  };
  return (
    <InView onChange={checkVisible}>
      {}
      <View style={opacity}>
        <Image
          source={{ uri: spriteUri }}
          style={styles.pocketMonster}
          resizeMode={'contain'}
        />
        <Text style={styles.pocketMonsterName}>{name}</Text>
      </View>
    </InView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  flatListContentContainer: { alignItems: 'center', marginStart: 20 },
  spacer: { marginEnd: 100 },
  pocketMonster: { width: 200, height: 200 },
  pocketMonsterName: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 16,
    fontSize: 20,
  },
});
