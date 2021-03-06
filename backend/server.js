const fileUpload = require('express-fileupload');
const puppeteer  = require('puppeteer');
const mySql      = require('mysql');
const express    = require('express');
const cors       = require('cors');
const path       = require('path');
const jwt        = require('jsonwebtoken');
const fs         = require('fs');


const bcrypt = require('bcrypt');
const saltRounds = 10;

// Configuración Servidor - MySql
const server = express();

server.use(express.static(path.join(__dirname,'dbimages')));
server.use(fileUpload());
server.use(cors());
server.use(express.json());
server.set('port', 3001);

const config_db = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'EQUIPOS_CECYT16',
    multipleStatements: true
}
const pool = mySql.createPool(config_db);


/* ##############
   #    GET     #
   ##############
*/

server.get('/equipos', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query('call sp_getEquipo', (errorSql, results) => {
            connection.release();

            if (errorSql) console.log(errorSql)
            res.json(results[0])
        });
    })
})

server.get('/ubicacion', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query("call sp_getUbicacion()", (error, results) => {
            connection.release();

            if (error) console.log(error)
            res.json(results[0])
        });
    });
});

server.get('/usuarios', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query("call sp_getUsuarios()", (error, results) => {
            connection.release();

            if (error) console.log(error)
            res.json(results[0])
        });
    });
});

/* TOTAL DE EQUIPOS [Disponibles,reparación,prestados]*/
server.get('/total-equipos', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query("call sp_countEquipos()", (error, results) => {
            connection.release();

            if (error) console.log(error)

            res.json({
                equipos_disponibles: results[0][0].equipos_disponibles,
                equipos_prestados  : results[1][0].equipos_prestados,
                equipos_reparacion : results[2][0].equipos_reparacion
            });
        });
    });
});

server.get('/imagenes',(req, res) => {
    const imagenes = fs.readdirSync(path.join(__dirname,'dbimages'));

    res.json(imagenes)
});

// VERIFICAR - TOKEN - acceso a rutas
server.get('/login/verificar', verifyToken,(req, res) => {

    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err){
            //res.sendStatus(403);
            res.json({isAuth: false})
        } else{
            res.json({
                authData,
                isAuth: true
            });
        }
    })
});

// Authorization: Bearer <token>
function verifyToken (req, res, next) {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader;
        req.token = bearerToken;
        next();
    }else {
        res.sendStatus(403);
    }
} 
 

/* ##############
   #    POST    #
   ##############
*/

/* POST  Módulo ( REGISTRAR ) */
server.post('/registrar', (req, res) => {
    // Solicitar datos enviados por el cliente
    const serial    = req.body.serial;
    const nombre    = req.body.equipo;
    const marca     = req.body.marca;
    const modelo    = req.body.modelo;
    const estatus   = req.body.estatus;
    const almacen   = req.body.almacen;
    const edificio  = req.body.edificio;
    const piso = req.body.piso;
    const descripcion = req.body.descripcion;

    const sp_sql = 'call sp_addEquipo(?,?,?,?,?,?,?,?,?)';
    // BD
    pool.getConnection((error, connection) => {
        if (error) throw error;

        connection.query(sp_sql, [serial, nombre, marca, modelo, estatus, descripcion, almacen, edificio, piso], (err, results) => {
            connection.release();

            if (results[0][0].existe_equipo === 1) {
                res.json({ existe_serial: true });
            } else {
                res.json({ existe_serial: false });
            }
        });
    });

    console.log("-> POST ")
});

