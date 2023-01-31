
import './styles/quasar.scss'
import '@quasar/extras/material-icons/material-icons.css'
// import '@quasar/extras/material-icons-filled/material-icons-filled.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
// import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/mdi-v4/mdi-v4.css'

//import '@quasar/extras/bootstrap-icons'
import { Notify, Dialog, Cookies, LocalStorage } from 'quasar'

// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: {
    Notify,
    Dialog,
    Cookies,
    LocalStorage
  }
}