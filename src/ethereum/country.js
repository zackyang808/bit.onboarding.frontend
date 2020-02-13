import web3 from '../web3';
import CountryCore from './build/BitCountryCore.json';

//create instance of contract
let instance = null;
try {
    instance = new web3.eth.Contract(
        JSON.parse(CountryCore.interface),
        '0x3ff08063e2c4199e6462a5e9f7744f95349875a2'
    );
} catch (error) {
    instance = null;
    console.error(error);
}

export default instance;