import '../node_modules/materialize-css/dist/css/materialize.css'

import App from './App.svelte'
const app = new App({
  target: document.getElementById('app'),
})
// @ts-ignore
M.AutoInit()
export default app
