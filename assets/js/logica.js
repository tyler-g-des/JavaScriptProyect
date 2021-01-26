// Event
document.querySelector('.m-5').addEventListener('mouseover',prepareQuestion);
document.querySelector('#formulario').addEventListener('submit',validation);

//Managment question
  let questions = [
    'Tu mensaje esta dirigido a la audiencia a la que quieres atraer?',
    'Tu usuario pasa al menos un minuto en tu web?',
    'Es facil para tu usuario encontrar lo que busca?',
    'Tu usuario puede llegar a tu pagina de servicios o productos en al menos 2 clics?',
    'Tu pagina de inicio responde clara y sencillamente que hay para el usuario en tu web?',
    'El texto es facil de leer en cualquier dispositivo?',
    'Tu contenido mezcla diferentes medios para hacer la estancia del usuario mas amena?'
  ];
  let valueQuestion=0;


  function prepareQuestion()
  {
    let textQuestion = document.querySelector('.m-5');
    textQuestion.innerHTML = questions[valueQuestion];
  }

  function nextQuestion()
  {
    let newBtn = document.querySelector('#centerText');

    if(valueQuestion >= questions.length -1){
      //restartQuestion();
      newBtn.innerHTML += `</br> <a class="btn btn-success" onclick="getQuestion()">View Result </a>`; 
    }
    else
    {
     valueQuestion++;
    }
  }

  function restartQuestion()
  {
      valueQuestion=0;
  }


 //logic

 function validation(e)
 {
    let response = document.querySelector('#response').value;

    
    if(response === null || response === undefined  || response === "" )
    {
        alert('Debes completare la pregunta')
    }
    else
    {
         nextQuestion();
         prepareQuestion();
         SaveQuestion(questions[valueQuestion],response)
    }
    e.preventDefault();
 }


 // Local Storage
function SaveQuestion(question,response)
{
    const questionAnswer = {
        question,
        response
    };

    if(localStorage.getItem('questionsGlobal') === null){

        let questionGlobal =  [] ;
        questionGlobal.push(questionAnswer);
        localStorage.setItem('questionsGlobal', JSON.stringify(questionGlobal));

    }else{
       let questionGlobal = JSON.parse(localStorage.getItem('questionsGlobal'));
       questionGlobal.push(questionAnswer);
       localStorage.setItem('questionsGlobal',JSON.stringify(questionGlobal));
    }

}

function getQuestion()
{
   let questions = JSON.parse(localStorage.getItem('questionsGlobal'));
   let result = document.querySelector('#centerText');

   
   for (let index = 0; index < questions.length; index++) {

    let question = questions[index].question;
    let answer = questions[index].response;
   
    result.innerHTML += `</br> </br> <div class="card">
      <div class="card-body">
           <p id="value">${question} - ${answer} </p>
           <a class="btn btn-primary" onclick="editQuestion('${question}')">
           Edit</a>

           <a class="btn btn-danger" onclick="editQuestion('${answer}')">
           Delete</a>     
      </div>
     </div> `
   }  
   alert('entro ')
}

function editQuestionCreated(questionModified,newAnswer)
{
  let questions  = JSON.parse(localStorage.getItem('questionsGlobal'));
  for (let index = 0; index < questions.length; index++) {
     if(questions[index].question == questionModified)
     {
       questions[index].response = newAnswer;
       localStorage.setItem('questionsGlobal',JSON.stringify(questions))
       stop;
     }
  }
}

function editQuestion(question)
{
   let cardEdit = document.querySelector('#value');
   let result = document.querySelector('#centerText');

    cardEdit.innerHTML = '';

    cardEdit.innerHTML += `<form id="newForm"> <input type="text" id="newAnswer" class="form-control"> 
                            </br> </br> <button type="submit" class="btn btn-success">Save</button> </form>` +  question;

    document.querySelector('#newForm').addEventListener('submit',function(){
      let newAnswerr = document.querySelector('#newAnswer').value;
     
      editQuestionCreated(question,newAnswerr);

      result.innerHTML = '';
      cardEdit.innerHTML = '';
      getQuestion();

    });   
 
}