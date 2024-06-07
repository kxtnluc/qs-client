export type QuestionGroup = {
    id: number;
    title: string;
    questions: Question[];
}

export type Question = {
    id: number;
    body: string;
    questionGroupId: number;
    multipleResponses: boolean;
    paidUsersOnly: boolean;
    userQuestions: UserQuestion[]
}

export type UserQuestion = {
    id: number;
    userProfileId: number;
    questionId: number;
    question: Question
    response: string;
}

export type UserQuestionDTO = {
    userProfileId: number;
    questionId: number;
    response: string;
}