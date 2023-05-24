import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class customerService {
    constructor(
        private prisma: PrismaService) { }

    remove(id: string) {
        return this.prisma.customer.delete({
            where: {
                id
            }
        })
    }
}