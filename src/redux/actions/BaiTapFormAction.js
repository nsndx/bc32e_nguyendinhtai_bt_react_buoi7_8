import { search, sua_sv, them_capNhat_sv, value_search, xoa_sv } from "../types/BaiTapFormType";

export const themCapNhatAction = (sv) => ({ type: them_capNhat_sv, payload: sv })
export const xoaAction = (maSV) => ({ type: xoa_sv, payload: maSV })
export const suaAction = (sv) => ({ type: sua_sv, payload: sv })
export const searchAction = (val) => ({ type: search, payload: val })
export const valueSearchAction = (val) => ({ type: value_search, payload: val })