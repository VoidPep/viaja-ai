import { HttpException, Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from "@google/generative-ai";

@Injectable()
export class GeminiService {
    async getResponse(options: any): Promise<any> {
        try {
            const genAI = new GoogleGenerativeAI(process.env.API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = "Write a story about a magic backpack.";

            const result = await model.generateContent(prompt);
            console.log(result.response.text());

            return result.response.text();
        } catch (error) {
            throw new HttpException('Error fetching response from Gemini', 500);
        }
    }
}