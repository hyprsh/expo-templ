import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { View, Alert, TextInput } from "react-native";
import { Session } from "@supabase/supabase-js";
import tw from "twrnc";
import Button from "./Button";

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={tw`p-12 mt-40`}>
      <View style={tw`my-4 self-stretch mt-20`}>
        <TextInput
          value={session?.user?.email}
          editable={false}
          placeholder="email@address.com"
          placeholderTextColor={tw.color("gray-400")}
          style={tw`border-b-2 border-gray-200 text-gray-800 text-xl py-2 px-4 w-full`}
        />
      </View>
      <View style={tw`my-4 self-stretch`}>
        <TextInput
          value={username || ""}
          onChangeText={(text) => setUsername(text)}
          placeholder="Username"
          placeholderTextColor={tw.color("gray-400")}
          style={tw`border-b-2 border-gray-200 text-gray-800 text-xl py-2 px-4 w-full`}
        />
      </View>
      <View style={tw`my-4 self-stretch`}>
        <TextInput
          value={website || ""}
          onChangeText={(text) => setWebsite(text)}
          placeholder="Website"
          placeholderTextColor={tw.color("gray-400")}
          style={tw`border-b-2 border-gray-200 text-gray-800 text-xl py-2 px-4 w-full`}
        />
      </View>

      <View style={tw`mt-15 gap-4`}>
        <Button
          onPress={() =>
            updateProfile({ username, website, avatar_url: avatarUrl })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </Button>
        <Button onPress={() => supabase.auth.signOut()}>Sign Out</Button>
      </View>
    </View>
  );
}
