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
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Select } from "@/components/input/select";
import { useDataStore } from "@/store/data";
import { router } from "expo-router";

const squema = z.object({
  gender: z.string().min(1, "O gênero é obrigatório"),
  level: z.string().min(1, "Selecione seu nível de atividade"),
  objective: z.string().min(1, "O objetivo é obrigatório"),
});

type FormData = z.infer<typeof squema>;

export default function Create() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(squema),
  });

  const setPageTwo = useDataStore((state) => state.setPageTwo);

  const genderOptions = [
    {
      label: "Masculino",
      value: "masculino",
    },
    {
      label: "Feminino",
      value: "feminino",
    },
  ];

  const levelOptions = [
    {
      label: "Sedentário",
      value: "Sedentário (pouco ou nenhuma atividade física)",
    },
    {
      label: "Levemente ativo",
      value: "Levemente ativo (exercícios 1 a 3 vezes na semana)",
    },
    {
      label: "Moderadamente ativo",
      value: "Moderadamente ativo (exercícios 3 a 5 vezes na semana)",
    },
    {
      label: "Altamente ativo",
      value: "Altamente ativo (exercícios 5 a 7 dia por semana)",
    },
  ];

  const objectiveOptions = [
    { label: "Emagrecer", value: "emagrecer" },
    { label: "Hipertrofia", value: "Hipertrofia" },
    { label: "Hipertrofia + Definição", value: "Hipertrofia e Definição" },
    { label: "Definição", value: "Definição" },
  ];

  function handleCreate(data: FormData) {
    setPageTwo({
      level: data.level,
      gender: data.gender,
      objective: data.objective,
    })
    router.push("/nutrition");
  }

  return (
    <View style={styles.container}>
      <Header step="Passo 2" title="Finalizando dieta" />
      <ScrollView style={styles.content}>
        <Text style={styles.label}>Gênero</Text>
        <Select
          control={control}
          name="gender"
          placeholder="Selecione seu gênero"
          error={errors.gender?.message}
          options={genderOptions}
        />
        <Text style={styles.label}>Selecione o nível de atividade física</Text>
        <Select
          control={control}
          name="level"
          placeholder="Selecione seu nível de atividade"
          error={errors.level?.message}
          options={levelOptions}
        />
        <Text style={styles.label}>Selecione seu objetivo</Text>
        <Select
          control={control}
          name="objective"
          placeholder="Selecione seu objetivo"
          error={errors.objective?.message}
          options={objectiveOptions}
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
