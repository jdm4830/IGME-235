
//1
window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked};
	
 // 2
 let displayTerm = "";

 // 3
 function searchButtonClicked(){
     console.log("searchButtonClicked() called");
     
     // 2
     // Trivia API URL
     // Trivia API site URL: https://opentdb.com
     //https://opentdb.com/api.php?amount=25&category=15
     const API_URL = "https://opentdb.com/api.php?amount=";

     // 3 - build up our URL string
     let url = API_URL;
     
     // 4 - parse the user entered term we wish to search
     let term = document.querySelector("#searchterm").value;
     let difficultyTerm = document.querySelector("#difficultyterm").value;
     let typeTerm = document.querySelector("#typeterm").value;

     displayTerm = term;

     // 5 - get rid of any leading and trailing spaces
     term = term.trim();
     difficultyTerm = difficultyTerm.trim();
     typeTerm = typeTerm.trim();

     // 6 - encode spaces and special characters
     term = encodeURIComponent(term);
     
     // 8 - append the search term to the URL - the parameter name is 'q'
     if("#searchterm" > 50 || "#searchterm" < 0)
     {
        document.querySelector("#status").innerHTML = "<b>Please Pick a Number 1-50</b>";
        return;
     }
     else
     {
        url += + term + "&category=15";
     }
    

     if(difficultyTerm != "Any")
     {
        url += "&difficulty=" + difficultyTerm.toLowerCase();
     }

     if(typeTerm != "Any")
     {
        url += "&type=" + typeTerm.toLowerCase();
     }

     // 11 - see what the URL looks like
     console.log(url);

     // 12 Request data!
     getData(url);

    var x = document.getElementById("quizHIDE");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
 }

 function getData(url){
     // 1 - create a new XHR object
     let xhr = new XMLHttpRequest();

     // 2 - set the onload handler
     xhr.onload = dataLoaded;

     // 3 - set the onerror handler
     xhr.onerror = dataError;

     // 4 - open connection and send the request
     xhr.open("GET",url);
     xhr.send();
 }

 
 let result;
 var correctAnswerList = [];

 // Callback functions
 function dataLoaded(e)
 {
     // 5 - event.target is the xhr object
     let xhr = e.target;

     // 6 - xhr.responseText is the JSON file we just downloaded
     console.log(xhr.responseText);

     
     // 7 - turn the text into a parsable JavaScript object
     let obj = JSON.parse(xhr.responseText);

     let results = obj.results
     let questionString = "";
     //console.log("results.length = " + results.length);

     for (let i=0; i<results.length; i++)
     {
        result = results[i];

        let question = result.question;
        let qType = result.type;
        let qDifficulty = result.difficulty;
        let answersList = result.correct_answer + "," + result.incorrect_answers;
        let randomizeList = answersList.split(',');
        let randomize = randomizeList.sort(() => Math.random() -0.5);
        console.log(randomize);
        console.log(result.correct_answer);
        //let allAnswers = result.correct_answer + "," + result.incorrect_answers;

        let line = `<div class='result'>`;
        //line += `<span>Type: ${qType}</span>`;
        line += `<span>Question: ${question}</span>`;
        line += `<span>Difficulty: ${qDifficulty}</span>`;
        //line += `<span>Answers: ${randomize} </span></div>`;

        if(qType == "multiple")
        {
            line += `<form> 
            <input type="radio" name="choice" value="${randomize[0]}"> <label><span class="checkmark"></span>${randomize[0]}</label>
            <input type="radio" name="choice" value="${randomize[1]}"> <label><span class="checkmark"></span>${randomize[1]}</label>
            <input type="radio" name="choice" value="${randomize[2]}"> <label><span class="checkmark"></span>${randomize[2]}</label>
            <input type="radio" name="choice" value="${randomize[3]}"> <label><span class="checkmark"></span>${randomize[3]}</label>
            </form><br>`;
        }
        else if(qType == "boolean")
        {
            line += `<form> 
            <input type="radio" name="choice" value="${randomize[0]}"> <label> ${randomize[0]}</label>
            <input type="radio" name="choice" value="${randomize[1]}"> <label> ${randomize[1]}</label>
            </form><br>`;
        }
        if(i == 0 )
        {
            correctAnswerList[i] = result.correct_answer;
        }
        else if(i > 0)
        {
            correctAnswerList[i] = result.correct_answer;
        }
        questionString += line;
    }
    console.log(correctAnswerList);
    questionString += `<input type="submit" value="submit" onclick="validate()"></input><br>`;
    document.querySelector("#content p").innerHTML = questionString;
    
 }

 var rightAnswers = 0;
 var wrongAnswers = 0;

 function validate() 
 {
    var a = document.getElementsByName("choice");
    for (var i = 0; i < a.length; i++) {
      if (a[i].checked) 
      {
        console.log(a[i].value);
        if(a[i].value == correctAnswerList[i])
        {
            rightAnswers += 1;
            alert("You got " + rightAnswers + " Answer(s) Correct!");
        }
        else if(a[i].value != correctAnswerList[i])
        {
            wrongAnswers += 1;
            console.log(correctAnswerList[i]);
            alert("You got " + wrongAnswers + " Answer(s) Wrong!");
        }
        break;
      }
    }
    console.log(wrongAnswers);
    console.log(rightAnswers);
}   

 function dataError(e){
     console.log("An error ocurred");
 }
function refreshPage(){
    location.reload();
}
