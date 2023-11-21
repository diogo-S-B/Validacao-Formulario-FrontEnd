class ValidarFormulario{
    constructor(){
        this.formulario = document.querySelector(".formulario");
        this.eventos();
    }

    eventos(){
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const camposValidos = this.camposSaoValidos();
        const senhasValidas = this.senhasSaoValidas();

        if (camposValidos && senhasValidas){
            alert('Formulário enviado com sucesso!!!');
            this.formulario.submit();
        }
        
    }

    camposSaoValidos(){
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.error-text')){
            errorText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')){
            if(!campo.value){
                const label = campo.previousElementSibling.innerText;
                this.criaErro(campo, `Campo "${label}" não pode estar em branco!`);;
                valid = false
            }

            if(campo.classList.contains('cpf')){
                if(!this.validaCPF(campo)) valid = false;
            }

            if(campo.classList.contains('usuario')){
                if(!this.validaUsuario(campo)) valid = false;
            }
            
            return true;
        }
    }

    senhasSaoValidas(){
        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha')

        if(senha.value !== repetirSenha.value){
            this.criaErro(senha, 'Senhas devem ser iguais')
            this.criaErro(repetirSenha, 'Senhas devem ser iguais')
            senha.value = '';
            repetirSenha.value = '';
            return false
        }

        if(senha.value.length < 6 || senha.value.length > 12){
            this.criaErro(senha, 'Senha precisa ter entre 6 e 12 caracteres!!!')
            return false;
        }
        return true
    }


    validaCPF(campo){
        const cpf = new ValidaCPF(campo.value);
        if(!cpf.valida()){
            this.criaErro(campo, 'CPF inválido')
            return false;
        }

    }

    validaUsuario(campo){
        if(campo.value.length < 3 || campo.value.length > 12){
            this.criaErro(campo, 'Usuário deve estar 3 a 12 caracteres')
            return false;
        }
        
        if(!campo.value.match(/^[a-zA-Z0-9]+$/g)){
            this.criaErro(campo, 'Nome de usuário precisa conter apenas letras e/ou números')
            return false;
        }



    }

    criaErro(campo, msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }
}

const enviaForm = new ValidarFormulario();

