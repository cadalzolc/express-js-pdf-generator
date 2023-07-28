import * as handlebars from "handlebars";

const html: string = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <h1>PDF Generation Test</h1>
    <div>
      Hi, My Name is {{name}}, This data from body :)
    </div>
</html>
`;

export const getTemplate: any = (context: any) => {
  return handlebars.compile(html)(context);
};