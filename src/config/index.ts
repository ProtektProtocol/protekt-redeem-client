import homestead from '@/config/homestead.json';
import kovan from '@/config/kovan.json';
import rinkeby from '@/config/rinkeby.json';
import TCOMP from '@/config/TCOMP.json';
import TPTK from '@/config/TPTK.json';

const configs = {
  production: { homestead, kovan, rinkeby },
  token: { TPTK, TCOMP }
};
const env = process.env.VUE_APP_ENV || 'production';
const network = process.env.VUE_APP_NETWORK || 'homestead';

console.log('Env')
console.log(process.env.VUE_APP_PROTEKT_REDEEM_TOKEN_SYMBOL)
console.log(process.env.VUE_APP_ENV)
console.log(process.env.VUE_APP_NETWORK)

let config
if(process.env.VUE_APP_PROTEKT_REDEEM_TOKEN_SYMBOL) {
  config = configs['token'][process.env.VUE_APP_PROTEKT_REDEEM_TOKEN_SYMBOL];
} else {
  config = configs[env][network];
}

export default config;