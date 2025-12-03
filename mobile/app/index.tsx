import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { colors } from "@/constants/colors";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/Logo.png")}
        style={styles.image}
      />
      <Text style={styles.title}>
        Alga + <Text style={{ color: colors.white }}>Euro</Text>
      </Text>
      <Text style={styles.text}>Grow stronger everyday!</Text>
      <Link href="/step" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 24,
    resizeMode: "contain",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: colors.yellow,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    textAlign: "center",
    marginVertical: 8,
  },
  button: {
    backgroundColor: colors.yellow,
    width: "100%",
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 34,
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
  },
});
