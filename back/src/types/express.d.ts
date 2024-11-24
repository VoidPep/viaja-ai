declare namespace Express {
    export interface Request {
      rawBody?: Buffer; // Adiciona a propriedade rawBody como opcional
    }
  }
  