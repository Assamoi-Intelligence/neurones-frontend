'use client'
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import User from "./models/user";

export default function Home() {

  const imgInput = useRef<HTMLInputElement | null>();
  const [file, setFile] = useState<File | null>();
  const [imagePreview, setImagePreview] = useState<string>("");
  const {register, handleSubmit, formState: {errors}, } = useForm<User>({defaultValues: {
    first_name: '', last_name: '', email: '', age: undefined, password: ''
  }})

  const handleAddPP = () => {
    imgInput.current?.click();
  }

  const handleSelectedPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event:  ProgressEvent<FileReader>) => {
      setImagePreview(event.target?.result as string)
    }
    reader.readAsDataURL(file);
    setFile(file);
  }

  const removePicture = () => {
    setFile(null);
    setImagePreview('');
  }

  const onProcessForm = (dataForm: User) => {
    if (!file) {alert("Add picture"); return;};
    const formData = new FormData();
    formData.set('file', file);
    formData.set('first_name', dataForm.first_name);
    formData.set('last_name', dataForm.last_name);
    formData.set('age', Number(dataForm.age).toString());
    formData.set('email',dataForm.email);
    formData.set('password', dataForm.password);

    fetch('http://localhost:8000/auth/register', {body: formData, method: 'POST', headers: {'Content-type': 'multi-part/form-data'}}).then(response => {
      console.log(response);
    }).catch(error => {
      alert(error);
      console.log(error);
    })

  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="">
        <form onSubmit={handleSubmit(onProcessForm)} action="" className="border border-slate-100 rounded-sm shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-center text-2xl my-4 font-bold">Création de compte</h1>
          <div className="grid grid-cols-[25rem_20rem]">
            <div className="flex flex-col gap-4">
              <div>
                <Input {...register('first_name', {required: "Requis"})} variant="bordered" type="text" label="First name" />
                {errors.first_name?.message && <p className="text-red-500 font-semibold italic">{errors.first_name.message}</p>}
              </div>
              <div>
                <Input {...register('last_name', {required: "Requis"})} variant="bordered" type="text" label="Last name" />
                {errors.last_name?.message && <p className="text-red-500 font-semibold italic">{errors.last_name.message}</p>}
              </div>
              <div>
                <Input {...register('age', {required: "Requis"})} variant="bordered" type="number" label="Age" />
                {errors.age?.message && <p className="text-red-500 font-semibold italic">{errors.age.message}</p>}
              </div>
              <div>
                <Input {...register('email', {required: "Requis"})} variant="bordered" type="email" label="Email" />
                {errors.email?.message && <p className="text-red-500 font-semibold italic">{errors.email.message}</p>}
              </div>
              <div>
                <Input {...register('password', {required: "Requis"})} variant="bordered" type="text" label="Password" />
                {errors.password?.message && <p className="text-red-500 font-semibold italic">{errors.password.message}</p>}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div>
              {
                imagePreview && imagePreview!== "" ? 
                <div>
                  <Image src={imagePreview} width={'4000'} height={'4000'} className="w-full h-full" alt="pp_preview" />
                  <Button className="" color="danger" onClick={removePicture}>X</Button>
                </div> : 
                <div>
                  <input onChange={handleSelectedPicture} ref={imgInput} name="profil_picture" type="file" accept="image/*" hidden />
                  <Button onClick={handleAddPP} variant="flat" color="default" size="lg">+ Ajouter une photo de profil</Button>
                </div>
              }
              </div>
            </div>
          </div>
          <div className="self-center">
            <Button type="submit" color="primary" size="lg">Inscription</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
