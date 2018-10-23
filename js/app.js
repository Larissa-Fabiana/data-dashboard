function generalPage(){ //função de página
  $('#drop-menu').change( event => $("#infos").html(''));
  sumStudents();
  grades();
}

function sumStudents(){  // total de estudantes e desistentes
  $("#infos").html('');
  var sede = $('#drop-menu').val();

  for(turma in data[sede]){
    var sum = 0;
    var result = [];
    var total = 0;
    $("#infos").append(`<div class='periodElement' data-turma=${turma}>${turma}</div>`);
    
    for(student of data[sede][turma]['students']) {
      if (student.name !== undefined){
        sum+=1
      }

      var isStudentActive = student.active;
      total += 1;

      var resultFinal = 0;
      if (!isStudentActive) {
        result.push(student);
        resultFinal = (result.length/100) * total;
      }
    }

    $(`div[data-turma=${turma}]`).append(`
      <div class='sumStudentsElement'>total de alunas: ${sum}</div>
      <div class='dropoutsElement'>desistências: ${resultFinal.toFixed(2) + '%'}</div>
    `);
  }
}

function grades() {  //function para notas tech e hse totais
  var sede = $('#drop-menu').val();
  for (turma in data[sede]) {  //arrays com todas as notas em uma unica linha abaixo
    var techTotal = [];
    var hseTotal = [];
    for (student of data[sede][turma]['students']){
      // console.log('xuxu');
      // console.log(student.sprints);
      for (j in student['sprints']) {
        // console.log('xuxu');
        // console.log(j);
        // console.log(sprint['score']['tech']);
        techTotal.push(student['sprints'][j]['score']['tech']);  //joga notas na array tech
        hseTotal.push(student['sprints'][j]['score']['hse']);  //joga notas na array hse

        var resultTech = resultTechAndHseBootcamp(techTotal, j)
        var resultHSE = resultTechAndHseBootcamp(hseTotal, j)

      } 
    }
  }
  $("#infos").append(`
  <div class='techElement'>A média de notas tech no Bootcamp é: ${resultTech}</div>
  <div class='hseElement'>A média de notas HSE no Bootcamp é: ${resultHSE}</div>
  `);
}

function resultTechAndHseBootcamp(total, j){
  var hability = 0;
  var result = 0;
  for(var x=0; x < total.length; x++ ){
    hability += total[j];
    result = hability / total.length;
  }
  return(result);
}

function resultTechAndHse(total){
  var hability = 0;
  var result = 0;
  for(var i=0; i < total.length; i++ ){
    hability += total[i];
    result = hability / total.length;
  }
  return(result);
}

 

function bootcampPage(){ //função de página
  $("#infos").html('');
  $('#drop-menu').change( event => $("#infos").html('') );
  averageNps();
  bestGrades();
}

function averageNps(){ //NPS
  var sede = $('#drop-menu').val();
  var arraySprints = [];
  for (turma in data[sede]) {
    $("#infos").append(`<div class='averageNpsElement' data-turma=${turma}>${turma}</div>`);
    var result = [];
    for (i in data[sede][turma]['ratings']) {
      var studentsPromoters = data[sede][turma]['ratings'][i]['nps']['promoters'];
      var studentsDetractors = data[sede][turma]['ratings'][i]['nps']['detractors'];
      arraySprints.push(i);
      result.push(studentsPromoters-studentsDetractors);
    }
    var resultFinal = resultTechAndHse(result)
    $(`div[data-turma=${turma}]`).append(`
    <div class='sumSprintsElement'>O número de sprints é de: ${result.length} sprints</div>
    <div class='npsElement'>A média do NPS dos sprints foi de ${parseFloat(resultFinal.toFixed(2))} %</div>
    `);
  }
}

function bestGrades() {  //function para alunas acima de 70%, tech e hse
  var sede = $('#drop-menu').val();
  for (turma in data[sede]) {   // alunas acima de 70% por turma
    $("#infos").append(`<div class='bestGradesElement' data-turma=${turma}bestGradesElement>${turma}</div>`);
    var arrayOfSprints = [];
    var arrayOfHSESprints = [];
    var studentsOfSprints = [];
    var studentsOfHSE = [];
    for (i in data[sede][turma]['students']){
      // var techTotal = [];
      // var hseTotal = [];
      //duplicar esse for
      var arrTech = arrayOfSprint('tech', 1280, data[sede][turma]['students'][i])
      arrTech.forEach(element => {
        arrayOfSprints.push(element)
      });
      var arrHse = arrayOfSprint('tech', 1280, data[sede][turma]['students'][i])
      arrHse.forEach(element => {
        arrayOfHSESprints.push(element)
      });

      var ind = arrayOfSprints.indexOf(data[sede][turma]['students'][i]['name']);
      if (ind>=0){
        studentsOfSprints.push(ind);
      }
      var indHSE = arrayOfHSESprints.indexOf(data[sede][turma]['students'][i]['name']);
      if (indHSE>=0){
        studentsOfHSE.push(indHSE);
      }
    }
    $(`div[data-turma=${turma}bestGradesElement]`).append(`
    <div class='gradesElement'>A quantidade de alunas com notas TECH acima de 70% em todos os sprints é ${studentsOfSprints.length}</div>
    <div class='grdElement'>A quantidade de alunas com notas HSE acima de 70% em todos os sprints é ${studentsOfHSE.length}</div>
    `);
  }
}

