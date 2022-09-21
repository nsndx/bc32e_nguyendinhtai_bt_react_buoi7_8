import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchAction, suaAction, valueSearchAction, xoaAction } from '../redux/actions/BaiTapFormAction'

class TableSinhVien extends Component {

   state = {
      search: ''
   }

   handleSearch = (e) => {
      this.setState({ search: e.target.value }, () => this.props.dispatch(valueSearchAction(this.state.search)))
   }

   render() {
      const { mangSinhVien, dispatch, sinhVienEdit } = this.props
      return (
         <div>
            <table className='w-full text-left'>
               <thead className='bg-gray-800 text-white'>
                  <tr>
                     <th className='px-3'>Mã SV</th>
                     <th>Họ tên</th>
                     <th>Số ĐT</th>
                     <th>Email</th>
                     <th><i className="fa-solid fa-gears"></i></th>
                     <th className='px-3 w-60'>
                        <input onChange={this.handleSearch} type="text" className='border-2 p-2 rounded-lg w-36 mr-1 text-black font-normal outline-none' placeholder='Họ tên' />
                        <button onClick={() => dispatch(searchAction(this.state.search))} className='p-2 bg-yellow-800 text-white rounded-lg hover:bg-yellow-600'>Search</button>
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {mangSinhVien.map((sv, i) => (
                     <tr key={i} className='border-b border-gray-500'>
                        <td className='p-3'>{sv.maSV}</td>
                        <td>{sv.hoTen}</td>
                        <td>{sv.phone}</td>
                        <td>{sv.email}</td>
                        <td>
                           <button className='p-2 bg-blue-800 text-white rounded-lg hover:bg-blue-600 mr-2' onClick={() => dispatch(suaAction(sv))}>Sửa</button>
                           {sinhVienEdit.maSV !== sv.maSV ? <button className='p-2 bg-red-800 text-white rounded-lg hover:bg-red-600' onClick={() => dispatch(xoaAction(sv.maSV))}>xoá</button> : ''}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      )
   }
}

export default connect(state => ({
   mangSinhVien: state.BaiTapFormReducer.mangSinhVien,
   sinhVienEdit: state.BaiTapFormReducer.sinhVienEdit
}))(TableSinhVien)