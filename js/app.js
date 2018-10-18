function generalPage(){ //função de página
  $('#drop-menu').change( event => $("#infos").html(''));
  sumStudents();
  grades();
}

function sumStudents(){  // total de estudantes e desistentes
  $("#infos").html('');
  var sede = $('#drop-menu').val();
  var sum = 0;
  var result = [];
  var total = 0;
  for(turma in data[sede]){
    $("#infos").append(`<div class='periodElement'>${turma}</div>`);
    for(i in data[sede][turma]['students']){
      if (data[sede][turma]['students'][i]['name']==undefined){
        //console.log('NÃO TEM NADA');
      }
      else{
        sum+=1
      }
      var students = data[sede][turma]['students'][i]['active'];
      total+=1;
      if (students === false) {
        result.push(i);
        var resultFinal = result.length;
        resultFinal = (resultFinal/100) * total;
        resultFinal.toFixed(2);
        resultFinal = resultFinal + '%';
      } 
    }
    $('.periodElement').append(`
    <div class='sumStudentsElement'>total de alunas: ${sum}</div>
    <div class='dropoutsElement'>desistências: ${resultFinal}</div>
    `);
  }
}

function grades() {  //function para notas tech e hse totais
  var sede = $('#drop-menu').val();
  for (turma in data[sede]) {  //arrays com todas as notas em uma unica linha abaixo
    var techTotal = [];
    var hseTotal = [];
    for (i in data[sede][turma]['students']){
      for (j in data[sede][turma]['students'][i]['sprints']) {
        var techGrade = data[sede][turma]['students'][i]['sprints'][j]['score']['tech'];
        var hseGrade = data[sede][turma]['students'][i]['sprints'][j]['score']['hse'];
        techTotal.push(techGrade);  //joga notas na array tech
        hseTotal.push(hseGrade);  //joga notas na array hse
        var tech = 0;
        var resultTech = 0;
        for(var x=0; x<techTotal.length; x++){
          tech+=techTotal[j];
          resultTech = tech/techTotal.length;
        }
        var habilidadesSE = 0;
        var resultHSE = 0;
        for(var x=0; x<hseTotal.length; x++){
          habilidadesSE+=hseTotal[j];
          resultHSE = habilidadesSE/hseTotal.length;
        }
      } 
    }
  }
  $("#infos").append(`
  <div class='techElement'>A média de notas tech no Bootcamp é: ${resultTech}</div>
  <div class='hseElement'>A média de notas HSE no Bootcamp é: ${resultHSE}</div>
  `);
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
    $("#infos").append(`<div class='averageNpsElement'>${turma}</div>`);
    var result = [];
    for (i in data[sede][turma]['ratings']) {
      var studentsPromoters = data[sede][turma]['ratings'][i]['nps']['promoters'];
      var studentsDetractors = data[sede][turma]['ratings'][i]['nps']['detractors'];
      arraySprints.push(i);
      result.push(studentsPromoters-studentsDetractors);
    }
    var total = 0;
    var resultFinal = 0;
    for(var j=0; j<result.length; j++){
      total+=result[j];
      resultFinal = total/result.length;
    }
    $(".averageNpsElement").append(`
    <div class='sumSprintsElement'>O número de sprints é de: ${result.length} sprints</div>
    <div class='npsElement'>A média do NPS dos sprints foi de ${parseFloat(resultFinal.toFixed(2))} %</div>
    `);
  }
}

