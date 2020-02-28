// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");





//Store information about your firebase so we can connect

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//IMPORTANT: REPLACE THESE WITH YOUR VALUES (these ones won't work)
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var config = {
    apiKey: "AIzaSyDZCv4GkR9AyqtWFEeU_-ewjsMFBVDnQqc",
    authDomain: "quiz-e7b24.firebaseapp.com",
    databaseURL: "https://quiz-e7b24.firebaseio.com",
    projectId: "quiz-e7b24",
    storageBucket: "quiz-e7b24.appspot.com",
    messagingSenderId: "770038601426",
    appId: "1:770038601426:web:28d4eb2b53b0b4cbae3f0b"
};

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//initialize your firebase
firebase.initializeApp(config);
var database = firebase.database();

//create a variable to hold our orders list from firebase
var firebaseOrdersCollection = database.ref().child("users");


let name = ""
let phone = ""
//this function is called when the submit button is clicked
function submitOrder() {

    name = document.getElementById("name").value;
    phone = document.getElementById("phone").value;
    // var order = {
    //   fullName: $("#name").val(),
    //   notes: $("#phone").val(),
    // };

    // firebaseOrdersCollection.push(order); 
}

//create a 'listener' which waits for changes to the values inside the firebaseOrdersCollection
firebaseOrdersCollection.on("value", function (users) {
    //create an empty string that will hold our new HTML
    var allOrdersHtml = "";

    //this is saying foreach order do the following function...
    users.forEach(function (firebaseOrderReference) {
        //this gets the actual data (JSON) for the order.
        var order = firebaseOrderReference.val();
        console.log(order); //check your console to see it!

        //create html for the individual order
        //note: this is hard to make look pretty! Be sure to keep your indents nice :-)
        //IMPORTANT: we use ` here instead of ' (notice the difference?) That allows us to use enters
        var individialOrderHtml =
            `<div class='item'><p>Name: ` + order.fullName + `</p><p>Phone: ` + order.notes + `</p><hr></div>`;

        //add the individual order html to the end of the allOrdersHtml list
        allOrdersHtml = allOrdersHtml + individialOrderHtml;
    });

    //actaull put the html on the page inside the element with the id PreviousOrders
    $("#previousOrders").html(allOrdersHtml);

    //note: an alternative approach would be to create a hidden html element for one order on the page, duplicate it in the forEach loop, unhide it, and replace the information, and add it back.
});


