import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { Controller } from "react-hook-form";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { useState } from "react";

interface SelectProps {
  name: string;
  control: any;
  placeholder?: string;
  error?: string;
  options: OptionProps[];
}

interface OptionProps {
  label: string;
  value: string | number;
}

export function Select({
  name,
  control,
  placeholder,
  error,
  options,
}: SelectProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TouchableOpacity
              style={styles.select}
              onPress={() => setVisible(true)}
            >
              <Text style={styles.text}>{value ? options.find(option => option.value === value)?.label : placeholder}</Text>
              <Feather name="chevron-down" size={20} color={colors.yellow} />
            </TouchableOpacity>
            <Modal
              visible={visible}
              animationType="fade"
              transparent={true}
              onRequestClose={() => setVisible(false)}
            >
              <TouchableOpacity
                style={styles.modalContainer}
                activeOpacity={1}
                onPress={() => setVisible(false)}
              >
                <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                  <FlatList
                    contentContainerStyle={{ gap: 6 }}
                    data={options}
                    keyExtractor={(item) => item.value.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => {
                          onChange(item.value);
                          setVisible(false);
                        }}
                      >
                        <Text style={{ color: colors.white }}>
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    )}
                  ></FlatList>
                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>
          </>
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
  select: {
    backgroundColor: colors.grey,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 44,
  },
  text: {
    color: colors.lightGrey,
  },
  modalContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: colors.grey,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 16,
  },
  option: {
    paddingVertical: 14,
    backgroundColor: colors.opacityLightGrey,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});
