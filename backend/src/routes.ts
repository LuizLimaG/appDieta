import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { CreateNutritionController } from "./controllers/CreateNutritionController";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get("/test", (request: FastifyRequest, reply: FastifyReply) => {
    let responseText =
      '```json\n{\n  "nome": "Luiz Lima",\n  "sexo": "Masculino",\n  "idade": 20,\n  "altura": 1.93,\n  "peso": 100,\n  "objetivo": "Hipertrofia",\n  "refeicoes": [\n    {\n      "horario": "07:00",\n      "nome": "Cafe da Manha",\n      "alimentos": [\n        "100g de aveia em flocos cozida com agua ou leite desnatado",\n        "3 ovos inteiros e 2 claras mexidos ou cozidos",\n        "1 banana grande",\n        "1 colher de sopa de pasta de amendoim integral"\n      ]\n    },\n    {\n      "horario": "10:00",\n      "nome": "Lanche da Manha",\n      "alimentos": [\n        "120g de frango desfiado ou atum em agua",\n        "4 fatias de pao integral",\n        "1 fruta grande (manga ou 2 macas)"\n      ]\n    },\n    {\n      "horario": "13:00",\n      "nome": "Almoco",\n      "alimentos": [\n        "150g de peito de frango grelhado ou carne vermelha magra (patinho, maminha)",\n        "350g de arroz integral cozido",\n        "250g de batata doce cozida",\n        "Salada a vontade (alface, tomate, pepino) com 1 colher de sopa de azeite extra virgem",\n        "Legumes cozidos a vontade (brocolis, couve-flor, cenoura)"\n      ]\n    },\n    {\n      "horario": "16:00",\n      "nome": "Lanche Pre-treino",\n      "alimentos": [\n        "200g de batata doce cozida ou mandioca cozida",\n        "100g de frango desfiado ou 1 scoop de Whey Protein com agua",\n        "1 fruta (uva ou pera)"\n      ]\n    },\n    {\n      "horario": "19:00",\n      "nome": "Pos-treino / Jantar",\n      "alimentos": [\n        "150g de peito de frango grelhado ou tilapia",\n        "300g de arroz branco cozido ou batata inglesa cozida",\n        "Salada a vontade com 1 colher de sopa de azeite extra virgem",\n        "Legumes cozidos a vontade (brocolis, couve-flor, vagem)"\n      ]\n    },\n    {\n      "horario": "22:00",\n      "nome": "Ceia",\n      "alimentos": [\n        "200g de queijo cottage ou 200ml de leite desnatado com 30g de proteina caseina (se usar suplemento)",\n        "30g de castanhas, amendoim ou amendoas"\n      ]\n    }\n  ],\n  "suplementos": [\n    "Whey Protein",\n    "Creatina",\n    "Multivitaminico",\n    "Caseina"\n  ]\n}\n```';

    try {
      let jsonString = responseText
        .replace(/```\w*\n/g, "")
        .replace(/\n```/g, "")
        .trim();

      let jsonObject = JSON.parse(jsonString);

      return reply.send({ data: jsonObject });
    } catch (error) {
      console.error("Error in test route:", error);
    }

    reply.send({ ok: true });
  });

  fastify.post(
    "/create",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateNutritionController().handle(request, reply);
    }
  );
}