// create our questions
let questions = [
    {
        question : "1. Саноат хавфсизлиги деганда нимани тушунасиз ?  ",
        imgSrc : "img/html.png",
        choiceA : "А) Корхоналардаги авариялар ва нохуш ходисаларни ҳамда уларнинг оқибатларидан шахс ва жамиятнинг хаётий муҳим манфаатлари химояланганлиги ҳолати.",
        choiceB : "Б) Хавфли ишлаб чиқариш объектларидаги бахтсиз ходисалар ҳамда уларнинг оқибатларидан шахс ва жамиятнинг хаётий муҳим манфаатлари химояланганлиги ҳолати.",
        choiceC : "В) Хавфли ишлаб чиқариш объектларидаги авариялар ва нохуш ходисаларни ҳамда уларнинг оқибатларини текшириш ва хисобга олиш.",
        choiceD : "Г) Хавфли ишлаб чиқариш объектларидаги авариялар ва нохуш ходисаларни ҳамда уларнинг оқибатларидан шахс ва жамиятнинг хаётий муҳим манфаатлари химояланганлиги ҳолати.",
        correct : "A"
    },{
        question : "2. Саноат хавфсизлиги декларацияси нима мақсадда ишлаб чиқилади?",
        imgSrc : "img/css.png",
        choiceA : "А) Аҳолини ва ҳудудларни хавфли ишлаб чиқариш объектларидаги авариялардан муҳофаза қилишни таъминлаш ҳамда давлат органларини, фуқароларнинг ўзини ўзи бошқариш органларини ва аҳолини саноат хавфсизлигининг ҳолати тўғрисида хабардор этиш мақсадида хавфли ишлаб чиқариш объектидан фойдаланувчи ташкилот саноат хавфсизлиги декларациясини ишлаб чиқади.   ",
        choiceB : "Б) Аҳолини ва ҳудудларни хавфли ишлаб чиқариш объектларидаги авариялардан муҳофаза қилишни таъминлаш мақсадида хавфли ишлаб чиқариш объектидан фойдаланувчи ташкилот саноат хавфсизлиги декларациясини ишлаб чиқади.",
        choiceC : "В) Давлат органларини, фуқароларнинг ўзини ўзи бошқариш органларини ва аҳолини саноат хавфсизлигининг ҳолати тўғрисида хабардор этиш мақсадида хавфли ишлаб чиқариш объектидан фойдаланувчи ташкилот саноат хавфсизлиги декларациясини ишлаб чиқади. ",
        choiceD : "Г) Саноат хавфсизлиги талабларини бажариш мақсадида хавфли ишлаб чиқариш объектидан фойдаланувчи ташкилот саноат хавфсизлиги декларациясини ишлаб чиқади.",
        correct : "B"
    },{
        question : "3. Хавфли ишлаб чиқариш объектида қўлланиладиган техника қурилмаларини сертификатлаштириш;",
        imgSrc : "img/js.png",
        choiceA : "А) Хавфли ишлаб чиқариш объектида қўлланиладиган техника қурилмалари ҳужжатларида белгиланган тартибда мажбурий сертификатлаштирилиши керак.  ",
        choiceB : "Б) Хавфли ишлаб чиқариш объектида қўлланиладиган техника қурилмалари саноат хавфсизлиги талабларига мувофиқлиги жиҳатидан қонун ҳужжатларида белгиланган тартибда мажбурий сертификатлаштирилиши шарт эмас.  ",
        choiceC : "В) Хавфли ишлаб чиқариш объектида қўлланиладиган техника қурилмалари саноат хавфсизлиги талабларига мувофиқлиги жиҳатидан қонун ҳужжатларида белгиланган тартибда мажбурий сертификатлаштирилиши керак.  ",
        choiceD : "Г)  Хавфли ишлаб чиқариш объектида қўлланиладиган техника қурилмалари саноат хавфсизлиги талабларига мувофиқлиги жиҳатидан қонун ҳужжатларида белгиланган тартибда объект корхонанинг имкониятидан келиб чиқиб сертификатлаштирилиши мумкин.  ",
        correct : "C"
    },{
        question : "4.Хавфли ишлаб чиқариш объектларининг саноат хавфсизлиги тўғрисидаги қонуннинг мақсади;",
        imgSrc : "img/js.png",
        choiceA : "А) Ушбу қонуннинг мақсади хавфли ишлаб чиқариш объектларининг саноат хавфсизлиги соҳасидаги аварияларни олдини олишдан иборат. ",
        choiceB : "Б)  Ушбу қонуннинг мақсади хавфли ишлаб чиқариш объектларининг саноат хавфсизлиги соҳасидаги муносабатларни тартибга солишдан иборат.",
        choiceC : "В) Ушбу қонуннинг мақсади хавфли ишлаб чиқариш объектларидаги бахтсиз ходисаларни текшириш ва хисобга олишдан иборат.",
        choiceD : "Г) Ушбу қонуннинг мақсади хавфли ишлаб чиқариш объектларининг саноат хавфсизлиги соҳасидаги қоидаларни тартибга солишдан иборат.",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 25; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    // qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    remove.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    question.style.display = "none";
    choiceA.style.display = "none";
    choiceB.style.display = "none";
    choiceC.style.display = "none";
    choiceD.style.display = "none";
    progress.style.display = "none";
    counter.style.display = "none";
    timeGauge.style.display = "none";
    btimeGauge.style.display = "none";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    const scoreOther = scorePerCent;
    
    // choose the image based on the scorePerCent
    // let img = (scorePerCent >= 80) ? "img/5.png" :
    //           (scorePerCent >= 60) ? "img/4.png" :
    //           (scorePerCent >= 40) ? "img/3.png" :
    //           (scorePerCent >= 20) ? "img/2.png" :
    //           "img/1.png";

    let scoreTitle = (scorePerCent >= 80) ? "А`ло Даражада" :
              (scorePerCent >= 60) ? "Яхши" :
              (scorePerCent >= 40) ? "Қониқарли" :
              (scorePerCent >= 20) ? "Қониқарсиз" :
              "Ёмон";
    
    scoreDiv.innerHTML = "<div class='score'><h1> Сизнинг ушбу тест бўйича натижангиз:</h1>"  + "<span>" + scorePerCent + "% - " + scoreTitle + "</span></div>";
    
    // scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
    let datas = {
        name: name,
        phone: phone,
        result: scorePerCent
    };

    firebaseOrdersCollection.push(datas); 

    
}





// Save Data

const formId = "saveMe"; // ID of the form
const url = location.href; //  href for the page
const formIdentifier = `${url} ${formId}`; // Identifier used to identify the form
const saveButton = document.querySelector("#save"); // select save button
// const alertBox = document.querySelector(".alert"); // select alert display div
let form = document.querySelector(`#${formId}`); // select form
let formElements = form.elements; // get the elements in the form


/**
 * This function gets the values in the form
 * and returns them as an object with the
 * [formIdentifier] as the object key
 * @returns {Object}
 */
const getFormData = () => {
    let data = { [formIdentifier]: {} }; // create an empty object with the formIdentifier as the key and an empty object as its value
    for (const element of formElements) {
      if (element.name.length > 0) {
        data[formIdentifier][element.name] = element.value;
      }
    }
    return data;
  };
  
  saveButton.onclick = event => {
    event.preventDefault();
    data = getFormData();
    localStorage.setItem(formIdentifier, JSON.stringify(data[formIdentifier],scoreOther));
    const message = "Form draft has been saved!";
    displayAlert(message);
  };
  
  /**
   * This function displays a message
   * on the page for 1 second
   *
   * @param {String} message
   */
  const displayAlert = message => {
    alertBox.innerText = message; // add the message into the alert box
    alertBox.style.display = "block"; // make the alert box visible
    setTimeout(function() {
      alertBox.style.display = "none"; // hide the alert box after 1 second
    }, 1000);
  };



















