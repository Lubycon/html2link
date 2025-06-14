import { type NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const GITHUB_API = 'https://api.github.com';

export async function POST(req: NextRequest) {
  const { html } = await req.json();
  const id = uuidv4().slice(0, 8); // 짧은 ID로 파일명 구성
  const filename = `widgets/${id}.html`;

  const githubRes = await fetch(
    `${GITHUB_API}/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPO}/contents/${filename}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Add widget: ${id}`,
        content: Buffer.from(html).toString('base64'),
        branch: process.env.GITHUB_REPO_BRANCH,
      }),
    },
  );

  const result = await githubRes.json();

  if (!githubRes.ok) {
    return NextResponse.json({ error: result.message }, { status: 500 });
  }

  const fileUrl = `https://${process.env.GITHUB_USERNAME}.github.io/${process.env.GITHUB_REPO}/${filename}`;
  return NextResponse.json({ id, url: fileUrl });
}
