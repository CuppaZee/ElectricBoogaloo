import React, { MutableRefObject } from "react";
import { ScrollViewProps } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export function useSyncScrollViewController() {
  return React.useRef<SyncScrollViewController["current"]>({ views: [] });
}

export type SyncScrollViewController = MutableRefObject<{
  views: ScrollView[];
  lastScrollEvent_x?: number;
  lastScrollEvent_y?: number;
}>;

export default function SyncScrollView({
  controller,
  onScroll,
  ...rest
}: React.PropsWithChildren<ScrollViewProps> & { controller?: SyncScrollViewController }) {
  const thisRef = React.useRef<ScrollView>();
  if (!controller) {
    return <ScrollView {...rest} onScroll={onScroll} />
  }
  return (
    <ScrollView
      scrollEventThrottle={8}
      {...rest}
      ref={ref => {
        if (!ref) return;
        thisRef.current = ref;
        controller.current.views.push(ref);
      }}
      onScroll={ev => {
        onScroll?.(ev);
        if (
          ev.nativeEvent.contentOffset.x === controller.current.lastScrollEvent_x &&
          ev.nativeEvent.contentOffset.y === controller.current.lastScrollEvent_y
        )
          return;
        const interval = rest.snapToInterval ?? 1;
        const x =
          ev.nativeEvent.contentOffset.x ===
          ev.nativeEvent.contentSize.width - ev.nativeEvent.layoutMeasurement.width
            ? ev.nativeEvent.contentOffset.x
            : Math.floor(ev.nativeEvent.contentOffset.x / interval) * interval;
        const y =
          ev.nativeEvent.contentOffset.y ===
          ev.nativeEvent.contentSize.height - ev.nativeEvent.layoutMeasurement.height
            ? ev.nativeEvent.contentOffset.y
            : Math.floor(ev.nativeEvent.contentOffset.y / interval) * interval;
        controller.current.lastScrollEvent_x = x;
        controller.current.lastScrollEvent_y = y;
        controller.current.views.forEach(sv => {
          if (sv !== thisRef.current) {
            sv.scrollTo({
              x,
              y,
              animated: false,
            });
          }
        });
      }}
    />
  );
}
