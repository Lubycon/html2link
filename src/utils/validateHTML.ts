import * as cheerio from 'cheerio';

type ValidationResponse = [errorCode: boolean, message: string | null];

export function validateHTML(html: string): ValidationResponse {
  try {
    const $ = cheerio.load(html, null, false);

    const hasHtmlTag = $('html').length > 0 || $('body').length > 0 || $('div').length > 0 || $('iframe').length > 0;
    if (!hasHtmlTag) {
      return [false, 'No valid HTML tags were found.'];
    }

    if ($('script').length > 0 && !hasHtmlTag) {
      return [false, 'Script file uploads are not allowed.'];
    }
  } catch {
    return [false, 'Invalid HTML code.'];
  }

  return [true, null];
}
