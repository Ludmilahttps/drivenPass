import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import Cryptr from 'cryptr';
import { UserFactory } from './factories/user.factory';
import { E2EUtils } from './utils/e2e-utils';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();
  let jwt:JwtService=new JwtService({secret:process.env.JWT_SECRET})
  let cryptr:Cryptr
  const Cryptr=require('cryptr')
  cryptr= new Cryptr('myTotallySecretKey')


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

  it('GET /health => should return 200', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(HttpStatus.OK)
      .expect("I'm okay!");
  });

  it('POST /erase => should delete account', async() => {
    const user=await new UserFactory(prisma)
      .withEmail("lorenzobaumgratz9@yahoo.com.br")
      .withSenha("s3nh@F4rte")
      .persist()

    const token=await E2EUtils.generateToken(jwt,user)
    await request(app.getHttpServer())
      .post('/erase')
      .set('Authorization',`Bearer ${token}`)
      .send({password:"s3nh@F4rte"})
      .expect(204)
  });
});