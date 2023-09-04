
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { E2EUtils } from './utils/e2e-utils';
import { JwtService } from '@nestjs/jwt';
import { UserFactory } from './factories/user.factory';
import { CreateCardDto } from '../src/cards/dto/create-card.dto';
import { faker } from '@faker-js/faker';
import { CardFactory } from './factories/card.factory';

describe('Cards E2E Tests', () => {
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

  it('POST /cards => should create a card', async () => {
    const user=await new UserFactory(prisma)
      .withEmail("lorenzobaumgratz9@yahoo.com.br")
      .withSenha("s3nh@F4rte")
      .persist()

    const token=await E2EUtils.generateToken(jwt,user)

    const createCardDto: CreateCardDto = new CreateCardDto({
      cardNumber:faker.finance.creditCardNumber(),
      cardName:"lorenzo",
      cardCVC:faker.finance.creditCardCVV(),
      cardExp:"25/02",
      cardPassword:"1234",
      cardType:"credit",
      virtual:true
    });

    await request(app.getHttpServer())
      .post('/cards')
      .set('Authorization',`Bearer ${token}`)
      .send(createCardDto)
      .expect(HttpStatus.CREATED)

    const cards = await prisma.cards.findMany();
    expect(cards).toHaveLength(1);
    expect(cards[0]).toEqual({
      id: expect.any(Number),
      cardNumber:expect.any(String),
      cardName:"lorenzo",
      cardCVC:expect.any(String),
      cardExp:"25/02",
      cardPassword:expect.any(String),
      cardType:"credit",
      virtual:true,
      userId:user.id
    })
  });

  it('GET /cards', async () => {
    const user=await new UserFactory(prisma)
      .withEmail("lorenzobaumgratz9@yahoo.com.br")
      .withSenha("s3nh@F4rte")
      .persist()

    const token=await E2EUtils.generateToken(jwt,user)
    const card=await new CardFactory(prisma)
      .withCardNumber(faker.finance.creditCardNumber())
      .withCardName("lorenzo")
      .withCardCVC(faker.finance.creditCardCVV())
      .withCardExp("25/02")
      .withCardPassword("1234")
      .withCardType("credit")
      .withVirtual(true)
      .withUserId(user.id)
      .persist()

    const cred=  await request(app.getHttpServer())
      .get('/cards')
      .set('Authorization',`Bearer ${token}`)
      .expect(HttpStatus.OK)

      expect(cred.body).toHaveLength(1)
      expect(cred.body[0]).toEqual({
        id: expect.any(Number),
        cardNumber:card.cardNumber,
        cardName:card.cardName,
        cardCVC:expect.any(String),
        cardExp:card.cardExp,
        cardPassword:expect.any(String),
        cardType:card.cardType,
        virtual:card.virtual,
        userId:user.id
      })
  });

  it('GET /cards/:id', async () => {
    const user=await new UserFactory(prisma)
      .withEmail("lorenzobaumgratz9@yahoo.com.br")
      .withSenha("s3nh@F4rte")
      .persist()

    const token=await E2EUtils.generateToken(jwt,user)
    const card=await new CardFactory(prisma)
      .withCardNumber(faker.finance.creditCardNumber())
      .withCardName("lorenzo")
      .withCardCVC(faker.finance.creditCardCVV())
      .withCardExp("25/02")
      .withCardPassword("1234")
      .withCardType("credit")
      .withVirtual(true)
      .withUserId(user.id)
      .persist()

    const cards=  await request(app.getHttpServer())
      .get(`/cards/${card.id}`)
      .set('Authorization',`Bearer ${token}`)
      .expect(HttpStatus.OK)

      expect(cards.body).toEqual({
        id: expect.any(Number),
        cardNumber:card.cardNumber,
        cardName:card.cardName,
        cardCVC:expect.any(String),
        cardExp:card.cardExp,
        cardPassword:expect.any(String),
        cardType:card.cardType,
        virtual:card.virtual,
        userId:user.id
      })
  });

  it('DELETE /cards/:id', async () => {
    const user=await new UserFactory(prisma)
      .withEmail("lorenzobaumgratz9@yahoo.com.br")
      .withSenha("s3nh@F4rte")
      .persist()

    const token=await E2EUtils.generateToken(jwt,user)
    const card=await new CardFactory(prisma)
      .withCardNumber(faker.finance.creditCardNumber())
      .withCardName("lorenzo")
      .withCardCVC(faker.finance.creditCardCVV())
      .withCardExp("25/02")
      .withCardPassword("1234")
      .withCardType("credit")
      .withVirtual(true)
      .withUserId(user.id)
      .persist()

      await request(app.getHttpServer())
      .delete(`/cards/${card.id}`)
      .set('Authorization',`Bearer ${token}`)
      .expect(HttpStatus.OK)

      const cards=  await prisma.cards.findMany()
      expect(cards).toHaveLength(0)
  });
});
