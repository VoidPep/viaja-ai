import { Controller, Post, Body, Logger } from '@nestjs/common';
import { TripPlannerService } from "../services/agentes/trip-planner.service"

@Controller('trip-planner')
export class TripPlannerController {
    constructor(private readonly tripPlannerService: TripPlannerService) { }

    @Post('plan')
    async planTrip(@Body() preferencias_do_usuario: any) {
        
        try {
            const result = await this.tripPlannerService.runTripPlanner(preferencias_do_usuario);
            return {
                success: true,
                data: result,
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error executing the trip planner',
                error: error.message,
            };
        }
    }
}
