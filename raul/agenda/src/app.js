let agenda = localStorage.getItem('agenda') 
agenda = JSON.parse(agenda);
const itemSet = (localStorage.getItem('agenda') !== null);





let profileName = document.getElementById("profileName");
let profileTitle = document.getElementById("profileTitle");

let hour = document.getElementsByClassName("hora");
let ActivityName = document.getElementsByClassName("atividade");
let local = document.getElementsByClassName("local");
let lista = document.getElementsByClassName("lista");
let imagem = document.getElementsByClassName("image")

let ids = [];
let counter = 0;
let c = 0;


document.body.onload = () => {

    profileName.innerHTML = agenda.profiles.name;
    profileTitle.innerHTML = agenda.profiles.title
    do{

        if(agenda.chores[c].isDone == false){
            hour[counter].innerHTML = agenda.chores[c].hour;
            ActivityName[counter].innerHTML = agenda.chores[c].ActivityName;
            local[counter].innerHTML = agenda.chores[c].place
            lista[counter].innerHTML = '';
            for(let i = 0; i<agenda.chores[c].todo.length; i++){
    
                if(agenda.chores[c].todo[i].isDone == false){
                    lista[counter].innerHTML += "<li>" + agenda.chores[c].todo[i].info  + "</li>"
                }
                
                
            }
            counter ++
            ids.push(agenda.chores[c].id)
        }

        c++;

    }while(counter <3)

}

function addNew(){

    let todoCounter = 0;
    
    let toAddName = document.getElementById("nameADD").value;
    let toAddHour = document.getElementById("hourADD").value;
    let toAddLocal = document.getElementById("localADD").value;

    if (toAddName != '' || toAddHour != '' || toAddLocal != ''){

        let newChore = {

            userID: 1,
            id: agenda.chores.length,
            ActivityName: toAddName,
            hour: toAddHour,
            place: toAddLocal,
            isDone: false,
            todo:[
                {
                    id: 1,
                    info: document.getElementById("lista0").value,
                    isDone: false
                },  
                {
                    id: 2,
                    info: document.getElementById("lista1").value,
                    isDone: false
                },
                {
                    id: 3,
                    info: document.getElementById("lista2").value,
                    isDone: false
                }
            ] 
            
        }

        agenda.chores.push(newChore);
        localStorage.setItem('agenda', JSON.stringify(agenda));
        location.reload()

    }else{
        alert("favor preencher o resto")
        
    }
    


}

function done(doneID){
    for(let c = 0; c < agenda.chores.length; c++){
        if(agenda.chores[c].id == ids[doneID]){
            agenda.chores[c].isDone = true;
            console.log(agenda);
            localStorage.setItem('agenda', JSON.stringify(agenda));
            location.reload();
        }
    }
}

    


document.getElementById("addButton").addEventListener("click", addNew);

document.getElementById("doneButton0").addEventListener("click", () => done(0));
document.getElementById("doneButton1").addEventListener("click", () => done(1));
document.getElementById("doneButton2").addEventListener("click", () => done(2));
