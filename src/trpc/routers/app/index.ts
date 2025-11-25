import { createTRPCRouter } from '@/trpc/init';
import { search } from '@/trpc/routers/app/search';

export const appRouter = createTRPCRouter({
  search,
});

export type AppRouter = typeof appRouter;
