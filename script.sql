DROP DATABASE IF EXISTS clinica;
CREATE DATABASE clinica;

use clinica;

CREATE TABLE Area (
  id_Area INT(11) NOT NULL AUTO_INCREMENT,
  Medico_JefeArea INT(11) NOT NULL,
  nombre_area VARCHAR(50) NOT NULL,
  PRIMARY KEY(id_Area)
)ENGINE=InnoDB;

CREATE TABLE Cama (
  id_Cama INT(11) NOT NULL AUTO_INCREMENT,
  id_Hab INT(11) NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  descripcion VARCHAR(50) NOT NULL,
  PRIMARY KEY(id_Cama)

)ENGINE=InnoDB;

CREATE TABLE Catalogo_Servicios (#servicio se liga con catalogo si lo haces enumerativo
  idCatalogo_Servicios INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  tipo_servicio VARCHAR(50) NOT NULL, #(enumerativo) cirugia, examen, hospitalizacion, maquina, tarifa
  costo INT(11) NOT NULL,
  PRIMARY KEY(idCatalogo_Servicios)
)
ENGINE=InnoDB;

CREATE TABLE Cirugia (
  id_Cirugia INT(11) NOT NULL AUTO_INCREMENT,
  id_Servicio INT(11) NOT NULL,
  tipo_cirugia INT(11) NOT NULL, #ambulatoria, no ambulatoria
  costo INT(11) NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  PRIMARY KEY(id_Cirugia)
)
ENGINE=InnoDB;

CREATE TABLE Detalles_Receta (
  id_Medicamento INT(11) NOT NULL,#fk
  id_receta INT(11) NOT NULL,#fk
  administracion VARCHAR(100) NOT NULL,
  horarios VARCHAR(50) NOT NULL

)
ENGINE=InnoDB;

CREATE TABLE enfermera (
  id_enfermera INT NOT NULL AUTO_INCREMENT,
  id_Persona INT(11) NOT NULL,
  tipo_enfermera INT NOT NULL,
  especializacion VARCHAR(30),
  PRIMARY KEY(id_enfermera)

)
ENGINE=InnoDB;

CREATE TABLE enfermera_has_enfermera (
  enfermera_jefe INT(11) NOT NULL,
  subordinada INT(11) NOT NULL

)
ENGINE=InnoDB;

CREATE TABLE Examen (
  id_Examen INT(11) NOT NULL AUTO_INCREMENT,
  id_Servicio INT(11) NOT NULL,
  costo FLOAT NOT NULL,
  PRIMARY KEY(id_Examen)
)
ENGINE=InnoDB;

CREATE TABLE Examen_has_Maquina (
  id_Examen INT(11) NOT NULL,
  id_Maquina INT(11) NOT NULL

)
ENGINE=InnoDB;

CREATE TABLE expediente (
  id_registro INT(11) NOT NULL AUTO_INCREMENT,
  id_Paciente INT(11) NOT NULL,
  id_receta INT(11) NOT NULL, #fk
  id_Hospitalizacion INT(11) NOT NULL, #fk
  diagnostico TEXT,
  fecha_registro DATE,
  PRIMARY KEY(id_registro)
)
ENGINE=InnoDB;

CREATE TABLE Habitacion (
  id_Hab INT(11) NOT NULL AUTO_INCREMENT,
  ventana BOOL NOT NULL,
  id_propietario INT(11) NOT NULL, #fk Persona
  id_ocupante INT(11) NOT NULL, #fk de Persona
  valor_hab INT(11) NOT NULL,
  piso INT(11) NOT NULL,
  PRIMARY KEY(id_Hab)

)
ENGINE=InnoDB;

#hospitalizacion, restauran y servicio muchos a muchos
CREATE TABLE Hospitalizacion_has_restaurante (
  id_Hospitalizacion INT(11) NOT NULL,
  id_comida INT(11) NOT NULL
)
ENGINE=InnoDB;

CREATE TABLE Maquina (
  id_Maquina INTEGER NOT NULL AUTO_INCREMENT,
  id_Servicio INT(11) NOT NULL,
  id_Hab INT(11) NOT NULL, #fk
  tipo VARCHAR(30) NOT NULL,
  modelo INT(11) NOT NULL,
  costo DOUBLE(10,2) NOT NULL,
  PRIMARY KEY(id_Maquina)
)
ENGINE=InnoDB;

