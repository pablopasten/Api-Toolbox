# Api Toolbox
 
Esta api fue realizada en nodejs
### Importante
Si bien la especificación indica que debia realizarse en node 14, dado que no estoy en mi computador personal y el estandar donde trabajo es node 16 y este está monitoreado, es que me permití hacerlo en esta versión. Me disculpo por no usar nvm.

### Correr el servicio
 Para correr el servicio se debe usar 
 ## npm start
 -El servicio corre en el puerto 3001, para no colisionar con el puerto del front.
 -la ruta sera entonces http://localhost:3000/files/data
 - El acceso a cualquier ruta adicional mostrará un error 

### Test
 Para correr el test que fue realizado con Mocha +Chai es necesario usar el comando
  ## npm test
    - El test valida el que el formato de la respuesta del servicio sea el esperado esto es:
        {
            file :"nombrearchivo",
            files:[
                {
                    text:"asdf",
                    number:1234
                    hx: hjdsa32179832jlsda
                }
            ]
           }
### Código
    app.js contiene manejo de  cors y la llamada a la ruta.
    Se utilizó express router para el ruteo y luego la llamada a un controlador que es el que hace el trabajo.
    En el controlador se utiliza axios para realizar las llamadas a los servicios externos.
    Hay funciones separadas para obtener la lista de archivos iniciales, luego una funcionon para obtener los contenidos de cada archivo y una función que orquesta estas llamadas para hacer la segunda llamada según el diagrama de secuencia entregado.
    Finalmente hay una funcion que me permite dar el formato json al csv recibido desde el segundo servicio.
