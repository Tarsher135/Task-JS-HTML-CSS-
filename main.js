const questions = [
	{
		question: "How many planets are in the solar system?",
		answers: ["8", "9", "10", "11"],
		correct: 4,
	},
	{
		question: "What is the freezing point of water?",
		answers: ["0", "-5", "-6", "1"],
		correct: 2,
	},
	{
		question: "What is the longest river in the world?",
		answers: [
			"Nile",
			"Amazon",
			"Yangtze",
			"Dvina",
		],
		correct: 1,
	},
	{
		question: "How many chromosomes are in the human genome?",
		answers: ["42", "44", "46", "47"],
		correct: 2,
	},
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage (){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion(){
	
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);

	headerContainer.innerHTML = title;

	let answerNumber = 1;
	for(answerText of questions[questionIndex]['answers']){
		const questionTemplate = `<li>
		<label>
			<input value = "%number%" type="radio" class="answer" name="answer" />
			<span>%answer%</span>
		</label>
	</li>`;

	let answerHTML = questionTemplate.replace('%answer%', answerText);

	answerHTML = answerHTML.replace('%number%', answerNumber);

	listContainer.innerHTML += answerHTML;
	answerNumber++;

	}
}

function checkAnswer(){
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

	if (!checkedRadio){
		submitBtn.blur();
		return;
}

const userAnswer = parseInt(checkedRadio.value);
if (userAnswer === questions[questionIndex]['correct']){
	score++;
}

	if (questionIndex !== questions.length - 1){
		questionIndex++;
		clearPage();
		showQuestion();
	} else {
		clearPage();
		showResults();
	}

}

function showResults(){
	const resultsTemplate = `<h2 class="title">%title%</h2>
	<h3 class="summary">%message%</h3>
	<p class="result">%result%</p>`;

	let title, message;
	if (score === questions.length){
		title = 'Поздравляем!';
		message = 'Вы ответили верно на все вопросы!';
	} else if ((score * 100) / questions.length >= 50){
		title = 'Не плохо!';
		message = 'Вы дали более половины верных ответов!';
	} else {
		title = 'Есть куда расти!';
		message = 'Пока у вас меньше половины верных ответов!';
	}

	let result = `${score} из ${questions.length}`;

	const finalMessage = resultsTemplate.replace('%title%', title)
	.replace('%message%', message)
	.replace('%result%', result)

	headerContainer.innerHTML = finalMessage;

	submitBtn.blur();
	submitBtn.innerText = 'Начать заново';
	submitBtn.onclick = function(){
		history.go();
	};
}