CREATE TABLE Medicamento (
  id_Medicamento INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(20) NOT NULL,
  unidosis VARCHAR(30) NOT NULL,
  tipo_medicamento VARCHAR(50) NOT NULL,
  costo DOUBLE(10,2),
  PRIMARY KEY(id_Medicamento)
)
ENGINE=InnoDB;

CREATE TABLE Medico (
  id_Medico INT(11) NOT NULL AUTO_INCREMENT,
  id_Persona INT(11) NOT NULL, #fk
  especialidad VARCHAR(45) NOT NULL,
  cedula_profesional VARCHAR(30) NOT NULL,
  PRIMARY KEY(id_Medico)

)
ENGINE=InnoDB;

CREATE TABLE Hospitalizacion (
  id_Hospitalizacion INT(11) NOT NULL AUTO_INCREMENT,
  id_Servicio INT(11) NOT NULL,
  #id_Paciente INT(11) NOT NULL, #fk
  #id_Medico INT(11) NOT NULL, #fk
  id_Sala INT(11) NOT NULL,#ver so quitamos o no
  id_Cama INT(11) NOT NULL, #fk
  fecha_ingreso DATE NOT NULL,
  fecha_salida DATE DEFAULT NULL,
  tipo_hospitalizacion INT(11) NOT NULL, #dos tipos enumerativo
  PRIMARY KEY(id_Hospitalizacion)#agregar foreins

)
ENGINE=InnoDB;

CREATE TABLE Paciente (
  id_Paciente INT(11) NOT NULL AUTO_INCREMENT,
  id_Persona INT(11) NOT NULL, #fk
  entidad_serv_salud VARCHAR(20) NOT NULL,
  eps BOOL NULL,
  PRIMARY KEY(id_Paciente)

)
ENGINE=InnoDB;

CREATE TABLE Persona (
  id_Persona INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(45) NOT NULL,
  apellido_paterno VARCHAR(30) NOT NULL,
  apellido_materno VARCHAR(30) NOT NULL,
  tipo VARCHAR(30) NOT NULL,
  PRIMARY KEY(id_Persona)
)
ENGINE=InnoDB;

CREATE TABLE receta (
  id_receta INT(11) NOT NULL AUTO_INCREMENT,
  id_registro INT(11) NOT NULL, #fk expediente
  id_Paciente INT(11) NOT NULL,#fk
  id_Medico INT(11) NOT NULL,#fk
  fecha DATE NOT NULL,
  diagnostico VARCHAR(75) NOT NULL,
  PRIMARY KEY(id_receta)

)
ENGINE=InnoDB;

CREATE TABLE restaurante (
  id_comida INT(11) NOT NULL AUTO_INCREMENT,
  precio INT(11) NOT NULL,
  descripcion VARCHAR(50) NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  PRIMARY KEY(id_comida)
);

CREATE TABLE Sala (
  id_Sala INT(11) NOT NULL AUTO_INCREMENT,
  id_Medico INT(11) NOT NULL,#fk responsable de la sala
  id_Hab INT(11) NOT NULL, #fk
  nombre_sala VARCHAR(50) NOT NULL,
  numero_camas INT(11) NOT NULL,
  PRIMARY KEY(id_Sala)

)
ENGINE=InnoDB;

CREATE TABLE Servicio (
  id_Servicio INT(11) NOT NULL AUTO_INCREMENT,
  id_Medico INT(11) NOT NULL,#fk
  id_Paciente INT(11) NOT NULL,#fk
  tipo_servicio VARCHAR(50) NOT NULL, #(enumerativo) cirugia, examen, hospitalizacion, maquina, tarifa
  tipo_pago VARCHAR(50) NOT NULL,
  fecha_servicio DATE NOT NULL,
  PRIMARY KEY(id_Servicio)

)
ENGINE=InnoDB;

CREATE TABLE suministros (#es como un catalogo
  id_suministros INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(30) NOT NULL,
  descripcion VARCHAR(50) NOT NULL,
  PRIMARY KEY(id_suministros)
)
ENGINE=InnoDB;

########################### Hosp_has_sumin ?
CREATE TABLE Hospitalizacion_has_suministro (
  id_Hospitalizacion INT(11) NOT NULL,
  id_suministros INT(11) NOT NULL

)ENGINE=InnoDB;

