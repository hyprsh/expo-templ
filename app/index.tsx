import { ActivityIndicator, Pressable, Text, View } from "react-native";
import tw from "twrnc";
import { Image } from "expo-image";
import { useQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";

export default function Index() {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["catfact"],
    queryFn: () =>
      fetch("https://catfact.ninja/fact").then((res) => res.json()),
  });

  const DataComponent: React.FC = () => {
    if (isPending)
      return <ActivityIndicator color={tw.color("teal-500")} size="large" />;
    if (error)
      return (
        <Text style={tw`text-red-500 text-xl`}>Error: {error.message}</Text>
      );
    return (
      <Text style={tw`text-gray-800 dark:text-white text-xl`}>
        "{data?.fact}"
      </Text>
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: "Cat Fact" }} />
      <View style={tw`flex-1 items-center pt-20 bg-gray-100 dark:bg-gray-900`}>
        <Image
          style={tw`w-64 h-64 rounded-full mb-4`}
          source="https://cataas.com/cat/gif"
          contentFit="cover"
          transition={1000}
          cachePolicy="none"
        />
        <View style={tw`m-4`}>
          <DataComponent />
          <Pressable
            style={tw`bg-teal-500 rounded-xl px-4 py-4 mt-4`}
            onPress={() => {
              refetch();
            }}
            disabled={isPending}
          >
            <Text style={tw`text-lg text-center  text-teal-50`}>
              {isPending ? "Loading..." : "Refresh"}
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
