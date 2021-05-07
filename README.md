# API GSMA para el menejo y mantenimiento de contenido.

## Objetivo:
_Crear, Actualizar, Leer y Eliminar datos correspondientes al Portal INDOTEL_

## Descripción 📋:
  Esta API web permite Crear, Actualizar, Leer y Eliminar datos para el Portal INDOTEL, actualmente solo a las preguntas frecuentes, pero con propósito a expansión a más contenido.

## Requerimientos ⚙️:

  * Base de datos (SQL Server Express) de nombre: 'GSMA'.
  *Login de user 'av', password: 'admin123'
  * Tabla de nombre: FAQ.
  * Script de tabla:
    Create table FAQ ( Id INT PRIMARY KEY not null IDENTITY, Pregunta varchar(300) not null, Respuesta varchar(MAX) not null, Status bit not null, Orden int not null).
## Herramientas de desarrollo ⚙️:

  * Node
  * Sql Server

## Función ⌨️: 
  Toma información de la base datos en Sql server y retorna y modifica los datos especificados anteriormente.