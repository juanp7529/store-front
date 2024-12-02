import React, {useEffect, useState} from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCardContent, IonTitle, IonIcon, IonButton
} from '@ionic/react';
import {Product} from "../../interfaces/product-interface";
import './favorite-product-card.scss';
import {star} from "ionicons/icons";
import {useWishlist} from "../../context/wish-list-context";

const FavoriteProductCard: React.FC = () => {
    const {state} = useWishlist();
    const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

    useEffect(() => {
        const productsWithDate = state.wishlist.map(product => ({
            ...product,
            dateAdded: product.dateAdded ? new Date(product.dateAdded) : undefined
        }));
        setSortedProducts(productsWithDate);
    }, [state.wishlist]);

    const filterProducts = (param: "name" | "date" | "price") => {
        let sortedProducts = [...state.wishlist];
        switch (param) {
            case "price":
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case "name":
                sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "date":
                sortedProducts.sort((a, b) => (a.dateAdded && b.dateAdded) ?
                    a.dateAdded.getTime() - b.dateAdded.getTime() : 0);
                break;
        }
        setSortedProducts(sortedProducts);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Productos Favoritos
                    </IonTitle>
                    <div className="filter-button">
                        <IonButton color="medium" onClick={() => filterProducts("name")}>Filtrar por Nombre</IonButton>
                        <IonButton color="medium" onClick={() => filterProducts("date")}>Filtrar por Fecha</IonButton>
                        <IonButton color="medium" onClick={() => filterProducts("price")}>Filtrar por Precio</IonButton>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="product-list">
                    {sortedProducts.map((product: Product) => (
                        <IonCard key={product.id} className="product-card">
                            <img alt="" src={product.images[0]} className="product-image"/>
                            <IonCardHeader>
                                <IonCardTitle className="text-color"> {product.title} </IonCardTitle>
                                <IonCardSubtitle className="text-color"> ${product.price} </IonCardSubtitle>
                                <IonCardSubtitle
                                    className="text-color"> {product?.dateAdded ?
                                    `${product.dateAdded.toLocaleDateString()} - ${product?.dateAdded?.getHours()}:${product?.dateAdded?.getMinutes()}`
                                    : ''}
                                </IonCardSubtitle>
                                <IonIcon
                                    className={"favorite"}
                                    icon={star}/>
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

export default FavoriteProductCard;