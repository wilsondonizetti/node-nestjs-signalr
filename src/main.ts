import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as signalR from "@microsoft/signalr";
import * as https from 'https';
import * as rootCas from 'ssl-root-cas/latest';
import * as path from 'path';
const cas = rootCas.create();
cas.addFile(path.resolve('./assets/certificates', 'localhost.cer'));
cas.addFile(path.resolve('./assets/certificates', 'localhostiis.cer'));
//const httpsAgent = new Agent({ca: cas});
//cas.inject() 
https.globalAgent.options.ca = cas;
 
const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:5001/services/hub")
    .build();
 
connection.on("ReceiveMessage", message => {
    console.log('NodeJS Client New Message: ', message);
});

connection.on("ReceiveObjectMessage", message => {
    console.log('NodeJS Client New Message Object: ', message);
});
 
connection.start()
    .then(() => console.log('started'));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
