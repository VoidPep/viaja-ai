import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import { PythonShell } from 'python-shell';

@Injectable()
export class TripPlannerService {
    async runTripPlanner(origin: string, dateRange: string, interests: string): Promise<any> {
        const currentDir = __dirname;

        const pythonScriptPath = path.resolve(currentDir, '../../../crewai/main.py');

        Logger.log(pythonScriptPath)
        const resposta = await PythonShell.run(pythonScriptPath, {
            mode: 'text',
            pythonOptions: ['-u'],
            args: [origin, dateRange, interests],
        });
        return resposta;
    }
}
