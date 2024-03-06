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

const validMail = (mail) => {
    let valid = /\S+@\S+\.\S+/;
    return valid.test(mail);
}


function mascara(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmascara()",1)
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
function mtel(v){
    v=v.replace(/\D/g,"");
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2");
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");
    return v;
}
function id( el ){
	return document.getElementById( el );
}
window.onload = function(){
	id('phone').onkeyup = function(){
		mascara( this, mtel );
	}
}

const handleSubmit = (event) => {
    event.preventDefault();

    addLoading();
	
    const name = document.getElementById('name').value;
    const mail = document.getElementById('mail').value;
    const phone = document.getElementById('phone').value;
    const contact = document.getElementById('contact').value;
    const satisfaction = document.getElementById('satisfaction').value;
    const like = document.getElementById('like').checked ? 'Sim' : 'Não';

    let response = validMail(mail);

    if (name===""){
        errorMsg('Nome','' , 'Preciso saber seu nome');
    }else if(mail===""){
        errorMsg('E-mail','' , 'Digite seu e-mail por favor!');
    }else if(!response){
        errorMsg('E-mail','' , 'Digite o e-mail válido por favor!');
    }    
    else if(phone===""){
        errorMsg('Telefone','' , 'Digite seu telefone por favor!');
    }else if(phone.length < 15){
        errorMsg('Telefone','' , 'Digite seu telefone no formato DD + Nº por favor!');
    }else if(contact==="Preferência de contato:"){
        errorMsg('Preferência de contato','' , 'Selecione o tipo de contato para retorno por favor!');
    }else{

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
