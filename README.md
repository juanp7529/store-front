# front tienda con react y ionic

Se adjunta el código fuente de la aplicación completa.

Para poder correr el proyecto deben tener Ionic, Node asegurarse de tener estas herramientas instaladas antes de ejecutar.

Para correr el proyecto lo único necesario es ejecutar el comando:

```bash
npm install
```

Patrones de diseño utilizados
En cuanto a patrones use context api y pues este ya proporciona de por si el patron Singleton que se instancia una vez e iniciando y pues
no tanto un patrón pero use funcional components que es lo recomendado hoy en día con React.

Arquitectura utilizada:
Implemente una arquitectura cliente-servidor que es muy utilizado y pues lo hice basado en componentes para tener todo mucho más ordenado.

Retos puntuales
- Un reto que tuve fue más bien un bug con la fecha cuando la obtenia del localStorage en el context, lo solucione simplemente manejando la conversión de esa fecha ahí directamente. Al inicio pensaba como manejar visualmente y en lógica los productos favoritos y a la final tome la decisión de agregar iconos de estrellas al dar clic se añade a favorito y en cuanto a lógica use el context api donde almaceno ese producto en el localStorage y con esa información la obtengo y actualizó con un useEffect los roductos para que sigan manteniendo el indicador de favorito ya que había un problema que se borraba al entrar al localStorage y on esto solucione también que al cambiar de tab el stado se mantiene y permite desactivar y activar.

Dejo el link a Drive a la carpeta para ver el video de la implementación de un cambio en vivo durante el desarrollo del front
[Carpeta de video](https://drive.google.com/drive/folders/1SlClSMMwvhhT0IRCqzuWNI7RugHFFFNK?usp=sharing)