function arrayOfSprint(techOrHse, min, dataBase){
  var total = [];
  var arrayOfSprints = [];
  for (j in dataBase['sprints']) {          
    var grade = dataBase['sprints'][j]['score'][techOrHse];
    if (grade >= min) {
      total.push(grade);
    } else {total.push(0);}
    if(total[j]>0){
      arrayOfSprints.push(dataBase['name']);
    }
  }
  return(arrayOfSprints);
}


function teamPage() { //função de página
  $("#infos").html('');
  $('#drop-menu').change( event => $("#infos").html('') );
  teachers();
  satisfaction();
}

function teachers(){ //notas de professores e jedis
  var sede = $('#drop-menu').val();
  var arraySprints = [];
  for (turma in data[sede]) {
    var resultTeacher = [];
    var resultJedi = [];
    for (i in data[sede][turma]['ratings']){
      arraySprints.push(i);
      resultTeacher.push(data[sede][turma]['ratings'][i]['teacher']);  
      resultJedi.push(data[sede][turma]['ratings'][i]['jedi']);     
    }
    var resultFinalT = resultTechAndHse(resultTeacher)
    var resultFinalJ = resultTechAndHse(resultJedi)
  }
  $("#infos").append(`
  <div class='teachersElement'>A média dos mentores é ${resultFinalT.toFixed(2)}</div>
  <div class='jediElement'>A média dos Jedi Masters é  ${resultFinalJ.toFixed(2)}</div>
  `);
}

function satisfaction(){ //satisfação média por sede
  var sede = $('#drop-menu').val();
  var arraySprints = [];
  for (turma in data[sede]) {
    $("#infos").append(`<div class='satisfactionElement' data-turma=${turma}>${turma}</div>`);
    var result = [];
    for (i in data[sede][turma]['ratings']) {
      var cumpleExpectancy = data[sede][turma]['ratings'][i]['student']['cumple'];
      var superaExpectancy = data[sede][turma]['ratings'][i]['student']['supera'];
      arraySprints.push(i);
      // var sizeSprints = arraySprints.length;
      result.push(cumpleExpectancy + superaExpectancy);
    }
    var resultFinal = resultTechAndHse(result)
    $(`div[data-turma=${turma}]`).append(`<div class='expectationElement'>Alunas satisfeitas com a experiência na Laboratoria: ${resultFinal.toFixed(2)} %</div>`);
  }
}

function studentsPage(){ //função de página
  $("#infos").html('');
  $('#drop-menu').change( event => $("#infos").html('') );
  studentList();
}

function studentList(){ //lista de estudantes
  $("#infos").html('');
  var sede = $('#drop-menu').val();
  for(turma in data[sede]){
    $("#infos").append(`<div class='studentElement' data-turma=${turma}>${turma}</div>`);
    console.log(turma)
    $(`div[data-turma=${turma}]`).append(`<div class='studentsActiveOrInative' data-turma=${turma}studentsActiveOrInative></div>`);
    for(i in data[sede][turma]['students']){
      var stdActive = data[sede][turma]['students'][i]['active'];
      if (stdActive){
        stdActive = "Ativa";
        $(`div[data-turma=${turma}]`).append(`<div class='stdnElement'>${data[sede][turma]['students'][i]['name']} - status: ${stdActive}</div>`);
      }
      if (!stdActive){
        stdActive = "Inativa";
        $(`div[data-turma=${turma}]`).append(`<div class='stdnElement'>${data[sede][turma]['students'][i]['name']} - status: ${stdActive}</div>`);
      }
    }
    // $(`div[data-turma=${turma}]`).append(`<div class='studentsActiveOrInative'></div>`);
  }
}

function goOutPage(){ //função de página de logout
  window.onload = $('document').body.html('');
  $("#body").append(`<h1 class='outputElement'>Nos vemos na próxima :)</h1>`);
}