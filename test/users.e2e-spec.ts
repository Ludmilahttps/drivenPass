
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { E2EUtils } from './utils/e2e-utils';
import { AuthDto } from '../src/auth/dto/authuser.dto';
import { UserFactory } from './factories/user.factory';
import { CreateUserDto } from '../src/users/dto/create-user.dto';


describe('Users E2E Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();

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

  it('POST /sign-up => should create a user', async () => {
    const authDto: AuthDto = new AuthDto({
      email: "lorenzobaumgratz@yahoo.com.br",
      senha: "s3nh@F4rte"
    });

    await request(app.getHttpServer())
      .post('/users/sign-up')
      .send(authDto)
      .expect(HttpStatus.CREATED)

    const user = await prisma.user.findMany();
    expect(user).toHaveLength(1);
    expect(user[0]).toEqual({
      id: expect.any(Number),
      email: authDto.email,
      senha:expect.any(String)
    })
  });

  it('POST /sign-in => should login', async () => {

    await new UserFactory(prisma)
      .withEmail("lorenzobaumgratz9@yahoo.com.br")
      .withSenha("s3nh@F4rte")
      .persist()

    const authDto: CreateUserDto = new CreateUserDto({
      email:"lorenzobaumgratz9@yahoo.com.br",
      senha:"s3nh@F4rte"
    });
    
    await request(app.getHttpServer())
      .post('/users/sign-in')
      .send(authDto)
      .expect(HttpStatus.CREATED)
      
      
  });
});