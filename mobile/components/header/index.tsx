import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

interface HeaderProps {
  step: string;
  title: string;
}

export function Header({ step, title }: HeaderProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Pressable onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#fff" />
          </Pressable>

          <View>
            <Text style={styles.text}>
              {step} <Feather name="loader" size={16} color={colors.yellow} />{" "}
            </Text>
          </View>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    marginBottom: 14,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! + 10 : 10,
  },
  content: {
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  text: {
    fontSize: 16,
    color: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
});
