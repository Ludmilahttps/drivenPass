
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { E2EUtils } from './utils/e2e-utils';
import { JwtService } from '@nestjs/jwt';
import { UserFactory } from './factories/user.factory';
import { CreateNoteDto } from '../src/notes/dto/create-note.dto';
import { NoteFactory } from './factories/note.factory';

describe('Notes E2E Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();
  let jwt:JwtService=new JwtService({secret:process.env.JWT_SECRET})


  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    await app.init();

    await E2EUtils.cleanDb(prisma);
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  })

  it('POST /notes => should create a note', async () => {
    const user=await new UserFactory(prisma)
      .withEmail("lorenzobaumgratz9@yahoo.com.br")
      .withSenha("s3nh@F4rte")
      .persist()

    const token=await E2EUtils.generateToken(jwt,user)

    const createNoteDto: CreateNoteDto = new CreateNoteDto({
      note:"alguma coisa ai",
      rotulo:"isso",
    });

    await request(app.getHttpServer())
      .post('/notes')
      .set('Authorization',`Bearer ${token}`)
      .send(createNoteDto)
      .expect(HttpStatus.CREATED)

    const note = await prisma.notes.findMany();
    expect(note).toHaveLength(1);
    expect(note[0]).toEqual({
      id: expect.any(Number),
      note:"alguma coisa ai",
      rotulo:"isso",
      userId:user.id
    })
  });

  it('GET /notes', async () => {
    const user=await new UserFactory(prisma)
      .withEmail("lorenzobaumgratz9@yahoo.com.br")
      .withSenha("s3nh@F4rte")
      .persist()

    const token=await E2EUtils.generateToken(jwt,user)

    const note=await new NoteFactory(prisma)
      .withNote("alguma coisa ai")
      .withRotulo("isso")
      .withUserId(user.id)
      .persist()

    const notes=await request(app.getHttpServer())
      .get('/notes')
      .set('Authorization',`Bearer ${token}`)
      .expect(HttpStatus.OK)

      expect(notes.body).toHaveLength(1)
      expect(notes.body[0]).toEqual({
        id: note.id,
        rotulo:note.rotulo,
        note:note.note,
        userId:note.userId
      })
  });

  it('GET /notes/:id', async () => {
    const user=await new UserFactory(prisma)
      .withEmail("lorenzobaumgratz9@yahoo.com.br")
      .withSenha("s3nh@F4rte")
      .persist()

    const token=await E2EUtils.generateToken(jwt,user)

    const note=await new NoteFactory(prisma)
      .withNote("alguma coisa ai")
      .withRotulo("isso")
      .withUserId(user.id)
      .persist()

    const notes=  await request(app.getHttpServer())
      .get(`/notes/${note.id}`)
      .set('Authorization',`Bearer ${token}`)
      .expect(HttpStatus.OK)

      expect(notes.body).toEqual({
        id: note.id,
        rotulo:note.rotulo,
        note:note.note,
        userId:note.userId
      })
  });

  it('DELETE /notes/:id', async () => {
    const user=await new UserFactory(prisma)
      .withEmail("lorenzobaumgratz9@yahoo.com.br")
      .withSenha("s3nh@F4rte")
      .persist()

    const token=await E2EUtils.generateToken(jwt,user)

    const note=await new NoteFactory(prisma)
      .withNote("alguma coisa ai")
      .withRotulo("isso")
      .withUserId(user.id)
      .persist()

    await request(app.getHttpServer())
      .delete(`/notes/${note.id}`)
      .set('Authorization',`Bearer ${token}`)
      .expect(HttpStatus.OK)

      const notes=  await prisma.notes.findMany()
      expect(notes).toHaveLength(0)
  });
});
