import React, {useEffect, useState} from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonLoading, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCardContent, IonSearchbar, IonIcon
} from '@ionic/react';
import {storeService} from "../../services/store-services";
import {Product} from "../../interfaces/product-interface";
import './product-card.scss';
import ToastError from "../toast-error/toast-error";
import {star, starOutline} from "ionicons/icons";
import {useWishlist} from "../../context/wish-list-context";

const ProductCard: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>('');
    const {state, dispatch} = useWishlist();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data: Product[] = (await storeService.getStoreProducts()).map(
                    (product: Product) => ({
                        ...product,
                        isFavorite: state.wishlist.some(p => p.id === product.id)
                    })
                );
                setProducts(data);
                setFilteredProducts(data);
            } catch (err) {
                setError('Error al cargar los productos');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [state.wishlist]);

    const toggleFavorite = (product: Product) => {
        if (product) {
            if (state.wishlist.some(p => p.id === product.id)) {
                product.isFavorite = false;
                dispatch({type: 'REMOVE_FROM_WISHLIST', productId: product.id});
            } else {
                product.isFavorite = true;
                dispatch({type: 'ADD_TO_WISHLIST', product});
            }
        }
    };

    useEffect(() => {
        const result = products.filter(product => {
            return product.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(
                searchText.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
            );
        });
        setFilteredProducts(result);
    }, [searchText, products]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonSearchbar
                        className="search-bar"
                        animated={true}
                        placeholder="Buscar productos"
                        value={searchText}
                        onIonInput={e => setSearchText(e.detail.value!)}
                    />
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonLoading className="custom-loading"
                            isOpen={loading}
                            message={'Cargando los productos...'}
                />
                <ToastError
                    isOpen={!!error}
                    message={error || ''}
                    onClose={() => setError(null)}
                />
                <div className="product-list">
                    {filteredProducts.map(product => (
                        <IonCard key={product.id} className="product-card">
                            <img alt="" src={product.images[0]} className="product-image"/>
                            <IonCardHeader>
                                <IonCardTitle className="text-color"> {product.title} </IonCardTitle>
                                <IonCardSubtitle className="text-color"> ${product.price} </IonCardSubtitle>
                                <IonIcon
                                    className={product.isFavorite ? "favorite" : ""}
                                    onClick={() => toggleFavorite(product)}
                                    icon={product.isFavorite ? star : starOutline}/>
                            </IonCardHeader>
                            <IonCardContent className={""}>
                                {product.description}
                            </IonCardContent>
                        </IonCard>
                    ))}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ProductCard;