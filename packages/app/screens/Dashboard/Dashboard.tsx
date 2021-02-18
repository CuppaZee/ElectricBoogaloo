import { Icon, Layout, useTheme } from "@ui-kitten/components";
import * as React from "react";
import {
  FlatList,
  Image,
  LayoutChangeEvent,
  Platform,
  Pressable,
  View,
  ViewProps,
} from "react-native";
import builds from "../../builds";
import Loading from "../../components/Loading";
import { useUserBookmarks } from "../../hooks/useBookmarks";
import useComponentSize from "../../hooks/useComponentSize";
import { useSettings } from "../../hooks/useSettings";
import useTitle from "../../hooks/useTitle";
import ChangesDashCard from "./Changes";
import ClansDashCard from "./Clans";
import UserDashCard from "./User";

function WheelWrapper({
  onWheel,
  children,
}: React.PropsWithChildren<{ onWheel: (event: React.WheelEvent<HTMLDivElement>) => void }>) {
  if (Platform.OS === "web")
    return (
      <div
        style={{ display: "flex", flexGrow: 1, flexShrink: 1, overflow: "hidden" }}
        className="snap-item-center"
        onWheel={onWheel}>
        <style>
          {".snap-item-center > div > div > div { scroll-snap-align: center !important }"}
        </style>
        {children}
      </div>
    );
  return <>{children}</>;
}

const FlexView = (props: ViewProps) => <View {...props} style={[props.style, { flex: 1 }]} />;

export interface DashCardProps<i> {
  item: i;
  index: number;
  touched: number[];
  onInnerLayout: (event: LayoutChangeEvent) => void;
  onOuterLayout: (event: LayoutChangeEvent) => void;
}

