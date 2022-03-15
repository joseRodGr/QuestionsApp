import { Answer } from "./answer";

export interface Question {
    id: number;
    content: string;
    creatorUsername: string;
    openQuestion: boolean;
    shared: boolean;
    hasAnswered: boolean;
    answers: Answer[];
}