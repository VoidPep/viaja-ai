import { Injectable, Logger } from '@nestjs/common';
import { PythonShell } from 'python-shell';
import { spawn } from 'child_process'
import { resolve } from 'path';
//back\src\services\roteiros\crewai.service.ts

@Injectable()
export class TripPlannerService {
    async runTripPlanner(userPreferences: Record<string, any>): Promise<any> {

        const pythonPath = resolve(__dirname, "../../../src");
        const scriptPath = `${pythonPath}/crewai/main.py`

        const args = [JSON.stringify(userPreferences)];

        return new Promise((resolve, reject) => {
            const pythonProcess = spawn('python', [scriptPath, ...args], {
                env: {
                    ...process.env,
                    PYTHONPATH: pythonPath
                }
            });

            let output = '';
            let errorOutput = '';

            pythonProcess.stdout.on('data', (data) => {
                output += data.toString();
            });

            pythonProcess.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            pythonProcess.on('close', (code) => {
                if (code === 0) {
                    try {
                        const parsedOutput = JSON.parse(output);
                        resolve(parsedOutput);
                    } catch (err) {
                        resolve(output);
                    }
                } else {
                    reject(new Error(`Script exited with code ${code}: ${errorOutput}`));
                }
            });

            pythonProcess.on('error', (err) => {
                reject(err);
            });
        });
    }
}