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

function errorMsg(bnt, evt, msg) {
    let message = document.getElementById('send-msg');
    let button = document.getElementById('button-error');
    button.innerHTML = `<button type="button" onclick="${evt}" class="btn btn-secondary botao-padrao border-0" data-bs-dismiss="modal">${bnt}</button>`;
    message.innerHTML = `${msg}`;
}

const handleSubmit = (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const mail = document.getElementById('mail').value;
    const phone = document.getElementById('phone').value;
    const contact = document.getElementById('contact').value;
    const satisfaction = document.getElementById('satisfaction').value;
    const like = document.getElementById('like').checked ? 'Sim' : 'Não';

    if (name===""){
        errorMsg('Nome','' , 'Preciso saber seu nome');
    }else if(mail===""){
        errorMsg('E-mail','' , 'Digite seu e-mail por favor!');
    }else if(phone===""){
        errorMsg('Telefone','' , 'Digite seu telefone por favor!');
    }else if(contact==="Preferência de contato:"){
        errorMsg('Preferência de contato','' , 'Selecione o tipo de contato para retorno por favor!');
    }else{

        addLoading();    

        fetch('https://api.sheetmonkey.io/form/6KQ8dDRaVNhm1WRV7EXtCu', {

            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, mail, phone, contact, satisfaction, like}),
        })

        removeLoading();

        errorMsg('Obrigado!','sendClick()' , 'Dados enviados com sucesso!');

    }
}

document.querySelector('form').addEventListener('submit', handleSubmit);

function sendClick(){
   
    document.querySelector('form').reset();

}
