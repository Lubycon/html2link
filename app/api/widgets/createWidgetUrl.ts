import { createHash } from 'crypto';
import { App } from '@octokit/app';
import { validateHTML } from 'app/utils/validateHTML';
import { type NextRequest, NextResponse } from 'next/server';

const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = 'lubycon';
const REPO = 'notion-embed';

export async function createWidgetUrl(req: NextRequest) {
  const appId = process.env.GITHUB_APP_ID;
  const privateKey = process.env.GITHUB_PRIVATE_KEY;
  const installationId = process.env.GITHUB_INSTALLATION_ID;

  if (!appId || !privateKey || !installationId) {
    throw new Error('Required environment variables are not set');
  }

  const app = new App({ appId, privateKey });

  async function getOctokit() {
    try {
      const octokit = await app.getInstallationOctokit(Number(installationId));
      return octokit;
    } catch (error) {
      console.error('Failed to generate Installation Access Token:', {
        error,
        appId,
        installationId,
      });
      throw error;
    }
  }

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
