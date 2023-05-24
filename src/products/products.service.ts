import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class productService {
    constructor(
        private prisma: PrismaService) { }

    remove(id: string) {
        return this.prisma.product.delete({
            where: {
                id
            }
        })
    }
}