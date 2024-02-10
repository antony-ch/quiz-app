const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Transfer Markup Language", correct: false},
            { text: "Hyper Text Markup Language", correct: true},
            { text: "High Tech Markup Language", correct: false},
            { text: "Hyperlink and Text Markup Language", correct: false},
        ]
    },
    {
        question: "Which property is used to control the space between the border and the content in CSS?",
        answers: [
            { text: "margin", correct: false},
            { text: "padding", correct: true},
            { text: "border-spacing", correct: false},
            { text: "spacing", correct: false},
        ]
    },
    {
        question: "Which CSS property is used to specify how an element is positioned in a document?",
        answers: [
            { text: "position", correct: true},
            { text: "display", correct: false},
            { text: "float", correct: false},
            { text: "align", correct: false},
        ]
    },
    {
        question: "What does the CSS box model consist of?",
        answers: [
            { text: "Content, Margin, Border, Padding", correct: true},
            { text: "Content, Border, Margin, Padding", correct: false},
            { text: "Padding, Margin, Border, Content", correct: false},
            { text: "Margin, Border, Padding, Content", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();