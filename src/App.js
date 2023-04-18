import React from 'react'
import { Header } from './components/ui/Header';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { EstadoView } from './components/estados/EstadoView';
import { InventarioView } from './components/inventarios/InventarioView';
import { MarcaView} from './components/marcas/MarcaView';
import { TipoView } from './components/tipos/TipoView';
import { UsuarioView } from './components/usuarios/UsuarioView';
import { InventarioUpdate } from './components/inventarios/InventarioUpdate';
import { EstadosUpDate } from './components/estados/EstadosUpDate';
import { MarcasUpdate } from './components/marcas/MarcasUpdate'
import { TiposUpdate } from './components/tipos/TiposUpdate';
import { UsuariosUpdate } from './components/usuarios/UsuariosUpdate'

const App = () => {
    return <Router>
            <Header />
            <Switch>
                <Route exact path= '/' component={ InventarioView } />
                <Route exact path= '/usuarios' component={ UsuarioView } />    
                <Route exact path= '/marcas' component={ MarcaView } />
                <Route exact path= '/estados' component={ EstadoView } />
                <Route exact path= '/tipos' component={ TipoView } />
                <Route exact path= '/inventarios/edit/:inventarioId' component={ InventarioUpdate } />
                <Route exact path= '/estados/edit/:estadoEquipoId' component={ EstadosUpDate } />
                <Route exact path= '/marcas/edit/:marcasId/' component={ MarcasUpdate } />
                <Route exact path= '/tipos/edit/:tipoEquipoId/' component={ TiposUpdate } />
                <Route exact path= '/usuario/edit/:usuarioId/' component={ UsuariosUpdate } />
                <Redirect to= '/' />
            </Switch>   
        </Router>
}

export {
    App
}