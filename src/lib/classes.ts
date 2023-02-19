export class Question {
    constructor(public question: string, public answer: string) { }

    checkAnswer(answer: string): boolean {
        return this.answer === answer
    }
}

export class User {
    chips = 0;
    id: string;
    constructor(public name: string, id: string) { 
        this.id = id;
    }
}