CREATE TABLE servicio_has_suministros (
  id_Servicio INT(11) NOT NULL,#fk
  id_suministros INT(11) NOT NULL,#fk
  FOREIGN KEY(id_Servicio)
      REFERENCES Servicio(id_Servicio),
  FOREIGN KEY(id_suministros)
    REFERENCES suministros(id_suministros)
)ENGINE=InnoDB;

CREATE TABLE Tarifa (#cuando el servicio se trata de hospitalizacion costo de hspitalizacion, etc
  id_Tarifa INT(11) NOT NULL AUTO_INCREMENT,
  idCatalogo_Servicios INT(11) NOT NULL,
  costo INT(11) NOT NULL,
  nombre_servicio VARCHAR(50) NOT NULL,
  PRIMARY KEY(id_Tarifa)
)
ENGINE=InnoDB;

CREATE TABLE Visita (#hospitalizacion y medico
  id_Medico INT(11) NOT NULL,
  id_Hospitalizacion INT(11) NOT NULL,
  observaciones VARCHAR(100) NOT NULL,
  fecha DATE NOT NULL

)
ENGINE=InnoDB;

ALTER TABLE Area ADD

  FOREIGN KEY(Medico_JefeArea)
    REFERENCES Medico(id_Medico)
    ON DELETE cascade
    ON UPDATE cascade;

ALTER TABLE Cama ADD
  FOREIGN KEY(id_Hab)
    REFERENCES Habitacion(id_Hab)
    ON DELETE cascade
    ON UPDATE cascade;

ALTER TABLE Detalles_Receta ADD

      FOREIGN KEY (id_Medicamento)
        REFERENCES Medicamento(id_Medicamento)
        ON DELETE NO action
        ON UPDATE cascade,
ADD

    FOREIGN KEY(id_receta)
      REFERENCES receta(id_receta)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION;

ALTER TABLE enfermera ADD


      FOREIGN KEY (id_Persona)
        REFERENCES Persona(id_Persona)
        ON DELETE NO action
        ON UPDATE cascade;

ALTER TABLE enfermera_has_enfermera ADD

    FOREIGN KEY(enfermera_jefe)
      REFERENCES enfermera(id_enfermera),
ADD

    FOREIGN KEY(subordinada)
      REFERENCES enfermera(id_enfermera);


ALTER TABLE Examen_has_Maquina ADD

  FOREIGN KEY(id_Examen)
    REFERENCES Examen(id_Examen),
ADD

  FOREIGN KEY(id_Maquina)
    REFERENCES Maquina(id_Maquina);

ALTER TABLE expediente ADD

    FOREIGN KEY(id_Paciente)
      REFERENCES Paciente(id_Paciente),
ADD

    FOREIGN KEY(id_receta)
      REFERENCES receta(id_receta),
ADD

    FOREIGN KEY(id_Hospitalizacion)
      REFERENCES Hospitalizacion(id_Hospitalizacion);

ALTER TABLE Habitacion
ADD
    FOREIGN KEY(id_propietario)
      REFERENCES Persona(id_Persona),
ADD

    FOREIGN KEY(id_ocupante)
      REFERENCES Persona(id_Persona);

ALTER TABLE Hospitalizacion
ADD
  FOREIGN KEY(id_Servicio)
      REFERENCES Servicio(id_Servicio)
      ON UPDATE cascade
      ON DELETE cascade,
ADD

    FOREIGN KEY(id_Sala)
      REFERENCES Sala(id_Sala),
ADD

    FOREIGN KEY(id_Cama)
      REFERENCES Cama(id_Cama);

ALTER TABLE Maquina
ADD
  FOREIGN KEY(id_Hab)
      REFERENCES Habitacion(id_Hab),
ADD
  FOREIGN KEY(id_Servicio)
      REFERENCES Servicio(id_Servicio);


ALTER TABLE Medico
ADD

    FOREIGN KEY(id_Persona)
      REFERENCES Persona(id_Persona);

ALTER TABLE Paciente
ADD

    FOREIGN KEY(id_Persona)
      REFERENCES Persona(id_Persona);

ALTER TABLE receta
ADD

    FOREIGN KEY(id_registro)
      REFERENCES expediente(id_registro),
ADD

    FOREIGN KEY(id_Paciente)
      REFERENCES Paciente(id_Paciente),
ADD

    FOREIGN KEY(id_Medico)
      REFERENCES Medico(id_Medico);

