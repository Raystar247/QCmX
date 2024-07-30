import axios from 'axios';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Container, Stack, TextField } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const BACKEND_URL: string = "http://localhost:3000";

type UserType = {
  id: string;
  username: string;
  email: string;
  password: string;
};

type UserRegisterFormType = {
  username: string;
  email: string;
  password: string;
};

const validationSchema = yup.object({
    email: yup.string()
            .required('必須項目です')
            .email('正しいメールアドレスを入力してください'),
    username: yup.string().required('必須項目です'),
    password: yup.string()
                .required('必須項目です')
                .min(6, '指定文字数より多い文字数で入力してください')
                .matches(
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&].*$/,
                  'パスワードが弱いです'
                )
});

const UserRegister: React.FC = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<UserRegisterFormType>({
    resolver: yupResolver(validationSchema)
  });
  
  const [users, setUsers] = useState<UserType[]>([]);

  const addUser: SubmitHandler<UserRegisterFormType> = async (event: UserRegisterFormType) => {
    const { username } = event;
    console.log(username);
    await axios.post(`${BACKEND_URL}/user/register`, {
              data: event
            })
            .then((response) => {
              console.log(response.data);
              const username = response.data;
              setUsers((_preUsers) => [username, ..._preUsers]);
            })
            .catch((error) => { console.log(error); });
  }

  useEffect(() => {
    axios.get(BACKEND_URL)
      .then((response) => {
        console.log(response.data);
        const { users } = response.data;
        setUsers(users);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <Container sx={{ pt: 5 }}>
      <Stack spacing={3}>
        <TextField
          required
          label="メールアドレス"
          type="email"
          {...register('email')}
          error={'email' in errors}
          helperText={errors.email?.message}
        />
        <TextField
          required
          label="お名前"
          {...register('username')}
          error={'name' in errors}
          helperText={errors.username?.message}
        />
        <TextField
          required
          label="パスワード"
          type="password"
          {...register('password')}
          error={'password' in errors}
          helperText={errors.password?.message}
        />
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleSubmit(addUser)}
        >
          作成
        </Button>
      </Stack>
    </Container>
  )
}

export default UserRegister;