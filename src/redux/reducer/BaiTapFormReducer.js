import { search, sua_sv, them_capNhat_sv, value_search, xoa_sv } from "../types/BaiTapFormType"

const initialState = {
   mangSinhVien: [
      { maSV: 1, hoTen: 'aaa', phone: '0323699', email: 'aa@mail.com' },
      { maSV: 2, hoTen: 'bbb', phone: '0323699', email: 'aa@mail.com' },
   ],
   sinhVienEdit: {},
   dataMangSinhVien: [
      // { maSV: 1, hoTen: 'aaa', phone: '0323699', email: 'aa@mail.com' },
      // { maSV: 2, hoTen: 'bbb', phone: '0323699', email: 'aa@mail.com' },
   ]
}

export const BaiTapFormReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case them_capNhat_sv: {
         let i = state.mangSinhVien.findIndex(sv => sv.maSV == payload.maSV)
         if (i !== -1) {
            state.mangSinhVien[i] = payload
         } else {
            state.mangSinhVien = [...state.mangSinhVien, payload]
         }
         let ii = state.dataMangSinhVien.findIndex(sv => sv.maSV == payload.maSV)
         if (ii !== -1) {
            state.dataMangSinhVien[ii] = payload
         } else {
            state.dataMangSinhVien = [...state.dataMangSinhVien, payload]
         }
         state.sinhVienEdit = { maSV: '', hoTen: '', phone: '', email: '' }
         return { ...state }
      }

      case xoa_sv: {
         state.mangSinhVien = state.mangSinhVien.filter(sv => sv.maSV !== payload)
         state.dataMangSinhVien = state.dataMangSinhVien.filter(sv => sv.maSV !== payload)
         return { ...state }
      }

      case sua_sv: {
         return { ...state, sinhVienEdit: payload }
      }

      case search: {
         if (payload.trim() !== '') {
            state.mangSinhVien = state.dataMangSinhVien.filter(sv => sv.hoTen === payload)
         }
         return { ...state }
      }

      case value_search: {
         if (payload === '') {
            state.mangSinhVien = state.dataMangSinhVien
            return { ...state }
         }
      }

      default: return state
   }
}
