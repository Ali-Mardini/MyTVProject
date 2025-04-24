// SpatialNavigationNode.tsx
import React, { useContext, useEffect, useRef } from 'react';
import {
  View,
  ViewProps,
  StyleProp,
  ViewStyle,
  Platform,
} from 'react-native';
import { SpatialContext } from './SpatialNavigationRoot';

export interface NodeProps extends ViewProps {
  nodeId: string;
  focusStyle?: StyleProp<ViewStyle>;
}

export const SpatialNavigationNode: React.FC<NodeProps> = ({
  nodeId,
  children,
  style,
  focusStyle,
  ...props
}) => {
  const ref = useRef<View>(null);
  const ctx = useContext(SpatialContext);
  if (!ctx) throw new Error('Missing SpatialContext.Provider');

  // only run on mount/unmount
  const { registerNode, unregisterNode, focusNode, focusedNode } = ctx;
  useEffect(() => {
    registerNode(nodeId, ref);
    return () => unregisterNode(nodeId);
  }, [nodeId, registerNode, unregisterNode]);

  const isFocused = focusedNode === nodeId;

  // non-TV fallback
  if (!Platform.isTV) {
    return (
      <View ref={ref} style={style} {...props}>
        {children}
      </View>
    );
  }

  // TV view
  return (
    <View
      ref={ref}
      focusable
      style={[
        style,
        isFocused && focusStyle,
        {
          transform: [{ scale: isFocused ? 1.05 : 1 }],
          shadowColor: '#000',
          shadowOpacity: isFocused ? 0.3 : 0,
          shadowRadius: isFocused ? 5 : 0,
          shadowOffset: { width: 0, height: 2 },
        },
      ]}
      onFocus={() => focusNode(nodeId)}
      {...props}
    >
      {children}
    </View>
  );
};
