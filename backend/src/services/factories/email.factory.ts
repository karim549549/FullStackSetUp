import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

@Injectable()
export class EmailFactory {
  createEmail(templateName: string, data: Record<string, any>): string {
    const filePath = path.join(
      __dirname,
      '..',
      '../templates',
      `${templateName}.template.html`,
    );

    const template = fs.readFileSync(filePath, 'utf-8');
    const compiled = handlebars.compile(template);
    return compiled(data);
  }
}
