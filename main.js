let countQuestion =document.querySelector('.quiz-info .count span');
let bulletsSpanConatiner=document.querySelector('.bullets .spans'); 
let Index=0;
let ranswer=0;
let quizArea=document.querySelector('.quiz-area');
let answerArea=document.querySelector('.answers-area'); 
let submitButton = document.querySelector('.submit-button');
let Bullet=document.querySelector('.bullets');
let theResulte = document.querySelector('.results');
let countInterval;
let countDown=document.querySelector('.countdown');


function restriveQuestion()
{
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function()
    {
        if(this.readyState===4 && this.status===200)
        {
            let questionObjects=JSON.parse(this.responseText);
            let questionCount =questionObjects.length;
            console.log(questionCount);
            Bulletes(questionCount);
            addData(questionObjects[Index],questionCount);
            countDownFun(60,questionCount);
            submitButton.onclick=()=>{
                let theRightAnswer = questionObjects[Index].right_answer;
                console.log(theRightAnswer);
                Index++;
                checkAnswer(theRightAnswer,questionCount);
                quizArea.innerHTML="";
                answerArea.innerHTML="";
                addData(questionObjects[Index],questionCount);
                //handle bulltes classes
                handleBulltes();
                clearInterval(countDownInterval);
                showResults(questionCount);
                countDownFun(60,questionCount);
               

                
            };

        };
    } 

    xhr.open("GET","Question.json",true);
    xhr.send();
};
restriveQuestion();

function Bulletes(num){
    countQuestion.innerHTML=num;

    for(let i=0;i<num;i++)
    {
    let Bullets =document.createElement("span");
    if(i===0)
    {
        Bullets.className='active'
    }
    bulletsSpanConatiner.appendChild(Bullets);
    }

}
function addData(object,count)
{
  
    if(Index<count){
    let titleOfQuesion =document.createElement("h2");
    let questionText=document.createTextNode(object['title']);
    titleOfQuesion.appendChild(questionText);
    quizArea.appendChild(titleOfQuesion);


    for(let i=1;i<=4;i++)
    {
        let divMain=document.createElement('div');
        divMain.className='answer';
        let radioButton =document.createElement('input');
        radioButton.name="question";
        radioButton.id=`answer_${i}`;
        radioButton.dataset.answer=object[`answer_${i}`];
        radioButton.type='radio';
        let label= document.createElement('label');
        label.htmlFor=`answer_${i}`;
        let labelText = document.createTextNode(object[`answer_${i}`]);

        if(i===1)
        {
            radioButton.checked=true;
        }

        label.appendChild(labelText);
        divMain.appendChild(radioButton);
        divMain.appendChild(label);
        answerArea.appendChild(divMain);
    }

    }
}
let  theChosenAnswer;
function checkAnswer(Ans,count)
{
  
    let answers =document.getElementsByName('question');
    // let theChosenAnswer;
    for(let i=0;i<answers.length;i++)
    {
        if(answers[i].checked)
        {
            theChosenAnswer =answers[i].dataset.answer;
        }
    }
    // console.log(`right answer is ${Ans}`);
    // console.log(`chosen answer is ${theChosenAnswer}`);

    if(Ans===theChosenAnswer)
    {
        ranswer++;
        console.log('================good answer=====');
    }

}
function handleBulltes()
{
    let bulletspan =document.querySelectorAll('.bullets .spans span');
    let arrayOfSpans =Array.from(bulletspan);
    arrayOfSpans.forEach((span,index)=>{
        if(Index===index)
        {
            span.className="active";
        }
    });
}


function showResults(count)
{
    let Results;
    if(Index===count)
    {
       quizArea.remove();
       answerArea.remove();
       submitButton.remove();
       Bullet.remove();
       if(ranswer>(count/2) && ranswer<count)
       {
           Results = `<span class="good">GOOD RESULTS</span>,Your results is :${ranswer} From ${count}`;
       }else if(ranswer===count)
       {
        Results = `<span class="good">Excellent you answered All questions </span>,Your results is :${ranswer}  From ${count}`;
       }else{
        Results = `<span class="good">Unfortionatliy</span>,Your results is :${ranswer} From ${count}`;
       }
       theResulte.innerHTML=Results;
       theResulte.style.padding='13px';
       theResulte.style.backgroundColor='#d74249';
       theResulte.style.marginTop='100px';
       theResulte.style.borderRadius='10px';
       
       
    }
}

function countDownFun(duration,count)
{
    if(Index<count)
    {
        let min,sec;
        countDownInterval=setInterval(() => {
            min=parseInt(duration/60);
            sec=parseInt(duration%60);
            min = min < 10 ? `0${min}`:min;
            sec = sec < 10 ? `0${sec}`:sec;
            countDown.innerHTML=`${min}:${sec}`;
            if(--duration<0)
            {
                clearInterval(countDownInterval);
                console.log('finished');
                submitButton.click();
            }
        }, 1000);
    }
}












