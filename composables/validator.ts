import * as yup from 'yup'

export const useLoginSchema = yup.object({
   email: yup.string().email('Email tidak valid').required('Email tidak boleh kosong'),
   password: yup.string().required('Kata sandi harus diisi')
})

export const useUpdateProfileSchema = yup.object({
   email: yup.string().email('Email tidak valid').required('Email tidak boleh kosong'),
   password: yup.string().required('Kata sandi harus diisi'),
   name: yup.string().required('Nama harus diisi'),
   employee_number: yup.string().required('NIP harus diisi')
})