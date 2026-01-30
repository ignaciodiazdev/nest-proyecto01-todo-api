<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
# Tasks API
test 2


[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

[![Backend Tests](https://github.com/ignaciodiazdev/nest-proyecto01-todo-api/actions/workflows/main.yml/badge.svg)](https://github.com/ignaciodiazdev/nest-proyecto01-todo-api/actions/workflows/main.yml)

# 🧩 Proyecto 01 - ToDo API (NestJS)

API REST desarrollada con **NestJS** y **TypeORM** para la gestión de tareas (*ToDos*).  
Este proyecto forma parte de mi ruta de aprendizaje backend con NestJS y está enfocado en la práctica de CRUD, validaciones, manejo de errores y documentación.

---

## 🚀 Tecnologías utilizadas

- [NestJS](https://nestjs.com/) — Framework principal  
- [TypeORM](https://typeorm.io/) — ORM para la base de datos  
- [PostgreSQL](https://www.postgresql.org/) — Base de datos (según entorno)  
- [class-validator](https://github.com/typestack/class-validator) — Validaciones  
- [class-transformer](https://github.com/typestack/class-transformer) — Transformaciones de datos  
- [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction) — Documentación de API  
- [Docker](https://www.docker.com/) *(opcional)* — Contenerización  

---

## 🗃️ Base de datos

**Nombre:** `project01_todo_db`  
**Entidad principal:** `Task`  
Campos:
- `id` — UUID autogenerado  
- `title` — texto obligatorio  
- `description` — texto opcional  
- `status` — enum: `PENDING`, `IN_PROGRESS`, `DONE` (por defecto: `PENDING`)  
- `createdAt` — fecha de creación automática  

---

## 🧠 Funcionalidades principales

### 🔹 1. Crear tarea
**POST** `/tasks`  
Crea una nueva tarea.  
Campos requeridos: `title` (string).  
Opcionales: `description`, `status`.

### 🔹 2. Listar tareas
**GET** `/tasks`  
Devuelve todas las tareas.  
Soporta filtros opcionales:
- `status` → filtra por estado (`pending`, `in-progress`, `done`)
- `search` → busca coincidencias en `title` o `description`.

### 🔹 3. Obtener tarea por ID
**GET** `/tasks/:id`  
Retorna una tarea específica.  
Responde 404 si no existe.

### 🔹 4. Actualizar tarea
**PATCH** `/tasks/:id`  
Permite modificar `title`, `description` o `status`.  
Valida que `status` sea `PENDING`, `IN_PROGRESS` o `DONE`.  
El campo `status` acepta valores en minúsculas o mayúsculas (se normaliza internamente).

### 🔹 5. Eliminar tarea
**DELETE** `/tasks/:id`  
Elimina una tarea existente.  
Responde 404 si no existe.

---

## ⚙️ Validaciones

- Implementadas con `class-validator` y `class-transformer`.  
- Uso de `@IsString()`, `@IsEnum()`, `@IsOptional()`, `@MinLength()`, etc.  
- Transformación automática a mayúsculas para `status`.  
- Mensajes de error personalizados.

---

## 🔍 Filtros y búsqueda

- **Filtro por estado:**  
  `/tasks?status=pending`  

- **Búsqueda por palabra clave:**  
  `/tasks?title=Aprender NestJs`  
  (Busca coincidencias en `title`)

---

## 🚨 Manejo de errores

- Uso de excepciones de NestJS (`NotFoundException`, `BadRequestException`, etc.).  
- Respuestas claras y estandarizadas en formato JSON.  

---

## 📘 Documentación Swagger

Swagger habilitado en:  
**`/docs`**  
Permite probar los endpoints directamente desde el navegador.  

---
