import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import * as PDF from './plugins/pdf'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.post("/pdf", async (req: Request, res: Response) => {

  const html = req.body.html;
  const pdf = await PDF.create(html);

  if (pdf.success === false) {
    res.statusCode = 500;
    res.send({
      success: false,
      message: "Generation failed"
    });
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'download; filename=test.pdf');
  res.send(Buffer.from(pdf.content));

});

app.listen(port, () => {
  console.log(`⚡️ Server Listening on http://localhost:${port}`);
});