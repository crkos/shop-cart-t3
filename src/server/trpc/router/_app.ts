import { router } from "../trpc";
import { itemRouter } from "./itemRouter";


export const appRouter = router({
  itemRouter: itemRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
