// SpatialNavigationRoot.tsx
import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { View, ViewProps, Platform, useTVEventHandler } from 'react-native';

export interface RootContextProps {
  registerNode: (id: string, ref: React.RefObject<any>) => void;
  unregisterNode: (id: string) => void;
  focusNode: (id: string) => void;
  focusedNode: string | null;
}

export const SpatialContext = createContext<RootContextProps | null>(null);

export interface SpatialNavigationRootProps extends ViewProps {}

export const SpatialNavigationRoot: React.FC<SpatialNavigationRootProps> = ({
  children,
  style,
  ...props
}) => {
  const [nodes, setNodes] = useState(new Map<string, React.RefObject<any>>());
  const [focusedNode, setFocusedNode] = useState<string | null>(null);

  // stable register/unregister
  const registerNode = useCallback((id: string, ref: React.RefObject<any>) => {
    setNodes(prev => {
      const next = new Map(prev);
      next.set(id, ref);
      return next;
    });
  }, []);

  const unregisterNode = useCallback((id: string) => {
    setNodes(prev => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  // stable focusNode
  const focusNode = useCallback((id: string) => {
    const ref = nodes.get(id);
    if (ref?.current && typeof ref.current.focus === 'function') {
      ref.current.focus();
      setFocusedNode(id);
      console.log('🔵 focusedNode is now:', id);
    }
  }, [nodes]);

  // handle remote nav
  const handleTVEvent = useCallback(
    (evt: { eventType?: string }) => {
      if (!Platform.isTV || !evt.eventType || !focusedNode) return;
      const ids = Array.from(nodes.keys());
      const idx = ids.indexOf(focusedNode);
      let next = idx;
      switch (evt.eventType) {
        case 'right':
        case 'down':
          next = (idx + 1) % ids.length;
          break;
        case 'left':
        case 'up':
          next = (idx - 1 + ids.length) % ids.length;
          break;
        default:
          return;
      }
      focusNode(ids[next]);
    },
    [nodes, focusedNode, focusNode]
  );
  useTVEventHandler(handleTVEvent);

  // auto-focus first node once
  useEffect(() => {
    if (!focusedNode && nodes.size > 0) {
      const first = nodes.keys().next().value;
      focusNode(first);
    }
  }, [nodes, focusedNode, focusNode]);

  // memoize context so children only re-render on actual value changes
  const contextValue = useMemo(
    () => ({ registerNode, unregisterNode, focusNode, focusedNode }),
    [registerNode, unregisterNode, focusNode, focusedNode]
  );

  return (
    <SpatialContext.Provider value={contextValue}>
      <View style={style} {...props}>
        {children}
      </View>
    </SpatialContext.Provider>
  );
};
