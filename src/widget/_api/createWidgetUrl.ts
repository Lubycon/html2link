import { createHash } from 'crypto';
import { validateHTML } from '@/utils/validateHTML';
import { type NextRequest, NextResponse } from 'next/server';

const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = 'lubycon';
const REPO = 'notion-embed';
const BRANCH = 'main';

export async function createWidgetUrl(req: NextRequest) {
  const { html } = await req.json();

  const [validationResult, validationMessage] = validateHTML(html);
  if (validationResult === false) {
    return NextResponse.json({ error: validationMessage }, { status: 400 });
  }

  const hash = createHash('sha256').update(html).digest('hex').slice(0, 16);
  const filename = `widgets/${hash}.html`;

  const cached = await fetch(`${GITHUB_API}/repos/${REPO_OWNER}/${REPO}/contents/${filename}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (cached.ok) {
    const fileUrl = `https://${REPO_OWNER}.github.io/${REPO}/${filename}`;
    return NextResponse.json({ url: fileUrl, cached: true });
  }

  const uploadRes = await fetch(`${GITHUB_API}/repos/${REPO_OWNER}/${REPO}/contents/${filename}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Add widget: ${hash}`,
      content: Buffer.from(html).toString('base64'),
      branch: BRANCH,
    }),
  });

  const uploadResult = await uploadRes.json();

  if (!uploadRes.ok) {
    return NextResponse.json({ error: uploadResult.message }, { status: 500 });
  }

  const fileUrl = `https://${REPO_OWNER}.github.io/${REPO}/${filename}`;
  return NextResponse.json({ url: fileUrl, cached: false });
}
