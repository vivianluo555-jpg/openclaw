import { InferSelectModel } from 'drizzle-orm';

import { video, videoBreakdown } from '@/config/db/schema';

export type Video = InferSelectModel<typeof video>;
export type VideoBreakdown = InferSelectModel<typeof videoBreakdown>;
