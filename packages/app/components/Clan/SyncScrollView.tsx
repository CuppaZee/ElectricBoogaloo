import React, { MutableRefObject } from "react";
import { ScrollViewProps } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export function useSyncScrollViewController() {
  return React.useRef<SyncScrollViewController["current"]>({ views: [], lastScrollEvent: 0 });
}

export type SyncScrollViewController = MutableRefObject<{
  views: ScrollView[];
  lastScrollEvent: number;
  lastScrollRef?: ScrollView;
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
          controller.current.lastScrollEvent >= Date.now() - 500 && controller.current.lastScrollRef !== thisRef.current
        )
          return;
        const x = ev.nativeEvent.contentOffset.x;
        const y = ev.nativeEvent.contentOffset.y;
        controller.current.lastScrollEvent = Date.now();
        controller.current.lastScrollRef = thisRef.current;
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
