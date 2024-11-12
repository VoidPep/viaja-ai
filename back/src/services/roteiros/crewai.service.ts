// src/trip-planner/trip-planner.service.ts
import { Injectable } from '@nestjs/common';
import { PythonShell } from 'python-shell';

@Injectable()
export class TripPlannerService {
    async runTripPlanner(userPreferences: Record<string, any>): Promise<any> {
        var response: any[];
        PythonShell.run('main.py', {
            mode: 'text',
            pythonOptions: ['-u'],
            scriptPath: './back/crewai',
            args: [JSON.stringify(userPreferences)],
        }).then(message => {
            response = message
        });

        return response;
    }
}
