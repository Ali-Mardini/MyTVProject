// src/useNodeFocus.ts
import { useContext } from 'react';
import { SpatialContext } from './SpatialNavigationRoot';

export function useNodeFocus(): (id: string) => void {
  const ctx = useContext(SpatialContext);
  if (!ctx) {
    throw new Error('useNodeFocus must be used within a <SpatialNavigationRoot>');
  }
  return ctx.focusNode;
}
