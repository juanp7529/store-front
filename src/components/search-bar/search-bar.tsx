// src/components/SearchableProductList.tsx
import React, {useState, useEffect} from 'react';
import './ProductList.css';
import {storeService} from "../../services/store-services";
import {
    IonContent,
    IonHeader,
    IonItem, IonLabel,
    IonList,
    IonLoading,
    IonPage,
    IonSearchbar,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import ToastError from "../toast-error/toast-error";
import {Product} from "../../interfaces/product-interface";

const SearchableProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await storeService.getStoreProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (err) {
                setError('No se pudieron cargar los productos');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const result = products.filter(product =>
            product.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredProducts(result);
    }, [searchText, products]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Productos de la Tienda</IonTitle>
                    <IonSearchbar
                        animated={true}
                        placeholder="Buscar productos"
                        value={searchText}
                        onIonChange={e => setSearchText(e.detail.value!)}
                    />
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonLoading isOpen={loading} message={'Cargando productos...'}/>
                <ToastError
                    isOpen={!!error}
                    message={error || ''}
                    onClose={() => setError(null)}
                />
                <IonList>
                    {filteredProducts.map(product => (
                        <IonItem key={product.id}>
                            <IonLabel>
                                <h2>{product.title}</h2>
                                <p>${product.price}</p>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default SearchableProductList;