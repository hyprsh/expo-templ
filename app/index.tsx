import { ActivityIndicator, Text, View } from "react-native";
import tw from "twrnc";
import { Image } from "expo-image";
import { useQuery } from "@tanstack/react-query";

export default function Index() {
  const { isPending, error, data } = useQuery({
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
    <View style={tw`flex-1 items-center mt-20`}>
      <Image
        style={tw`w-64 h-64 rounded-full mb-4`}
        source="https://cataas.com/cat/gif"
        contentFit="cover"
        transition={1000}
      />
      <View style={tw`m-4`}>
        <DataComponent />
      </View>
    </View>
  );
}
