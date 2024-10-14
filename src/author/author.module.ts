import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorRepository } from './author.repository';
import { AuthorService } from './author.service';
import { DatabaseModule } from 'src/database/database.Module';
import { Author, AuthorSchema } from './model/author.schema';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
  ],
  controllers: [AuthorController],
  providers: [AuthorRepository, AuthorService],
})
export class AuthorModule {}
