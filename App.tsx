// App.tsx
import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {
  SpatialNavigationRoot,
  SpatialNavigationNode,
  SpatialNavigationScrollView,
  useNodeFocus
} from "./lib/src/index";

export default function App() {

  return (
    <SpatialNavigationRoot style={styles.container}>
      <TVDemo />
    </SpatialNavigationRoot>
  );
}

function TVDemo() {
  const focusNode = useNodeFocus();     // ← now you have the focusNode function

  return (
    <View style={styles.inner}>
      {/* Two focusable boxes */}
      <View style={styles.row}>
        <SpatialNavigationNode
          nodeId='boxA'
          style={styles.box}
          focusStyle={styles.focusBox}
        >
          <Text style={styles.boxText}>A</Text>
        </SpatialNavigationNode>

        <SpatialNavigationNode
          nodeId='boxB'
          style={styles.box}
          focusStyle={styles.focusBox}
        >
          <Text style={styles.boxText}>B</Text>
        </SpatialNavigationNode>

        <Button
          title='Click me'
          onPress={() => focusNode("item-2")}
          />
      </View>

      {/* Horizontal paging list—each item is now focusable */}
      <SpatialNavigationScrollView style={styles.scrollRow}>
        {Array.from({length: 15}).map((_, i) => (
          <SpatialNavigationNode
            key={i}
            nodeId={`item-${i}`}
            style={styles.tile}
            focusStyle={styles.focusBox}
          >
            <Text style={styles.tileText}>Item {i + 1}</Text>
          </SpatialNavigationNode>
        ))}
      </SpatialNavigationScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: "#111"},
  inner: {flex: 1, padding: 20},
  row: {flexDirection: "row", marginBottom: 30},
  box: {
    width: 120,
    height: 120,
    marginRight: 20,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  boxText: {color: "#fff", fontSize: 24},
  focusBox: {borderWidth: 3, borderColor: "#0af", backgroundColor: "#7AC6D2"},
  scrollRow: {height: 140, marginBottom: 30},
  tile: {
    width: 140,
    height: 140,
    marginRight: 16,
    backgroundColor: "#444",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  tileText: {color: "#fff"},
});
