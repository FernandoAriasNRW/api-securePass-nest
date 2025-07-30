import { ConfigModule } from "@nestjs/config";


ConfigModule.forRoot({
  isGlobal: true, // Makes the configuration available globally 
});

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'JWT_SECRET_KEY'; // Use environment variable or default value