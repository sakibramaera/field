import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class orderService {
    constructor(
        private prisma: PrismaService) { }

    remove(id: string) {
        return this.prisma.order.delete({
            where: {
                id
            }
        })
    }
}