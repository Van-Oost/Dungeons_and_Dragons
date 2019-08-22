var turnoJ = 1;
var rondaJ = 1;


function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("tabla");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[0];
        y = rows[i + 1].getElementsByTagName("TD")[0];
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
    }
  }
}

// CAMBIAR VALORES

function cambiarIniciativa(personaje) {
    var nuevaIniciativa = prompt("nueva iniciativa");
    document.getElementById(personaje).innerHTML = nuevaIniciativa;
}


function cambiarHp(personajeHp) {
    var danio = parseInt(prompt("DAÑO"));
    var hp = document.getElementById(personajeHp).innerHTML;
    var nuevoHp = hp - danio;
    document.getElementById(personajeHp).innerHTML = nuevoHp;
}

function cambiarTotal(personaje) {
    var nuevoTotal = prompt("MAX HP");
    document.getElementById(personaje).innerHTML = nuevoTotal;
}

function cambiarNombre(monstruo) {
    var nuevoNombre = prompt("Nombre bicho");
    document.getElementById(monstruo).innerHTML = nuevoNombre;
}


//  OCULTAR MONSTRUOS


function toggleOption(thisselect) {
    var selected = thisselect.options[thisselect.selectedIndex].value;
    toggleRow(selected);
}

function toggleRow(id) {
  var row = document.getElementById(id);
  if (row.style.display == '') {
    row.style.display = 'none';
  }
  else {
     row.style.display = '';
  }
}

function showRow(id) {
  var row = document.getElementById(id);
  row.style.display = '';
}

function hideRow(id) {
  var row = document.getElementById(id);
  row.style.display = 'none';
}

function hideAll() {
 hideRow('monster1');
 hideRow('monster2');
 hideRow('monster3');
 hideRow('monster4');
}

// Turno del Jugador NEXT/PREV



function proximoTurno(turno) {
    
    do {
        marcarTurno(turno);
        turno++;
        if (sePaso(turno)) {
            volverAempezar()
            turno=1;
            marcarTurno(turno);
            return turno;
        }
    } while (esOculto(turno));
    marcarTurno(turno);
    return turnoJ = turno;
} 

function esOculto(turno) {
    var fila = document.getElementsByTagName("tr")[turno]
    if (sePaso(turno)) {
        volverAempezar()
        return {turno:turno, turnoJ:turno};
    } 
    if (typeof fila != "object") {
        return false;
    } else if (fila.style.display == "none") {
        return true;
    } else {
        return false;
    }
}

function turnoAnterior(turno) {
    marcarTurno(turno);
    do {
        turno--;
    } while (esOculto(turno));
    marcarTurno(turno);
    return turnoJ = turno;
}


function marcarTurno(turno) {
    fila = document.getElementsByTagName("tr")[turno];
    fila.classList.toggle("turnoJugador");
}
   


function fight (turno,ronda) {
    sortTable();
    marcarTurno(turno);
    marcarRonda(ronda);
}

function sePaso(turno) {
    if (turno > 8) {
       return true;
    } else {
        return false;
    }
}

function volverAempezar() {
    turno = 1;
    turnoJ=turno;
    var ronda = rondaJ+1;
    rondaJ=ronda;
    marcarRonda(rondaJ);
    return {turno:turno, turnoJ:turno, rondaJ:ronda};
}

function marcarRonda(ronda) {
    document.getElementById("roundDisplay").innerHTML = "Round "+rondaJ;
}
