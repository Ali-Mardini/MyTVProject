// lib/src/useNodeFocus.ts
import { useContext } from "react";
import { SpatialContext } from "./SpatialNavigationRoot";

export function useNodeFocus() {
  const ctx = useContext(SpatialContext);
  if (!ctx) throw new Error("useNodeFocus must be used within SpatialNavigationRoot");
  return ctx.focusNode;
}
