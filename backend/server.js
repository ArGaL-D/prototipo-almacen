const puppeteer = require('puppeteer');
const express = require('express');
const mySql = require('mysql');
const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// Configuración Servidor - MySql
const server = express();

server.use(cors());
server.use(express.json());
server.set('port', 3001);

const config_db = {
    host: 'localhost',
    user: 'root',
    password: 'archDB_32109',
    database: 'EQUIPOS_CECYT16',
    multipleStatements: true
}
const pool = mySql.createPool(config_db);


/* ##############
   #    GET     #
   ##############
*/

server.get('/buscar', (req, res) => {

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

server.get('/usuario', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query("call sp_getUbicacion()", (error, results) => {
            connection.release();

            if (error) console.log(error)
            res.json(results[0])
        });
    });
});




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

        // Verificar que todo se ha cargado correctamente
        await page.goto(pagina.url, { waitUntil: 'networkidle2' });

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




// LOGIN 
server.post('/login', (req, res) => {
    const usuario   = req.body.username;
    const password  = req.body.userpass;

    
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query("call sp_getUsuario(?,?)",[usuario,password],(error, results) => {
            connection.release();

            if (error) console.log(error)

            if (results[0][0].existe_usuario){
                res.json({
                        existe_usuario: true, 
                        idUser:  results[1][0].id_usuario,
                        userName:results[1][0].usuario
                    });
            }else{
                res.json({existe_usuario: false});
            }
        });
    });
    console.log("-> POST")
});


/* ##############
   #    PUT     #
   ##############
*/
server.put('/editarEquipo', (req, res) => {
    // Datos del cliente
    const editedSerial = req.body.editedSerial;
    const serial  = req.body.serial;
    const equipo  = req.body.equipo;
    const marca   = req.body.marca;
    const modelo  = req.body.modelo;
    const estatus = req.body.estatus;
    let almacen   = req.body.almacen;
    const descrip = req.body.descripcion;
    let edificio = 0;
    let piso     = 0;   

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
                res.json({updated: false});
            }else{
                res.json({updated: true});
            }
            
        });
    });
    
    console.log("-> PUT")
});


/* ##############
   #  DELETE    #
   ##############
*/

server.delete('/equipo/:serial', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query('call sp_deleteEquipo(?)', [req.params.serial], (error, results) => {
            connection.release();

            if (error){
                console.log(error)
                res.json({deleted: false});
            }else{
                res.json({deleted: true});
            }
            
        });
    });
    
    console.log("-> DELETE")
});





// Iniciar servidor
server.listen(server.get('port'), () => {
    console.log(`Server on port: ${server.get('port')} `)
});