ALTER TABLE Sala
ADD

    FOREIGN KEY(id_Medico)
      REFERENCES Medico(id_Medico),
ADD
  FOREIGN KEY(id_Hab)
    REFERENCES Habitacion(id_Hab);

ALTER TABLE Servicio
ADD

    FOREIGN KEY(id_Medico)
      REFERENCES Medico(id_Medico),
ADD

  FOREIGN KEY(id_Paciente)
    REFERENCES Paciente(id_Paciente);

ALTER TABLE Cirugia
ADD
  FOREIGN KEY(id_Servicio)
    REFERENCES Servicio(id_Servicio);

ALTER TABLE Examen
ADD

    FOREIGN KEY(id_Servicio)
      REFERENCES Servicio(id_Servicio);

ALTER TABLE Tarifa
ADD

    FOREIGN KEY(idCatalogo_Servicios)
      REFERENCES Catalogo_Servicios(idCatalogo_Servicios);

ALTER TABLE Hospitalizacion_has_suministro
ADD
    FOREIGN KEY(id_Hospitalizacion)
      REFERENCES Hospitalizacion(id_Hospitalizacion),
ADD
  FOREIGN KEY(id_suministros)
    REFERENCES suministros(id_suministros);

ALTER TABLE Visita
ADD
  FOREIGN KEY(id_Medico)
    REFERENCES Medico(id_Medico),
ADD

  FOREIGN KEY(id_Hospitalizacion)
    REFERENCES Hospitalizacion(id_Hospitalizacion);

CREATE TABLE Usuario (
  id_usuario INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  pasw VARCHAR(20) NOT NULL,
  PRIMARY KEY(id_usuario)
)ENGINE=InnoDB;


CREATE USER IF NOT EXISTS 'admin'@'localhost';
CREATE USER IF NOT EXISTS 'admin'@'%';
GRANT ALL PRIVILEGES ON clinica.* TO 'admin'@'localhost' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON clinica.* TO 'admin'@'%' WITH GRANT OPTION;


INSERT INTO Usuario(nombre, pasw) VALUES("erik@hoohaa.com", "tacoswe");
INSERT INTO Usuario(nombre, pasw) VALUES("neto@hoohaa.com", "pera12");
INSERT INTO Usuario(nombre, pasw) VALUES("jorge@nintendo.com", "mauricioydiego");
INSERT INTO Usuario(nombre, pasw) VALUES("nan@hoohaa.com", "viamacbookpro");

INSERT INTO Persona SET id_Persona=1, nombre="Goku", apellido_paterno="Son", apellido_materno="K.", tipo="medico";
INSERT INTO Persona SET id_Persona=2, nombre="Vegeta", apellido_paterno="Sayajin", apellido_materno="De Bulma", tipo="medico";
INSERT INTO Persona SET id_Persona=3, nombre="Picoro", apellido_paterno="Dai", apellido_materno="Maku", tipo="paciente";
INSERT INTO Persona SET id_Persona=4, nombre="Doraima", apellido_paterno="San", apellido_materno="Dokumeku", tipo="paciente";

INSERT INTO Medico SET id_Persona=1, especialidad="general", cedula_profesional="kamehameha";
INSERT INTO Medico SET id_Persona=2, especialidad="proctologo", cedula_profesional="maldito insecto";

INSERT INTO Paciente SET id_Persona=3, entidad_serv_salud="IMSS", eps=0;
INSERT INTO Paciente SET id_Persona=4, entidad_serv_salud="ISSSTE", eps=1;

INSERT INTO Habitacion SET ventana=0,id_propietario=3, id_ocupante=1, valor_hab=1, piso=-1;
INSERT INTO Habitacion SET ventana=1,id_propietario=3, id_ocupante=2, valor_hab=100, piso=2;

INSERT INTO Sala SET id_Medico=1, id_Hab=1, nombre_sala="habitacion del tiempo", numero_camas=1;
INSERT INTO Sala SET id_Medico=1, id_Hab=2, nombre_sala="urgencias", numero_camas=2;

INSERT INTO Cama SET id_Hab=1, tipo="slipin", descripcion="incomodo";
INSERT INTO Cama SET id_Hab=2, tipo="camilla", descripcion="2/3";
INSERT INTO Cama SET id_Hab=2, tipo="camilla", descripcion="5/7";
