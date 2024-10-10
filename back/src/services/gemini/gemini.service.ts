import { HttpException, Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from "@google/generative-ai";

@Injectable()
export class GeminiService {
    async getResponse(prompt: string): Promise<any> {
        try {
            const genAI = new GoogleGenerativeAI(process.env.API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const result = await model.generateContent(prompt);
            const text = result.response.text()

            const match = text.match(/```json\s*({.*?})\s*```/s);

            let jsonObject = {};
            if (match && match[1]) {
                const jsonString = match[1];
                try {
                    jsonObject = JSON.parse(jsonString);
                } catch (error) {
                    console.error("Erro ao analisar JSON:", error);
                }
            } else {
                return new HttpException("Nenhum conteúdo JSON encontrado.", 500);
            }

            return jsonObject;
        } catch (error) {
            throw new HttpException('Error fetching response from Gemini', 500);
        }
    }
}