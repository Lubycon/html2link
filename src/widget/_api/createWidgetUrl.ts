import { createHash } from 'crypto';
import { validateHTML } from '@/utils/validateHTML';
import { App } from '@octokit/app';
import { type NextRequest, NextResponse } from 'next/server';

const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = 'lubycon';
const REPO = 'notion-embed';

const APP_ID = process.env.GITHUB_APP_ID;
const PRIVATE_KEY = process.env.GITHUB_PRIVATE_KEY;
const INSTALLATION_ID = process.env.GITHUB_INSTALLATION_ID;

if (!APP_ID || !PRIVATE_KEY || !INSTALLATION_ID) {
  throw new Error('Required environment variables are not set');
}

const app = new App({ appId: APP_ID, privateKey: PRIVATE_KEY });

async function getOctokit() {
  try {
    const octokit = await app.getInstallationOctokit(Number(INSTALLATION_ID));
    return octokit;
  } catch (error) {
    console.error('Failed to generate Installation Access Token:', {
      error,
      appId: APP_ID,
      installationId: INSTALLATION_ID,
    });
    throw error;
  }
}

export async function createWidgetUrl(req: NextRequest) {
  const { html } = await req.json();

  const [validationResult, validationMessage] = validateHTML(html);
  if (validationResult === false) {
    return NextResponse.json({ error: validationMessage }, { status: 400 });
  }

  const hash = createHash('sha256').update(html).digest('hex').slice(0, 16);
  const filename = `widgets/${hash}.html`;

  const cached = await fetch(`${GITHUB_API}/repos/${REPO_OWNER}/${REPO}/contents/${filename}`);

  if (cached.ok) {
    const fileUrl = `https://${REPO_OWNER}.github.io/${REPO}/${filename}`;
    return NextResponse.json({ url: fileUrl, cached: true });
  }

  const octokit = await getOctokit();

  const uploadRes = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: REPO_OWNER,
    repo: REPO,
    path: filename,
    message: `Add widget: ${hash}`,
    content: Buffer.from(html).toString('base64'),
  });

  if (uploadRes.status !== 201) {
    console.error('GitHub API Error:', {
      status: uploadRes.status,
      response: uploadRes.data,
    });
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }

  const fileUrl = `https://${REPO_OWNER}.github.io/${REPO}/${filename}`;
  return NextResponse.json({ url: fileUrl, cached: false });
}
