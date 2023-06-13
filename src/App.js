import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as yup from 'yup'
import { addStudent, deleteStudent, editStudent } from "./redux/scoreSlice";
import { nanoid } from "@reduxjs/toolkit";



function App() {
   const { listStudent } = useSelector(state => state.scoreSlice)
   const { listStudentEdit} = useSelector(state => state.scoreSlice)
   
   const dispatch = useDispatch()
   const formik = useFormik({
      initialValues: {
         hoTen: listStudent.hoTen,
         toan: listStudent.toan,
         ly: listStudent.ly,
         hoa: listStudent.hoa,

      },
      validationSchema: yup.object({
         hoTen: yup.string().required(' ko bỏ trống')
      }),
      onSubmit: values => {
         
         if(!values.id){
            dispatch(addStudent(values))
         }else {
           dispatch(editStudent(values))
         }
         
      }
   })

   // const formikEdit = useFormik({
   //    enableReinitialize: true,
   //    initialValues: {
   //          hoTen: listStudentEdit.hoTen,
   //          toan: listStudentEdit.toan,
   //          ly: listStudentEdit.ly,
   //          hoa: listStudentEdit.hoa
   //    },
   //    onSubmit: values => {

   //    }
   // })
   let classNameTB = ''
   const handleTB = () => {
      const tb = Number(formik.values.toan) + Number(formik.values.ly) + Number(formik.values.hoa) 
      Number(tb)   
     classNameTB = tb/3 > 8 ? 'text-dange' : ''
    return classNameTB
   }
   // console.log(classNameTB)
   // const handleChangeFormik = ()=>{
   //    if(listStudentEdit && listStudent === ''){
   //       return formikEdit.formik.handleChange
   //    }else if(listStudentEdit === '' && listStudent) {
   //       return formik.handleChange
   //    }

   // }
   return (
      <div className="container">
         <h1 className='text-center text-info mt-4 mb-5'>Class Marksheet</h1>
         <form onSubmit={formik.handleSubmit} className="w-25 m-auto">
            <div className='form-group'>
               <span>Name:</span>
               <input type="text" className="form-control" name='hoTen' value={formik.values.hoTen} onChange={formik.handleChange} />
            </div>

            <div className='form-group'>
               <span>Toan:</span>
               <input type="text" className="form-control" name='toan' value={formik.values.toan} onChange={formik.handleChange} />
            </div>

            <div className='form-group'>
               <span>Ly:</span>
               <input name='ly' onChange={formik.handleChange} type="text" value={formik.values.ly} className="form-control" />
            </div>

            <div className='form-group'>
               <span>Hoa:</span>
               <input name='hoa' onChange={formik.handleChange} value={formik.values.hoa} type="text" className="form-control" />
            </div>

            <button type="submit" className="btn btn-outline-primary mt-2">Add</button>
         </form>
         <table className="table container mt-3 w-80 m-auto">
            <thead>
               <tr>
                  <th>TT</th>
                  <th>Name</th>
                  <th>Toan</th>
                  <th>Ly</th>
                  <th>Hoa</th>
                  <th>score GPA</th>
                  <th></th>
                  <th></th>

               </tr>
            </thead>
            <tbody>
               {listStudent.map((item, index) => {
                  let tb = ((parseInt(item.toan) + Number(item.ly) + Number(item.hoa)) / 3).toFixed(2)
                  return <tr className={tb > 8 ? 'text-danger' : ''} key={index}>
                     <td>{index}</td>
                     <td>{item.hoTen}</td>
                     <td>{item.toan}</td>
                     <td>{item.ly}</td>
                     <td>{item.hoa}</td>
                     <td>{tb}</td>
                     <td><button className='btn btn-warning' onClick={()=> {dispatch(editStudent(item))}}>Edit</button></td>
                     <td><button className='btn btn-danger' onClick={()=>{dispatch(deleteStudent(item.id))}}>Del</button></td>
                  </tr>
               })}
            </tbody>
         </table>
         <div className='text-center mt-3'>
            <button className='btn btn-outline-success btn-sm'>Điểm trung bình</button>
            <button className={'m-2 btn btn-outline-danger btn-sm'} onClick={handleTB}>Học sinh giỏi</button>
         </div>

      </div>
   );
}

export default App;
