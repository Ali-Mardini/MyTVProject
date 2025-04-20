// App.tsx
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, useTVEventHandler } from 'react-native';
import {
  SpatialNavigationRoot,
  SpatialNavigationNode,
  SpatialNavigationScrollView,
  useSpatialNavigator,
} from 'react-tv-spatial-navigator';

export default function App() {
  return (
    <SpatialNavigationRoot style={styles.container}>
      <TVDemo />
    </SpatialNavigationRoot>
  );
}

function TVDemo() {
  const { focusNode } = useSpatialNavigator();

  // 1) Programmatically focus boxA on mount
  useEffect(() => {
    focusNode('boxA');
  }, [focusNode]);

  // 2) Listen to TV remote events
  useTVEventHandler((evt) => {
    if (!evt?.eventType) return;
    switch (evt.eventType) {
      case 'up':
        console.log('up');
        focusNode('item-2');
        break;
      case 'down':
        focusNode('boxB');
        console.log('down');
        break;
      case 'left':
        console.log('left');
        focusNode('boxA');
        break;
      case 'right':
        focusNode('boxB');
        console.log('right');
        break;
    }
  });

  return (
    <View style={styles.inner}>
      {/* Two focusable boxes */}
      <View style={styles.row}>
        <SpatialNavigationNode
          nodeId="boxA"
          style={styles.box}
          focusStyle={styles.focusBox}
        >
          <Text style={styles.boxText}>A</Text>
        </SpatialNavigationNode>
        <SpatialNavigationNode
          nodeId="boxB"
          style={styles.box}
          focusStyle={styles.focusBox}
        >
          <Text style={styles.boxText}>B</Text>
        </SpatialNavigationNode>
      </View>

      {/* Horizontal paging list */}
      <SpatialNavigationScrollView style={styles.scrollRow}>
        {Array.from({ length: 5 }).map((_, i) => (
          <View id={`item-${i}`} key={i} style={styles.tile}>
            <Text style={styles.tileText}>Item {i + 1}</Text>
          </View>
        ))}
      </SpatialNavigationScrollView>    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  inner: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  box: {
    width: 120,
    height: 120,
    marginRight: 20,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  boxText: {
    color: '#fff',
    fontSize: 24,
  },
  focusBox: {
    borderWidth: 3,
    borderColor: '#0af',
    backgroundColor: '#8a4d4d',
  },
  scrollRow: {
    height: 140,
    marginBottom: 30,
  },
  tile: {
    width: 140,
    height: 140,
    marginRight: 16,
    backgroundColor: '#444',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  tileText: {
    color: '#fff',
  },
  link: {
    color: '#0af',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
