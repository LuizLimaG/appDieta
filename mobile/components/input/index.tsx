import {
  StyleSheet,
  TextInput,
  View,
  KeyboardTypeOptions,
  Text,
} from "react-native";
import { Controller } from "react-hook-form";
import { colors } from "@/constants/colors";

interface InputProps {
  name: string;
  control: any;
  placeholder?: string;
  rules?: object;
  error?: string;
  keybordType: KeyboardTypeOptions;
}

export function Input({
  name,
  control,
  placeholder,
  rules,
  error,
  keybordType,
}: InputProps) {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={colors.lightGrey}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType={keybordType}
          />
        )}
      />

      {error && (
        <View>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.grey,
    paddingHorizontal: 10,
    color: colors.white,
    borderRadius: 10,
    height: 44,
  },
  errorText: {
    color: colors.red,
    marginTop: 4,
  },
});
