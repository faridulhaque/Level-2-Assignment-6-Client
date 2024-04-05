export type TCartModalData = {
  gadgetId: string;
  quantity: number;
  addedBy: string;
};

export type TCartModal = {
  cartModalData: TCartModalData;
  setCartModalData: (data: TCartModalData) => void;
};
