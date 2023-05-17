# SpotifyApi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.3.


# Frontend para Spotify Api 

Aplicación web que permita a los usuarios buscar canciones
utilizando la API de Spotify, pero además implementar un sistema de autenticación de
usuario mediante JWT (JSON Web Token). Los usuarios deben poder registrarse, iniciar
sesión y guardar canciones en una lista de favoritos. Los usuarios autenticados podrán
acceder a su lista de favoritos en cualquier momento.Se comunicara directamente con la Api de Spotify para crear un token y eso utilizarlo como autorizacion
para hacer peticiones a la api como en este caso que serian getAlbums (esto solo es de prueba no se utiliza en ningun momento) ,  Obtener canciones por buscador , Obtener cancion detallada por Id y Obtener muchas canciones 
con una pequeña muestra de audio dependiendo de la informacion proveida. 

## Appendix

El backend a el cual conecta este front esta en esta direccion : https://github.com/montoyafranco/backend-test


## Installation

Para correr esta app necesitas agregar las dependencias necesarias 



```bash
  npm install 
```Luego para correrlo usar
```bash
  ng serve -o
```
    



## Test

Para correr los test darle:   ng test




## FAQ

#### Se puede hacer mejor el codigo ?

Si , por cuestiones de tiempo se puede testear a mayor profundidad y utilizar mejores arquitecturas. Idealmente pronto sera refactorizado 



