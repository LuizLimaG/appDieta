import { Header } from "@/components/header";
import { useDataStore } from "@/store/data";
import {
  Platform,
  Pressable,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { colors } from "@/constants/colors";
import { Data } from "@/types/data";
import { Link, router } from "expo-router";
import { object } from "zod";
import { Feather, Ionicons } from "@expo/vector-icons";

interface ResponseData {
  data: Data;
}

export default function Nutrition() {
  const user = useDataStore((state) => state.user);

  const { data, isFetching, error } = useQuery({
    queryKey: ["nutrition"],
    queryFn: async () => {
      try {
        if (!user) {
          throw new Error("Falha ao carregar dieta");
        }

        // const response = await api.get<ResponseData>('/test')

        const response = await api.post<ResponseData>("/create", {
          name: user.name,
          age: user.age,
          gender: user.gender,
          weight: user.weight,
          height: user.height,
          objective: user.objective,
          level: user.level,
        });

        return response.data.data;
      } catch (error) {
        console.log("Error fetching nutrition data:", error);
      }
    },
  });

  async function handleShare() {
    try {
      if (!data || Object.keys(data).length <= 0) {
        return;
      }

      const supplements = `${data?.suplementos.map((item) => `${item}`)}`;
      const foods = `${data?.refeicoes.map(
        (item) =>
          `\n- Nome: ${item.nome}\n- Horário: ${
            item.horario
          }\n- Alimentos: ${item.alimentos.map((alimento) => `${alimento}`)}`
      )}`;

      const message = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${foods}\n\n-Dica suplementos: ${supplements}`;

      await Share.share({
        message: message,
      });
    } catch (err) {
      console.log(err);
    }
  }

  if (isFetching) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Gerando dieta!</Text>
        <Text style={styles.loadingText}>Consultando IA...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>Falha ao gerar dieta</Text>
        <Link href="/">
          <Text style={styles.retryLink}>Tente Novamente</Text>
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>Minha Dieta</Text>
          <Pressable style={styles.buttonShare} onPress={handleShare}>
            <Text style={styles.textButtonShare}>Compartilhar</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView style={{ paddingHorizontal: 16, flex: 1, paddingTop: 14 }}>
        {data && Object.keys(data).length > 0 && (
          <>
            <Text style={styles.name}>{data.nome}</Text>
            <Text style={styles.objective}>
              Foco:{" "}
              <Text style={{ fontWeight: "normal" }}>{data.objetivo}</Text>
            </Text>
            <Text style={styles.label}>Refeições</Text>
            <View>
              <View style={styles.foods}>
                {data.refeicoes.map((refeicao) => (
                  <View style={styles.food} key={refeicao.nome}>
                    <View style={{ gap: 4 }}>
                      <View style={styles.foodHeader}>
                        <Text style={styles.foodName}>{refeicao.nome}</Text>
                        <Ionicons
                          name="restaurant"
                          size={16}
                          color={colors.yellow}
                        />
                      </View>

                      <View style={styles.foodContent}>
                        <Feather name="clock" size={16} color={colors.yellow} />
                        <Text style={styles.foodTime}>{refeicao.horario}</Text>
                      </View>
                    </View>

                    <View>
                      <Text style={styles.foodText}>Alimentos:</Text>
                      {refeicao.alimentos.map((alimento) => (
                        <Text
                          style={{
                            color: colors.lightGrey,
                            fontWeight: "semibold",
                          }}
                          key={alimento}
                        >
                          • {alimento}
                        </Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
              <View style={styles.supplements}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: colors.white,
                      fontWeight: "bold",
                    }}
                  >
                    Dica Suplementos
                  </Text>
                  <Ionicons
                    name="barbell-outline"
                    size={18}
                    color={colors.yellow}
                  />
                </View>
                <View>
                  {data.suplementos.map((item) => (
                    <Text style={styles.supplement} key={item}>
                      • {item}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
            <Pressable
              style={styles.button}
              onPress={() => router.replace("/")}
            >
              <Text style={styles.buttonText}>Gerar nova dieta</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  containerHeader: {
    backgroundColor: colors.grey,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! + 50 : 60,
    paddingBottom: 30,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },
  buttonShare: {
    backgroundColor: colors.yellow,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 30,
  },
  textButtonShare: {
    color: colors.black,
    fontWeight: "bold",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 18,
    marginBottom: 4,
    color: colors.white,
  },
  error: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    marginBottom: 4,
    color: colors.white,
  },
  retryLink: {
    fontSize: 16,
    color: colors.yellow,
    textDecorationLine: "underline",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },
  objective: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 8,
  },
  foods: {
    borderRadius: 10,
    marginTop: 10,
    gap: 20,
  },
  food: {
    backgroundColor: colors.grey,
    padding: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    gap: 10,
  },
  foodHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  foodName: {
    color: colors.white,
    fontWeight: "bold",
  },
  foodContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  foodText: {
    color: colors.white,
    fontWeight: "bold",
  },
  foodTime: {
    color: colors.white,
  },
  supplements: {
    backgroundColor: colors.grey,
    marginTop: 14,
    marginBottom: 14,
    padding: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    gap: 8,
  },
  supplement: {
    color: colors.lightGrey,
  },
  button: {
    backgroundColor: colors.yellow,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 44,
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "bold",
  },
});
