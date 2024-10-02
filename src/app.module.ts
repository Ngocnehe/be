import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.Module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, CategoryModule],
})
export class AppModule {}