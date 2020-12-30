import homestead from '@/config/homestead.json';
import kovan from '@/config/kovan.json';
import rinkeby from '@/config/rinkeby.json';
import TCOMP from '@/config/TCOMP.json';

const configs = {
  production: { homestead, kovan, rinkeby }
};
const env = process.env.VUE_APP_ENV || 'production';
const network = process.env.VUE_APP_NETWORK || 'homestead';

const config = TCOMP;
// config = configs[env][network];

export default config;