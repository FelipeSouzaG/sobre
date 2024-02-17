const inputCheck = document.querySelector('#modo-noturno');
const elemento = document.querySelector('body');

inputCheck.addEventListener('click', () => {
    const modo = inputCheck.checked ? 'dark' : 'light';
    elemento.setAttribute('data-bs-theme', modo);
})

const button = document.getElementById('fel');

const addLoading = () => {
    button.innerHTML = '<div class="progress"><div class="progress-bar"></div></div>';
}

const removeLoading = () => {
    button.innerHTML = 'Enviar';
}

const handleSubmit = (event) => {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const mail = document.getElementById('mail').value;
    const phone = document.getElementById('phone').value;
    const contact = document.getElementById('contact').value;
    const satisfaction = document.getElementById('satisfaction').value;
    const like = document.getElementById('like').checked ? 'Sim' : 'Não';

    const msg = document.getElementById('send-msg');

    if(name != ""){

        if(mail != "" || phone != ""){

            addLoading();

            fetch('https://api.sheetmonkey.io/form/6KQ8dDRaVNhm1WRV7EXtCu', {
        
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, mail, phone, contact, satisfaction, like}),
            }).then(() => removeLoading());
            
        } else{
            msg.innerHTML = 'Digite o e-mail ou telefone para retornar o contato';
        }

    } else {
        msg.innerHTML = 'Preciso saber seu nome';    
    }
}

document.querySelector('form').addEventListener('submit', handleSubmit);

function sendClick(){

    document.getElementById('name').value = "";
    document.getElementById('mail').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('contact').value = "Preferência de contato:";
    document.getElementById('satisfaction').value = 50;
    document.getElementById('like').checked = false; 
}