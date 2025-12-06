import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [ConfigModule.forRoot(), CoffeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