/* POST  Módulo ( PRÉSTAMO ) */
server.post('/prestamo', (req, res) => {
    // Solicitar datos enviados por el cliente
    const persona  = req.body.nombre;
    const clave    = req.body.clave;
    const serie    = req.body.serial;
    const fecha    = req.body.fecha;    
    const piso     = req.body.piso;
    const aula     = req.body.aula;
    const edificio = req.body.edificio;

    pool.getConnection((error, connection) => {
        if (error) throw error;

        connection.query("call sp_addPrestamo(?,?,?,?,?,?,?)", [persona, clave, serie, fecha, edificio, piso, aula], (err, results) => {
            connection.release();

            if (err) console.log(err)

            // Valores retorno - StoredProcedure
            const existeEquipo = results[0][0].existe_equipo;

            if (existeEquipo === 1 ){
                const statusEquipo = results[1][0].status_equipo;

                if (statusEquipo !== "DISPONIBLE"){
                    res.json({ 
                        equipo_disponible: false, 
                        equipo_status: statusEquipo 
                    });
                }else{
                    res.json({ 
                        equipo_disponible: true, 
                        equipo_status: statusEquipo 
                    });
                }
            }else{
                res.json({ existe_serial: false });
            }
        });
    });

    
    console.log("-> POST")
});

/* POST -  Módulo ( ENTREGA ) */
server.post('/entrega', (req, res) => {
    // Datos del cliente
    const serial = req.body.serial;
    const nombre = req.body.nombre;
    const fechaEntrega = req.body.fechaEntrega;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query('call sp_addEntrega(?, ?, ?)', [serial, nombre, fechaEntrega], (error, results) => {
            connection.release();

            if (error) console.log(error)

            // Resultados obtenidos - StoredProcedures
            const existeEquipo = results[0][0].existe_equipo;

            if (existeEquipo === 1 ){
                const equipoEntregado = results[1][0].equipo_entregado;
                
                if (equipoEntregado === 0){
                    res.json({
                        existe_equipo: true,
                        equipo_entregado: false,                        
                    });
                }else{
                    res.json({
                        existe_equipo: true,
                        equipo_entregado: true                        
                    });
                }
            }else{
                res.json({existe_equipo:false});
            }
        });
    });

    console.log("-> POST")
});

/* POST - WEB SCRAPTING - (Préstamo-Formulario-alumno) */
server.post('/scrapting', (req, res) => {
    let pagina = req.body;
    // Función auto-ejecutada
    (async () => {                

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(pagina.url);

        try {
            const alumno = await page.evaluate(() => {
                let nombre = document.querySelector('div[class="nombre"]').innerText;
                let boleta = document.querySelector('div[class="boleta"]').innerText;

                return {
                    nombre,
                    boleta
                }
            });
            res.json(alumno)
        } catch (err) {
            console.log(`[Scrapting Error]--> ${err}`)
            res.json({ error: "ERROR" })
        }

        await browser.close();
    })()
});

