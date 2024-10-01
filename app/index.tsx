import { ActivityIndicator, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import tw from '@/lib/tailwind';

export default function Index() {
  const fact = useQuery({
    queryKey: ['catfact'],
    queryFn: () => fetch('https://catfact.ninja/fact').then((res) => res.json()),
  });
  const image = useQuery({
    queryKey: ['catimage'],
    queryFn: () => fetch('https://cataas.com/cat/gif?type=small&position=center').then((res) => res.json()),
  });

  return (
    <>
      <Stack.Screen options={{ title: 'Cat Fact' }} />
      <ScrollView
        style={tw`flex-1  pt-15`}
        contentContainerStyle={tw`flex-1 items-center`}
        refreshControl={
          <RefreshControl
            refreshing={fact.isPending}
            onRefresh={() => {
              fact.refetch();
              image.refetch();
            }}
          />
        }
      >
        <Text style={tw`text-4xl text-center font-bold mb-4 text-primary-500 dark:text-dark-200`}>Cat Fact</Text>
        <Image
          style={tw`w-64 h-64 rounded-full mb-4`}
          source={`https://cataas.com/cat/${image.data?._id}`}
          contentFit="cover"
          transition={1000}
          cachePolicy="none"
        />
        <View style={tw`m-4`}>
          <Pressable
            style={tw`bg-teal-500 rounded-xl px-4 py-4 mt-4`}
            onPress={() => {
              fact.refetch();
            }}
          >
            <Text style={tw`text-lg text-center  text-teal-50`}>
              {fact.isPending ? 'Loading...' : 'Refresh'} {image.data?._id}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}
