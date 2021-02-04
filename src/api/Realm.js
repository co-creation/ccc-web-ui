import * as Realm from "realm-web"
import Config from '../Config'

const realmApp = new Realm.App({ id: Config.REALM_APP_ID })
console.log('REALM APP', realmApp)
export default realmApp
