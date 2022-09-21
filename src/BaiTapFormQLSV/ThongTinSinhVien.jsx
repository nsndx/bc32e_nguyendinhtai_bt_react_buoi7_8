import React, { Component } from 'react'
import { connect } from 'react-redux'
import { themCapNhatAction } from '../redux/actions/BaiTapFormAction';

class ThongTinSinhVien extends Component {
   state = {
      sinhVien: { maSV: '', hoTen: '', phone: '', email: '' },
      thongBao: { maSV: '', hoTen: '', phone: '', email: '' }
   }

   removeAscent = (str) => {
      if (str === null || str === undefined) return str;
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      return str;
   }

   layThongTin = (e) => {
      const { name, value } = e.target
      let error = ''
      if (value.trim() === '') { // kiểm tra rỗng
         error = 'Không để trống'
      }
      if (name === 'maSV' && value.trim() !== '') { // kiểm tra mã sinh viên
         const regex = /^[0-9]+$/
         if (!regex.test(value)) {
            error = 'Phải là số'
         }
         if (this.props.mangSinhVien.findIndex(sv => sv.maSV == value) !== -1) {
            error = 'Trùng mã sinh viên'
         }
      }
      if (name === 'hoTen' && value.trim() !== '') {// kiểm tra họ tên
         const regex = /^\S[a-zA-Z ]{1,}$/g
         if (!regex.test(this.removeAscent(value))) {
            error = 'Họ tên là chữ từ 2 kí tự trở lên'
         }
      }
      if (name === 'phone' && value.trim() !== '') {// kiểm tra số điện thoại
         const regex = /^[0-9]+$/
         if (!regex.test(value) || value.length < 10 || value.length > 12) {
            error = 'SĐT từ 10-12 số'
         }
      }
      if (name === 'email' && value.trim() !== '') {// kiểm tra email
         const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
         if (!regex.test(value)) {
            error = 'Email sai định dạng'
         }
      }
      this.setState({
         sinhVien: { ...this.state.sinhVien, [name]: value },
         thongBao: { ...this.state.thongBao, [name]: error }
      })
   }

   handleSubmit = (e) => {
      e.preventDefault()
      this.props.dispatch(themCapNhatAction(this.state.sinhVien))
      this.setState({ sinhVien: { maSV: '', hoTen: '', phone: '', email: '' } })
   }

   checkButtonThemSV = () => {
      for (const key in this.state.sinhVien) {
         if (this.state.thongBao[key] !== '' || this.state.sinhVien[key] === '') {
            return false
         }
      }
      if (this.state.sinhVien.maSV === this.props.sinhVienEdit.maSV) {
         return false
      }
      return true
   }

   checkButtonCapNhat = () => {
      for (const key in this.state.sinhVien) {
         if (this.state.thongBao[key] !== '' || this.state.sinhVien[key] === '') {
            return false
         }
      }
      if (this.state.sinhVien.maSV === this.props.sinhVienEdit.maSV) {
         return true
      }
      return false
   }

   checkInputMaSV = () => {
      if (this.state.sinhVien.maSV === this.props.sinhVienEdit.maSV && this.state.sinhVien.maSV !== '') {
         return false
      }
      return true
   }

   render() {
      const { sinhVien, thongBao } = this.state
      return (
         <div>
            <h3 className='bg-gray-800 text-white text-xl py-2 px-3 font-semibold'>Thông tin sinh viên</h3>
            <form onSubmit={this.handleSubmit} className='p-3 grid md:grid-cols-2 gap-x-8'>
               <div>
                  <p>Mã sinh viên</p>
                  {this.checkInputMaSV() ? <input onChange={this.layThongTin} value={sinhVien.maSV} name='maSV' type="text" className='w-full border border-gray-500 rounded-lg p-2 text-black outline-purple-900' /> : <input disabled value={sinhVien.maSV} className='w-full border border-gray-500 rounded-lg p-2 text-black bg-gray-300' />}
                  <p className='text-red-500 h-6'>{thongBao.maSV}</p>
               </div>
               <div>
                  <p>Họ tên</p>
                  <input onChange={this.layThongTin} value={sinhVien.hoTen} name='hoTen' type="text" className='w-full border border-gray-500 rounded-lg p-2 text-black outline-purple-900' />
                  <p className='text-red-500 h-6'>{thongBao.hoTen}</p>
               </div>
               <div>
                  <p>Số điện thoại</p>
                  <input onChange={this.layThongTin} value={sinhVien.phone} name='phone' type="text" className='w-full border border-gray-500 rounded-lg p-2 text-black outline-purple-900' />
                  <p className='text-red-500 h-6'>{thongBao.phone}</p>
               </div>
               <div>
                  <p>Email</p>
                  <input onChange={this.layThongTin} value={sinhVien.email} name='email' type="text" className='w-full border border-gray-500 rounded-lg p-2 text-black outline-purple-900' />
                  <p className='text-red-500 h-6'>{thongBao.email}</p>
               </div>
               <div className='mt-2'>
                  {this.checkButtonThemSV() ? <button className='p-2 bg-green-800 text-white rounded-lg hover:bg-green-600 mr-3'>Thêm sinh viên</button> : <button disabled className='p-2 bg-gray-800 text-white rounded-lg mr-3'>Thêm sinh viên</button>}
                  {this.checkButtonCapNhat() ? <button className='p-2 bg-blue-800 text-white rounded-lg hover:bg-blue-600'>Cập nhật</button> : <button disabled className='p-2 bg-gray-800 text-white rounded-lg'>Cập nhật</button>}
               </div>
            </form>
         </div>
      )
   }
   componentDidUpdate(prevProps, prevState) {
      if (prevProps.sinhVienEdit.maSV !== this.props.sinhVienEdit.maSV) {
         this.setState({
            sinhVien: this.props.sinhVienEdit,
            thongBao: { maSV: '', hoTen: '', phone: '', email: '' }
         })
      }
   }
}

export default connect(state => ({
   mangSinhVien: state.BaiTapFormReducer.mangSinhVien,
   sinhVienEdit: state.BaiTapFormReducer.sinhVienEdit
}))(ThongTinSinhVien)
