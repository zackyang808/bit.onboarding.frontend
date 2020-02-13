import web3 from '../web3';
import BitCountryToken from './build/BitCountryToken.json';

//create instance of contract
// Token contract 0xdfe5f01ec0c52ab2acc7e7a98b620b28256b38ce
//Test address 0xa1CEC95C8a0640279579D14089d8FEfaD958775b
//CountryCore address 0x064abcf6193ea3276c2069ad9802e79d5f45d209
let instance = null;
try {
    instance = new web3.eth.Contract(
        JSON.parse(BitCountryToken.interface),
        '0xd0deba303954dc5952fbb705a26fb10a73e00d71'
    );
} catch (error) {
    instance = null;
    console.error(error);
}

export default instance;