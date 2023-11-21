class ValidaCPF{
    constructor(cpfE){
        Object.defineProperty(this, 'cpfLimpo',{
            enumerable: true,
            writable: false,
            configurable: false,
            value: cpfE.replace(/\D+/g, '')
        });
    }

    valida(){
        if(this.cpfLimpo.length !== 11) return false;
        if(!this.cpfLimpo) return false;
        if(this.sequencia()) return false;

        return this.gerarCPF();

    

    }

    gerarCPF(){
        const cpfSDgt = this.cpfLimpo.slice(0, -2);
        const digito1 = this.gerarDigito(cpfSDgt);
        const digito2 = this.gerarDigito(cpfSDgt+digito1);
        return cpfSDgt+digito1+digito2 === this.cpfLimpo;
        
    }

    gerarDigito(cpfSDgt){
        let total = 0;
        let n = cpfSDgt.length+1;

        for(let x of cpfSDgt){
            total += n*Number(x);
            n--;
        }
        
        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';

    }

    sequencia(){
        return this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo
    }

}

const cpf = new ValidaCPF('705.484.450-52')

// if(cpf.valida()){
//     console.log('CPF VALIDO!!!')
// }else{
//     console.log('CPF INVÁLIDO')
// }




