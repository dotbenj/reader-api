import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Reader API up and running at port: ${process.env.PORT || 3000}`;
  }
}
