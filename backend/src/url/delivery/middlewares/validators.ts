import { Request, Response, NextFunction } from 'express';

export class UrlValidator {
  async validateLink(req: Request, res: Response, next: NextFunction) {
    const { originalUrl } = req.body;
    const errors = new Map<string, string[]>();

    function addError(key: string, message: string) {
      if (!errors.has(key)) {
        errors.set(key, []);
      }
      errors.get(key)?.push(message);
    }

    if (!originalUrl) {
      addError('originalUrl', 'This field cannot be null');
    }

    try {
      new URL(originalUrl);
    } catch (_) {
      addError(
        'originalUrl',
        'This url is not valid, please check the url, a correct url has http or https prefixes.'
      );
    }

    if (errors.size > 0) {
      return res.status(400).json({
        message: 'Errors occurred',
        errors: Object.fromEntries(errors),
      });
    } else {
      next();
    }
  }
}