function bestGrades() {  //function para alunas acima de 70%, tech e hse
  var sede = $('#drop-menu').val();
  for (turma in data[sede]) {   // alunas acima de 70% por turma
    $("#infos").append(`<div class='bestGradesElement'>${turma}</div>`);
    arrayOfSprints = [];
    arrayOfHSESprints = [];
    studentsOfSprints = [];
    studentsOfHSE = [];
    for (i in data[sede][turma]['students']){
      var techTotal = [];
      var hseTotal = [];
      //duplicar esse for
      for (j in data[sede][turma]['students'][i]['sprints']) {          
        var techGrade = data[sede][turma]['students'][i]['sprints'][j]['score']['tech'];
        if (techGrade >= 1280) {
          techTotal.push(techGrade);
        } else {techTotal.push(0);}
        if(techTotal[j]>0){
          arrayOfSprints.push(data[sede][turma]['students'][i]['name']);
        }
      }
      for (y in data[sede][turma]['students'][i]['sprints']) {          
        var hseGrade = data[sede][turma]['students'][i]['sprints'][y]['score']['hse'];
        if (hseGrade >= 840) {
          hseTotal.push(hseGrade);
        } else {hseTotal.push(0);}
        if(hseTotal[y]>0){
          arrayOfHSESprints.push(data[sede][turma]['students'][i]['name']);
        }
      }
      var ind = arrayOfSprints.indexOf(data[sede][turma]['students'][i]['name']);
      if (ind>=0){
        studentsOfSprints.push(ind);
      }
      var indHSE = arrayOfHSESprints.indexOf(data[sede][turma]['students'][i]['name']);
      if (indHSE>=0){
        studentsOfHSE.push(indHSE);
      }
    }
    $(".bestGradesElement").append(`
    <div class='gradesElement'>A quantidade de alunas com notas TECH acima de 70% em todos os sprints é ${studentsOfSprints.length}</div>
    <div class='grdElement'>A quantidade de alunas com notas HSE acima de 70% em todos os sprints é ${studentsOfHSE.length}</div>
    `);
  }
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
      var teachers = data[sede][turma]['ratings'][i]['teacher'];
      var jedis = data[sede][turma]['ratings'][i]['jedi'];
      arraySprints.push(i);
      var sizeSprints = arraySprints.length;
      resultTeacher.push(teachers);  
      resultJedi.push(jedis);     
    }
    var totalT = 0;
    var resultFinalT = 0;
    for(var j=0; j<resultTeacher.length; j++){
      totalT+=resultTeacher[j];
      resultFinalT = totalT/resultTeacher.length;
    }
    var totalJ = 0;
    var resultFinalJ = 0;
    for(var j=0; j<resultJedi.length; j++){
      totalJ+=resultJedi[j];
      resultFinalJ = totalJ/resultJedi.length;
    }
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
    $("#infos").append(`<div class='satisfactionElement'>${turma}</div>`);
    var result = [];
    for (i in data[sede][turma]['ratings']) {
      var cumpleExpectancy = data[sede][turma]['ratings'][i]['student']['cumple'];
      var superaExpectancy = data[sede][turma]['ratings'][i]['student']['supera'];
      arraySprints.push(i);
      var sizeSprints = arraySprints.length;
      result.push(cumpleExpectancy + superaExpectancy);
    }
    var total = 0;
    var resultFinal = 0;
    for(var j=0; j<result.length; j++){
      total+=result[j];
      resultFinal = total/result.length;
    } 
    $(".satisfactionElement").append(`<div class='expectationElement'>Alunas satisfeitas com a experiência na Laboratoria: ${resultFinal.toFixed(2)} %</div>`);
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
    $("#infos").append(`<div class='studentElement'>${turma}</div>`);
    $(".studentElement").append(`<div class='studentsActiveOrInative'></div>`);
    for(i in data[sede][turma]['students']){
      var stdActive = data[sede][turma]['students'][i]['active'];
      if (stdActive === true){
        stdActive = "Ativa";
        $(".studentsActiveOrInative").append(`<div class='stdnElement'>${data[sede][turma]['students'][i]['name']} - status: ${stdActive}</div>`);
      }
      if (stdActive === false){
        stdActive = "Inativa";
        $(".studentsActiveOrInative").append(`<div class='stdnElement'>${data[sede][turma]['students'][i]['name']} - status: ${stdActive}</div>`);
      }
    }
  }
}

function goOutPage(){ //função de página de logout
  window.onload = document.body.html('');
  $("#body").append(`<h1 class='outputElement'>Nos vemos na próxima :)</h1>`);
}