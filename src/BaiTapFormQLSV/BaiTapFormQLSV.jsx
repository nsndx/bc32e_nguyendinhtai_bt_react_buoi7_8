import React, { Component } from 'react'
import TableSinhVien from './TableSinhVien'
import ThongTinSinhVien from './ThongTinSinhVien'

export default class BaiTapFormQLSV extends Component {
   render() {
      return (
         <div className='max-w-6xl m-auto'>
            <h3 className='text-center text-2xl font-bold uppercase p-3'>Bài tập form quản lý sinh viên</h3>
            <ThongTinSinhVien />
            <TableSinhVien />
         </div>
      )
   }
}
