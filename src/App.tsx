import {
    IonApp, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import React from "react";
import ProductCard from "./components/product-card/product-card";
import {Redirect, Route} from "react-router";
import Tab2 from "./pages/Tab2";
import {IonIcon} from '@ionic/react';
import {search, star} from "ionicons/icons";
import { WishlistProvider } from './context/wish-list-context';
import FavoriteProductCard from "./components/favorite-product-card/favorite-product-card";

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
        <WishlistProvider>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Redirect exact path="/" to="/product"/>
                        <Route exact path="/product">
                            <ProductCard/>
                        </Route>
                        <Route exact path="/my-products">
                            <FavoriteProductCard/>
                        </Route>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="product" href="/product">
                            <IonIcon aria-hidden="true" icon={search}/>
                            <IonLabel> Productos </IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="my-products" href="/my-products">
                            <IonIcon icon={star}/>
                            <IonLabel> Mis Productos Favoritos </IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </WishlistProvider>

    </IonApp>
);

export default App;
