import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { trpc } from "../utils/trpc";
import type { ShoppingItem } from "@prisma/client";

interface ItemModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>,
  setItems: (value: (((prevState: ShoppingItem[]) => ShoppingItem[]) | ShoppingItem[])) => void
}

const ItemModal: FC<ItemModalProps> = ({ setModalOpen, setItems }) => {
  const [item, setItem] = useState<string>("")
  const {mutate: addItem} = trpc.itemRouter.addItem.useMutation({
    onSuccess(shoppingItem) {
      setItems(prevState => [...prevState, shoppingItem])
    }
  })
  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <div className="absolute inset-0 bg-black/75 flex justify-center items-center">
      <div className="space-y-4 p-3 bg-white">
        <h3 className="text-xl font-semibold">Name of item</h3>
        <input value={item} onChange={(e) => setItem(e.target.value)} type="text" className="w-full rounded-md border-gray-300 bg-gray-300 shadow-md focus: border-violet-300 focus:ring focus:ring-violet-300"/>
        <div className="grid grid-cols-2 gap-8">
          <button type="button" className="rounded-md bg-gray-500 p-1 text-xs text-white transition hover: bg-gray-600" onClick={closeModal}>Cancel</button>
          <button type="button" className="rounded-md bg-gray-500 p-1 text-xs text-white transition hover: bg-gray-600" onClick={() => {
            addItem({ name: item });
            closeModal();
          }}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;