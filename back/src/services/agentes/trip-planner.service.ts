import { Injectable } from '@nestjs/common';
import { PythonShell } from 'python-shell';
import * as path from 'path';

@Injectable()
export class TripPlannerService {
    async runTripPlanner(origin: string, dateRange: string, interests: string): Promise<any> {
        return new Promise((resolve, reject) => {

            const scriptPath = path.join(__dirname, '../../../crewai');
            console.log(scriptPath)
            PythonShell.run('main.py', {
                mode: 'text',
                pythonOptions: ['-u'],
                scriptPath: scriptPath,
                args: [origin, dateRange, interests], // Argumentos passados ao script
            });
        });
    }
}
