import { TCartModalData } from "./cartTypes";

export type TGadgetFilterComp = {
  setItemsForFilter: (data: any) => void;
  setFilterTable: (data: boolean) => void;
  filterTable: boolean;
  itemsForFilter: any;
  handleFilter: () => void;
  handleClearFilter: () => void;
};

export type TLongTable = {
  data: any;
  role: string;
  createdBy: string;
};

export type TTableData = {
  delIds: string[];
  setDelIds(delIds: string[]): void;
  d: any;
  handleCartModal(data: TCartModalData): void;
};
