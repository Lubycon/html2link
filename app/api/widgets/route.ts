import { createWidgetUrl } from 'app/api/widgets/createWidgetUrl';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  return createWidgetUrl(req);
}
