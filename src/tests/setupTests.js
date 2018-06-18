import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DotEnv from 'dotenv';
DotEnv.config({ path: '.env.test' });

// for enzyme v3 and react v16, we need to add adapter and configure it
// besides, we have to install raf - request animation frame - without it, testing components may run into issues.
// We create a json config file for jest at the app root and link it to this setup file. finally we have to add the config option into the npm test command in package.json.

Enzyme.configure({
  adapter: new Adapter()
}); 