export default function DashboardScreen() {
  const theme = useTheme();
  const scrollRef = React.useRef<FlatList>();
  const scrollSize = React.useRef<{ width: number; height: number }>();
  const scrollViewDimensions = React.useRef<{
    [index: number]: {
      [key in "inner" | "outer"]?: {
        width: number;
        height: number;
      };
    };
  }>({});
  const position = React.useRef<number>();
  const [settings] = useSettings();
  const [users] = useUserBookmarks();
  const [touched, setTouched] = React.useState<number[]>([0]);
  const [index, setIndex] = React.useState<number>(0);
  const [size, onLayout] = useComponentSize();
  const width = scrollSize.current?.width ?? size?.width ?? 0;

  useTitle(`☕ Dashboard`);
  if (!size)
    return (
      <View style={{ flex: 1 }} onLayout={onLayout}>
        <Loading level="1" data={[]} />
      </View>
    );
  
  const dashCards = [
    { nonUser: "clan" },
    ...(builds.some(i => i.build > settings.build) ? [{ nonUser: "changes" }] : []),
    ...users,
  ];
  return (
    <Layout onLayout={onLayout} style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: -8,
        }}>
        {dashCards.map((i, n) => (
          <Pressable
            onPress={() => {
              scrollRef.current?.scrollToOffset({
                offset: (position.current || 0) + (n - index) * Math.min(600, width),
              });
            }}>
            {"nonUser" in i ? (
              <Layout
                level="2"
                style={
                  index === n
                    ? {
                        height: 32,
                        width: 32,
                        borderRadius: 16,
                        marginHorizontal: 2,
                        justifyContent: "center",
                        alignItems: "center",
                      }
                    : {
                        height: 16,
                        width: 16,
                        borderRadius: 8,
                        marginHorizontal: 2,
                        justifyContent: "center",
                        alignItems: "center",
                      }
                }>
                <Icon
                  style={
                    index === n
                      ? { color: theme["text-basic-color"], height: 24, width: 24 }
                      : { color: theme["text-basic-color"], height: 12, width: 12 }
                  }
                  name={i.nonUser === "clan" ? "shield-half-full" : "playlist-check"}
                />
              </Layout>
            ) : (
              <Image
                style={
                  index === n
                    ? { height: 32, width: 32, borderRadius: 16, marginHorizontal: 2 }
                    : { height: 16, width: 16, borderRadius: 8, marginHorizontal: 2 }
                }
                source={{
                  uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(
                    i.user_id
                  ).toString(36)}.png`,
                }}
              />
            )}
          </Pressable>
        ))}
      </View>
      <WheelWrapper
        onWheel={ev => {
          if (
            (scrollViewDimensions.current[index]?.inner?.height || 1) >
            (scrollViewDimensions.current[index]?.outer?.height || 0)
          )
            return;
          scrollRef.current?.scrollToOffset({
            offset: (position.current || 0) + (ev.nativeEvent.deltaY / 100) * Math.min(600, width),
          });
        }}>
        <FlatList
          style={{ flexGrow: 1 }}
          decelerationRate="fast"
          ref={sv => {
            scrollRef.current = sv || undefined;
          }}
          horizontal={true}
          pagingEnabled={Platform.OS === "web"}
          contentOffset={{ x: Math.min(600, width), y: 0 }}
          onScroll={ev => {
            if (ev.nativeEvent.contentOffset.x !== undefined) {
              position.current = ev.nativeEvent.contentOffset.x;
              const pos = Math.ceil((ev.nativeEvent.contentOffset.x - 16) / Math.min(600, width));
              setIndex(Math.round((ev.nativeEvent.contentOffset.x - 16) / Math.min(600, width)));
              if (!touched.includes(pos)) setTouched([...touched, pos]);
            }
          }}
          onContentSizeChange={() => {
            scrollRef.current?.scrollToOffset({
              offset: Math.min(600, width),
              animated: false,
            });
          }}
          scrollEventThrottle={4}
          snapToInterval={Math.min(600, width)}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          snapToStart={true}
          data={dashCards}
          CellRendererComponent={FlexView}
          renderItem={({ item, index: cardIndex }) => {
            const props: DashCardProps<any> = {
              item,
              index: cardIndex,
              touched,
              onInnerLayout: event => {
                scrollViewDimensions.current[cardIndex] = {
                  inner: {
                    width: event.nativeEvent.layout.width,
                    height: event.nativeEvent.layout.height,
                  },
                  outer: scrollViewDimensions.current[cardIndex]?.outer,
                };
              },
              onOuterLayout: event => {
                scrollViewDimensions.current[cardIndex] = {
                  inner: scrollViewDimensions.current[cardIndex]?.inner,
                  outer: {
                    width: event.nativeEvent.layout.width,
                    height: event.nativeEvent.layout.height,
                  },
                };
              },
            };
            return (
              <View
                style={{
                  width: Math.min(600, width),
                  padding: 8,
                  zIndex: -index,
                  height: "100%",
                  flex: 1,
                  alignSelf: "center",
                  opacity: index === cardIndex ? 1 : 0.75,
                }}>
                {"nonUser" in item ? (
                  item.nonUser === "clan" ? (
                    <ClansDashCard {...props} />
                  ) : item.nonUser === "changes" ? (
                    <ChangesDashCard {...props} />
                  ) : null
                ) : (
                  <UserDashCard {...props} />
                )}
                {index !== cardIndex && (
                  <Pressable
                    onPress={() => {
                      scrollRef.current?.scrollToOffset({
                        offset:
                          (position.current || 0) + (cardIndex - index) * Math.min(600, width),
                      });
                    }}
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                    }}
                  />
                )}
              </View>
            );
          }}
          ListFooterComponent={<View style={{ width: (width - Math.min(600, width)) / 2 }} />}
          ListHeaderComponent={<View style={{ width: (width - Math.min(600, width)) / 2 }} />}
        />
      </WheelWrapper>
      {/* {width > 600 && (
        <>
          <Button
            appearance="ghost"
            accessoryLeft={props => <Icon name="chevron-left" {...props} />}
            onPress={() => {
              scrollRef.current?.scrollToOffset({
                offset: (position.current || 0) - Math.min(600, width),
              });
            }}
            style={{ position: "absolute", left: 0, top: 0, bottom: 0 }}
          />
          <Button
            appearance="ghost"
            accessoryLeft={props => <Icon name="chevron-right" {...props} />}
            onPress={() => {
              scrollRef.current?.scrollToOffset({
                offset: (position.current || 0) + Math.min(600, width),
              });
            }}
            style={{ position: "absolute", right: 0, top: 0, bottom: 0 }}
          />
        </>
      )} */}
    </Layout>
  );
}
