import { Module } from '@nestjs/common';
import { TripPlannerService } from '../../services/agentes/trip-planner.service'
import { TripPlannerController } from '../../controllers/trip-planner.controller';

@Module({
  controllers: [TripPlannerController],
  providers: [TripPlannerService],
})
export class TripPlannerModule {}