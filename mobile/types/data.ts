interface RefeicoesProps {
    horario: string
    nome: string
    alimentos: string[]
}

export interface Data {
    nome: string
    sexo: string
    idade: number
    peso: number
    altura: number
    objetivo: string
    refeicoes: RefeicoesProps[]
    suplementos: string[]
}