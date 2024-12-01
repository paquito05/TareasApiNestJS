import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TareasModule } from './tareas/tareas.module';

@Module({
  imports: [AuthModule, TareasModule],
})
export class ResourcesModule {}
