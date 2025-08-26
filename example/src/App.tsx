import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import { VisibilitySensor } from '@futurejj/react-native-visibility-sensor';
import { pocketMonsters, type PocketMonsterInfo } from './pocketMonsters';

const topThreshold = 200;
const bottomThreshold = 200;

export default function App() {
  const renderItems: ListRenderItem<PocketMonsterInfo> = ({ item }) => (
    <View style={styles.spacer}>
      <PocketMonsterView {...item} />
    </View>
  );

  return (
    <>
      <FlatList
        data={pocketMonsters}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderItems}
        contentContainerStyle={styles.flatListContentContainer}
        ListHeaderComponent={<View style={styles.listHeaderFooter} />}
        ListFooterComponent={<View style={styles.listHeaderFooter} />}
      />

      {/* Threshold indicators - just to visualize the threshold boundaries */}
      {/* Top */}
      <View
        style={[styles.thresholdIndicatorBase, styles.topThresholdIndicator]}
      />
      {/* Bottom */}
      <View
        style={[styles.thresholdIndicatorBase, styles.bottomThresholdIndicator]}
      />
    </>
  );
}

const PocketMonsterView = ({
  name,
  spriteUri,
}: {
  name: string;
  spriteUri: string;
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [percentVisible, setPercentVisible] = useState<number>(0);

  useEffect(() => {
    console.log(
      // eslint-disable-next-line prettier/prettier
      `${name} ${isVisible ? 'is now' : "isn't"} visible ${isVisible && !isVisible ? 'anymore' : ''
      }`
    );
  }, [name, isVisible]);

  return (
    <VisibilitySensor
      threshold={{ top: topThreshold, bottom: bottomThreshold }}
      onPercentChange={setPercentVisible}
      onChange={setIsVisible}
      style={[
        styles.visibilitySensor,
        isVisible ? styles.visible : styles.notVisible,
      ]}
    >
      {/* Header percent visible text - to see % when the bottom is out of viewport */}
      <Text
        style={[
          styles.pocketMonstersPercentVisibilityTextBase,
          styles.pocketMonsterPercentVisibilityHeader,
        ]}
      >
        Percent Visible: {percentVisible}
      </Text>

      {/* Image */}
      <Image
        source={{ uri: spriteUri }}
        style={[
          styles.pocketMonster,
          isVisible
            ? styles.pocketMonsterVisible
            : styles.pocketMonsterNotVisible,
        ]}
        resizeMode={'contain'}
      />
      {/* Name */}
      <Text style={styles.pocketMonsterName}>{name}</Text>

      {/* Footer percent visible text - to see % when the top is out of viewport */}
      <Text
        style={[
          styles.pocketMonstersPercentVisibilityTextBase,
          styles.pocketMonsterPercentVisibilityFooter,
        ]}
      >
        Percent Visible: {percentVisible}
      </Text>
    </VisibilitySensor>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContentContainer: {
    alignItems: 'center',
  },
  spacer: {
    marginHorizontal: 35,
  },

  thresholdIndicatorBase: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    zIndex: 9999,
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
  },
  topThresholdIndicator: {
    top: 0,
    height: topThreshold,
  },
  bottomThresholdIndicator: {
    bottom: 0,
    height: bottomThreshold,
  },

  pocketMonster: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  pocketMonsterVisible: {
    opacity: 1,
  },
  pocketMonsterNotVisible: {
    opacity: 0.4,
  },
  pocketMonsterName: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 16,
    fontSize: 26,
  },

  pocketMonstersPercentVisibilityTextBase: {
    textAlign: 'center',
    fontSize: 16,
  },
  pocketMonsterPercentVisibilityHeader: {
    marginBottom: 10,
  },
  pocketMonsterPercentVisibilityFooter: {
    marginTop: 10,
  },

  listHeaderFooter: {
    padding: 40,
  },
  visibilitySensor: {
    marginBottom: 20,
    width: 320,
    height: 320,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visible: {
    backgroundColor: 'yellow',
  },
  notVisible: {
    backgroundColor: 'pink',
    opacity: 0.8,
  },
});
