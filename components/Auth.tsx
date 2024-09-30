import React, { useState } from "react";
import { Alert, View, AppState, TextInput } from "react-native";
import { supabase } from "../lib/supabase";
import tw from "twrnc";
import Button from "./Button";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={tw`p-12 mt-40`}>
      <View style={tw`my-4 self-stretch mt-20`}>
        <TextInput
          style={tw`border-b-2 border-gray-200 py-2 px-4 w-full text-xl`}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          placeholderTextColor={tw.color("gray-400")}
          autoCapitalize={"none"}
        />
      </View>
      <View style={tw`my-4 self-stretch`}>
        <TextInput
          style={tw`border-b-2 border-gray-200 text-gray-800 text-xl py-2 px-4 w-full`}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor={tw.color("gray-400")}
          autoCapitalize={"none"}
        />
      </View>
      <View style={tw`my-4 mt-10`}>
        <Button disabled={loading} onPress={() => signInWithEmail()}>
          Sign in
        </Button>
        <Button
          disabled={loading}
          style={tw`bg-transparent`}
          childrenStyle={tw`text-gray-800`}
          onPress={() => signUpWithEmail()}
        >
          Sign Up
        </Button>
      </View>
    </View>
  );
}
