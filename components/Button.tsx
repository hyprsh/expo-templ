import React from "react";
import { Pressable, Text, ViewStyle } from "react-native";
import tw from "twrnc";

interface ButtonProps {
  onPress?: () => void;
  style?: ViewStyle;
  childrenStyle?: ViewStyle;
  children: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  style,
  children,
  childrenStyle,
  disabled,
  ...props
}) => {
  return (
    <Pressable
      style={[tw`bg-teal-500 rounded-xl px-4 py-4`, style]}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      <Text style={[tw`text-lg text-center text-teal-50`, childrenStyle]}>
        {children}
      </Text>
    </Pressable>
  );
};

export default Button;
