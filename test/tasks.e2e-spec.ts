import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksModule } from "../src/tasks/tasks.module";
import { Task } from "../src/tasks/entities/task.entity";

describe('Task (e2e)', () => {

  let app: INestApplication;

  beforeAll(async () => {
    jest.setTimeout(10000);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TasksModule,
        TypeOrmModule.forRoot({
          type      : 'sqlite',
          database  : ':memory:',
          dropSchema: true,
          entities  : [Task],
          synchronize: true,
        })
      ],
    }).compile();
    
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /tasks', () => {
    it('should create a task', async () => {
      const taskDto = { title: 'Comprar leche', status: 'PENDING' };

      const response = await request(app.getHttpServer())
        .post('/tasks')
        .send(taskDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(taskDto.title);
      expect(response.body.status).toBe(taskDto.status);
    });

    it('returns 400 when title is missing', async () => {
      const response = await request(app.getHttpServer())
        .post('/tasks')
        .send({})
        .expect(400);
      
      expect(response.body.message).toEqual(
        expect.arrayContaining([
          expect.stringContaining('title'),
        ]),
      );
    });
  })
  
  describe('GET /tasks', () => {
    it('return an array of tasks', async () => {
      const response = await request(app.getHttpServer())
        .get('/tasks')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  // TODO: Hacer el caso donde falle (como se hizo en el test POST)
  describe('GET /tasks/:id', () => {
    it('return a task', async () => {
      const task = await request(app.getHttpServer())
        .post('/tasks')
        .send({ title: 'Task para findOne' });

      const response = await request(app.getHttpServer())
        .get(`/tasks/${task.body.id}`)
        .expect(200);

      expect(response.body.id).toBe(task.body.id);
      expect(response.body.title).toBe('Task para findOne');
    });
  });

  describe('PATCH /tasks/:id', () => {
    it('update a task', async () => {
      const task = await request(app.getHttpServer())
        .post('/tasks')
        .send({ title: 'Task para update' });

      const response = await request(app.getHttpServer())
        .patch(`/tasks/${task.body.id}`)
        .send({ title: 'Task actualizada' })
        .expect(200);

      expect(response.body.title).toBe('Task actualizada');
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('/tasks/:id (DELETE) should delete a task', async () => {
      const task = await request(app.getHttpServer())
        .post('/tasks')
        .send({ title: 'Task para delete' });

      const response = await request(app.getHttpServer())
        .delete(`/tasks/${task.body.id}`)
        .expect(200);

      expect(response.body).toEqual({ message: 'Task deleted' });

      // Verificar que realmente no existe
      await request(app.getHttpServer())
        .get(`/tasks/${task.body.id}`)
        .expect(404);
    });
  });

});