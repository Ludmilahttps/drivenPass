import { User } from "@prisma/client";
import { PrismaService } from "../../src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

export class E2EUtils {
    static async cleanDb(prisma: PrismaService) {
      await prisma.cards.deleteMany();
      await prisma.credential.deleteMany();
      await prisma.notes.deleteMany();
      await prisma.user.deleteMany();
    }

    static async generateToken(jwtService: JwtService,user?:User) {
      const {id,email}=user
      const token=jwtService.sign({email},{
            expiresIn:"7 days",
            issuer:"Lorenzo",
            subject:String(id),
            audience:"users"
        })

        return token
    }
}