import * as cheerio from 'cheerio';

type ValidationResponse = [errorCode: boolean, message: string | null];

export function validateHTML(html: string): ValidationResponse {
  try {
    const $ = cheerio.load(html, null, false);

    const hasHtmlTag = $('html').length > 0 || $('body').length > 0 || $('div').length > 0 || $('iframe').length > 0;
    if (!hasHtmlTag) {
      return [false, 'No valid HTML tags were found.'];
    }

    const scriptTags = $('script');
    let hasInlineScript = false;
    scriptTags.each((_, el) => {
      if (!$(el).attr('src')) {
        hasInlineScript = true;
      }
    });
    if (hasInlineScript) {
      return [false, 'Inline <script> tags are not allowed. Only <script src="..."> is permitted.'];
    }
  } catch {
    return [false, 'Invalid HTML code.'];
  }

  return [true, null];
}
