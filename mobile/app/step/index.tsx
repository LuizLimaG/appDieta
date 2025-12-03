import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { colors } from "@/constants/colors";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { useDataStore } from "@/store/data";

const squema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  age: z.string().min(1, "A idade é obrigatória"),
  weight: z.string().min(1, "O peso é obrigatório"),
  height: z.string().min(1, "A altura é obrigatória"),
});

type FormData = z.infer<typeof squema>;

export default function Step() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(squema),
  });

  const setPageOne = useDataStore((state) => state.setPageOne);

  function handleCreate(data: FormData) {
    setPageOne({
      name: data.name,
      age: data.age,
      weight: data.weight,
      height: data.height,
    });
    router.push("/create");
  }

  return (
    <View style={styles.container}>
      <Header step="Passo 1" title="Vamos começar!" />

      <ScrollView style={styles.content}>
        <Text style={styles.label}>Nome:</Text>
        <Input
          name="name"
          control={control}
          placeholder="Digite seu nome"
          error={errors.name?.message}
          keybordType="default"
        />
        <Text style={styles.label}>Peso atual:</Text>
        <Input
          name="weight"
          control={control}
          placeholder="Ex: 75"
          error={errors.weight?.message}
          keybordType="numeric"
        />
        <Text style={styles.label}>Altura atual:</Text>
        <Input
          name="height"
          control={control}
          placeholder="Ex: 1.90"
          error={errors.height?.message}
          keybordType="numeric"
        />
        <Text style={styles.label}>Idade:</Text>
        <Input
          name="age"
          control={control}
          placeholder="Ex: 20"
          error={errors.age?.message}
          keybordType="numeric"
        />

        <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "bold",
    marginBottom: 8,
  },
  button: {
    backgroundColor: colors.yellow,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 34,
    height: 44,
  },
  buttonText: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 16,
  },
});