/* POST - REPARACIÓN - REPORTE  */
server.post('/reparacion', (req, res) => {
    // Datos del cliente
    const serial    = req.body.serial;
    const estatus   = req.body.estatus;
    const etapa     = req.body.etapa;
    const reporte   = req.body.reporte;
    const detalles  = req.body.detalles;
    const hilo      = req.body.hilo;

    const fecha = new Date();


    const fechaHora = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()} ${fecha.toTimeString().slice(0,8)}`;
    
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query('call sp_addReparacion(?,?,?,?,?,?,?)', [serial,hilo,reporte,estatus,etapa,fechaHora,detalles], (error, results) => {
            connection.release();

            if (error) console.log(error)

            if (results[0][0].existe_equipo === 0){
                res.json( {equipo: false} )
            }else{
                res.json( {equipo: true}  )
            }
        });
    }); 
});

// SEGUIMIENTO - HILO - EQUIPO 
server.post('/seguimiento', (req, res) => {
    const hilo  = req.body.hilo;
    
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query("call sp_getSeguimiento(?)",[hilo],(error, results) => {
            connection.release();

            if (error) console.log(error)
            
            res.json(results[0]);

        });
    }); 
    console.log("-> POST")
});

// BUSCAR HILO 
server.post('/buscar-hilo', (req, res) => {
    const serial  = req.body.serial;
    
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query("call sp_getEquipoHilo(?)",[serial],(error, results) => {
            connection.release();

            if (error) console.log(error)
            
            res.json(results[0]);

        });
    }); 
    console.log("-> POST")
});

/* POST -  CREAR USUARIO*/
server.post('/crear-usuario', (req, resp) => {
    // Datos del cliente
    const usuario  = req.body.usuario;
    const nombre   = req.body.nombre;
    const apellido = req.body.apellido;
    const email    = req.body.email;
    const password = req.body.password;
    const acceso   = req.body.acceso;

    bcrypt.hash(password,saltRounds, (err, hash) => {

        if (err) throw err;

        pool.getConnection((errCn, connection) => {
            if (errCn) throw errCn;
            //SQL
            connection.query("call sp_addUsuario(?,?,?,?,?,?)",[usuario,nombre,apellido,email,hash,acceso],(errSql, results) => {
                connection.release();
    
                if (errSql) console.log(errSql)                
                
                const existeUsuario = results[0][0].existe_usuario;
                
                if (existeUsuario === 1){
                    resp.json({existe_usuario:true});
                }else{
                    const existe_email = results[1][0].existe_email;
                    if (existe_email === 1){
                        resp.json({
                            existe_usuario: false,
                            existe_email: true
                        });
                    }else{
                        resp.json({
                            existe_usuario: false,
                            existe_email: false
                        });
                    }
                }
            });
        }); 
    });
});

// USUARIO - PASSWORD (verificación de password)
server.post('/usuario-pass', (req, resServer) => {

    const idUser = req.body.id;
    const password = req.body.password;
    
    const query = 'SELECT password FROM USUARIOS WHERE id_usuario=?;';

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, [idUser],(error, results) => {
            connection.release();

            if (error) throw error;
            
            bcrypt.compare(password,results[0].password, (error, result) =>{                
                if (result){
                    resServer.json({succesful_password: true});
                }else{
                    resServer.json({succesful_password: false});
                }
            });

        });
    }); 
});

// LOGIN - COMPROBAR SI EXISTE USUARIO y CREAR UN TOKEN de 'Autenticación'
server.post('/login', (req, res) => {
    const usuario   = req.body.username;
    const userPass  = req.body.userpass;
    // is an email
    const validate = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(validate.test(usuario)?"call sp_getEmail(?)":"call sp_getUsuario(?)",[usuario],(error, results) => {
            connection.release();

            if (error) throw error;

            const existeUsuario = results[0][0].existe_usuario;

            if (existeUsuario){
                const userData = results[1][0];
                // COMPROBAR CONTRASEÑA
                bcrypt.compare(userPass,userData.password, (error, result) =>{                
                    if (result){
                        // GENERAR TOKEN
                        const token = jwt.sign({userData},'secretKey',{expiresIn: '5h'});
                        res.json({
                            token, 
                            existe_usuario: true,
                            successful_password: true,
                        });
                    }else{
                        res.json({
                            successful_password: false,
                            existe_usuario: true},
                        );
                    }
                });
            }else{
                res.json({existe_usuario: false});
            }
        });
    });
    console.log("-> POST")
});

// VERIFICAR USUARIO - TOKEN -  Editar usuario
server.post('/verificar-usuario',(req, res) => {

    const token = req.body.token;
    const userPass = req.body.password;

    jwt.verify(token, 'secretKey', (err, authData) => {
        if (err){
            //res.sendStatus(403);
            res.json({isAuth: false})            
        } else{
            // Verificar contraseña
            bcrypt.compare(userPass, authData.userData.password, (error, result) =>{                
                if (result){
                    res.json({isAuth: true, successful_password: true});
                }else{
                    res.json({isAuth: true, successful_password: false});
                }
            });
        }
    })
});

// SUBIR - Imgs
server.post('/subir-img',(req, res) => {
    if (require.files === null){
        return res.status(400).json({msg: 'Archivos no subidos.'});
    }

    const file = req.files.file;
    const filename = file.name;

    file.mv(`./dbimages/${filename}`, error => {
        if (error){
            console.error(error);
            return res.status(500).json({uploaded_file: false})
        }else{
            res.json({
                uploaded_file: true
            });
        }
    });
});


/* ##############
   #    PUT     #
   ##############
*/

// ACTUALIZAR EQUIPO
server.put('/editar-equipo', (req, res) => {
    // Datos del cliente
    const editedSerial = req.body.editedSerial;
    const serial    = req.body.serial;
    const equipo    = req.body.equipo;
    const marca     = req.body.marca;
    const modelo    = req.body.modelo;
    const estatus   = req.body.estatus;
    let   almacen   = req.body.almacen;
    const descrip   = req.body.descripcion;
    let   edificio  = 0;
    let   piso      = 0;   

    const ubicacion = [
        "DIRECCIÓN",
        "ESCALERAS",
        "LABORATORIO CLÍNICOS",
        "SITE",
        "SITE PB",
        "SITE 1P",
        "SITE 2P"
    ];

    if (almacen === ubicacion[0] || almacen === ubicacion[2]) { edificio = 7; piso = 1; }
    else if (almacen === ubicacion[3]) { edificio = 7; piso = 0; }
    else if (almacen === ubicacion[1] || almacen === ubicacion[4]) { edificio = 4; piso = 0; }
    else if (almacen === ubicacion[5]) { edificio = 4; piso = 1; }
    else if (almacen === ubicacion[6]) { edificio = 4; piso = 2; }

    
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query('call sp_updateEquipo(?,?,?,?,?,?,?,?,?,?)', [editedSerial,serial,equipo,marca,modelo,estatus,descrip,almacen,edificio,piso], (error, results) => {
            connection.release();

            if (error){
                console.log(error)
                res.json({successful_update: false});
            }else{
                res.json({successful_update: true});
            }
            
        });
    });
    
    console.log("-> PUT")
});

// ACTUALIZAR USUARIO
server.put('/editar-usuario', (req, res) => {

    const idUser    = req.body.id;
    const usuario   = req.body.usuario;
    const nombre    = req.body.nombre;
    const apellido  = req.body.apellido;
    const email     = req.body.email;
    const acceso    = req.body.acceso;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query('call sp_updateUsuario(?,?,?,?,?,?);', [idUser,usuario,nombre,apellido,email,acceso], (error, results) => {
            connection.release();

            if (error){
                console.log(error)
                res.json({successful_update: false});
            }else{
                res.json({successful_update: true});
            }            
        });
    });

});

// EDITAR Contraseña
server.put('/editar-pass', (req, res) => {
    const newPass = req.body.newPass;
    const idUser  = req.body.idUser;

    bcrypt.hash(newPass,saltRounds, (err, hashPass) => {
        if (err) throw err;

        pool.getConnection((err, connection) => {
            if (err) throw err;
    
            connection.query('call sp_updatePass(?,?);', [hashPass, idUser], (error, results) => {
                connection.release();
    
                if (error){
                    console.log(error)
                    res.json({successful_update: false});
                }else{
                    res.json({successful_update: true});
                }            
            });
        });
    });    
   console.log(req.body)
});

/* ##############
   #  DELETE    #
   ##############
*/

// ELMINAR - EQUIPO 
server.delete('/delete-equipo/:serial', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query('call sp_deleteEquipo(?)', [req.params.serial], (error, results) => {
            connection.release();

            if (error){
                console.log(error)
                res.json({successful_delete: false});
            }else{
                res.json({
                    successful_delete: true,
                });
            }            
        });
    });
    
    console.log("-> DELETE")
});

// ELMINAR - USUARIO
server.delete('/delete-usuario/:idUser', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query('call sp_deleteUsuario(?)', [req.params.idUser], (error, results) => {
            connection.release();

            if (error){
                console.log(error)
                res.json({deleted_user: false});
            }else{
                res.json({deleted_user: true});
            }            
        });
    });
    
    console.log("-> DELETE")
});

// ELIMINAR - IMÁGEN
server.delete('/delete-image/:nameImg', (req, res) => {

    const path = `${__dirname}/dbimages/${req.params.nameImg}`;
    
    try {
        fs.unlinkSync(path);
        res.json({deleted_image: true});
    } catch (error) {
        console.log(error)
        res.json({deleted_image: false});
    }
});



// Iniciar servidor
server.listen(server.get('port'), () => {
    console.log(`Server on port: ${server.get('port')} `)
});
