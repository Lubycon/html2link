import { createWidgetUrl } from '@/widget/_api/createWidgetUrl';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  return createWidgetUrl(req);
}
