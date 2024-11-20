import { HttpException, Injectable, Logger } from '@nestjs/common';
import { GoogleGenerativeAI } from "@google/generative-ai";

@Injectable()
export class GeminiService {
    async getResponse(prompt: string): Promise<any> {
        try {
            const genAI = new GoogleGenerativeAI(process.env.API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const result = await model.generateContent(prompt);
            const text = result.response.text();
            const match = text.match(/```json\s*({.*?})\s*```/s);
            
            let jsonObject = {};
            if (match && match[1]) {
                let jsonString = match[1];

                // Remover comentários do JSON
                jsonString = jsonString.replace(/\/\/.*$/gm, '').trim();
                
                Logger.log(jsonString);
                try {
                    jsonObject = JSON.parse(jsonString);
                } catch (error) {
                    console.error("Erro ao analisar JSON:", error);
                    throw new HttpException("Erro ao analisar JSON", 500);
                }
            } else {
                throw new HttpException("Nenhum conteúdo JSON encontrado.", 500);
            }

            return jsonObject;
        } catch (error) {
            throw new HttpException('Error fetching response from Gemini', 500);
        }
    }
}