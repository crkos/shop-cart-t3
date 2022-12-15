
import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { ShoppingItem } from "@prisma/client";

export const itemRouter = router({
  addItem: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({input, ctx}) => {
      const {name} = input
      const item = ctx.prisma.shoppingItem.create({
        data: {
          name: name
        }
      })
      return item
    }),
  getAllItems: publicProcedure.
    input(z.null())
    .query(({ctx}) => {
      return ctx.prisma.shoppingItem.findMany();
    }),
  deleteItem: publicProcedure
    .input(z.object( { id: z.string() } ))
    .mutation(({input, ctx}) => {
      const {id} = input;
      const item = ctx.prisma.shoppingItem.delete(
        {
          where: {
            id
          }})
      return item
    }),
  checkItem: publicProcedure
    .input(z.object({id: z.string(), checked: z.boolean()}))
    .mutation(({input, ctx}) => {
      const {id, checked} = input;
      const item = ctx.prisma.shoppingItem.update({
        where: {
          id
        },
        data: {
          checked: checked
        }
      })

      return item


})


})


