import * as cheerio from 'cheerio';

type ValidationResponse = [errorCode: boolean, message: string | null];

export function validateHTML(html: string): ValidationResponse {
  try {
    const $ = cheerio.load(html, null, false);

    const hasHtmlTag = $('html').length > 0 || $('body').length > 0 || $('div').length > 0 || $('iframe').length > 0;
    if (!hasHtmlTag) {
      return [false, '정상적인 HTML 태그가 포함되어 있지 않습니다.'];
    }

    if ($('script').length > 0 && !hasHtmlTag) {
      return [false, '스크립트 파일 업로드는 허용되지 않습니다.'];
    }
  } catch {
    return [false, '올바르지 않은 HTML 코드입니다.'];
  }

  return [true, null];
}
