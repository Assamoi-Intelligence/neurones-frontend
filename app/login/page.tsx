'use client'
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";


const LoginPage: FC = () => {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}, } = useForm({defaultValues: {
        email: '', password: '',
    }});
    
    const onProcessForm = async (dataForm) => {
        const formData = new FormData();
        formData.append('email',dataForm.email);
        formData.append('password', dataForm.password);

        const response = await axios.post('http://localhost:8000/auth/login', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
        const {data} = response;
        if (data.ok && data.user) {
            router.push('/posts');
        }
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center">
      <div className="">
        <form onSubmit={handleSubmit(onProcessForm)} action="" className="w-[25rem] border border-slate-100 rounded-sm shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-center text-2xl my-4 font-bold">Connexion</h1>
          <div>
            <div className="flex flex-col gap-4">
              <div>
                <Input {...register('email', {required: "Requis"})} variant="bordered" type="email" label="Email" />
                {errors.email?.message && <p className="text-red-500 font-semibold italic">{errors.email.message}</p>}
              </div>
              <div>
                <Input {...register('password', {required: "Requis"})} variant="bordered" type="text" label="Password" />
                {errors.password?.message && <p className="text-red-500 font-semibold italic">{errors.password.message}</p>}
              </div>
            </div>
          </div>
          <div className="self-center">
            <Button type="submit" color="primary" size="lg">Connexion</Button>
          </div>
        </form>
      </div>
    </div>
    );
}

export default LoginPage