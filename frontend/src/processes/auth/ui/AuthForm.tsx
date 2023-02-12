import { useState } from "react"
import { Box, Button, Link } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"

import { useActions } from "@/app/store/utils/useActions"
import Heading from "@/shared/ui/heading/Heading"
import AccountDataFields from "./AccountDataFields"
import { IAuth, ILogin, IRegister } from "../model/types/auth.interface"
import { useAuthRedirect } from "../model/hooks/useAuthRedirect"

const AuthForm = () => {
	useAuthRedirect()

	const [type, setType] = useState<'login' | 'register'>('login')
	const {
		register: registerDto,
		handleSubmit,
		formState,
		reset,
	} = useForm<IAuth<ILogin | IRegister>>({
		mode: 'onChange',
	})

	const { register, login } = useActions()


	const onSubmit: SubmitHandler<IAuth<ILogin | IRegister>> = (data: any) => {
		if (type === 'login') {
			login(data)
		} else if (type === 'register') {
			register(data)
		}

		//reset()
	}

	return (
		<>
			<Heading title={type === 'login' ? 'Aвторизация': 'Регистрация'} />
			<form onSubmit={handleSubmit(onSubmit)}>
				<AccountDataFields
					type={type}
					formState={formState}
					register={registerDto}
					isPasswordRequired
				/>
				<Box sx={{ textAlign: 'center', mt: 3 }}>
					<Button variant="outlined" color="inherit" type='submit'>
						{type === 'login' ? 'Войти' : 'Зарегистрироваться'}
					</Button>
				</Box>
			</form>
			<Box sx={{ py: 3 }}>
				<Box>
					{type === 'login' ? 'Новый пользователь?' : 'Уже есть аккаунт?'}{' '}
					{type === 'login' ? (
						<Link
							style={{ color: 'navy', textDecoration: 'none', cursor: 'pointer' }}
							onClick={() => setType('register')}
						>
							Зарегистрироваться
						</Link>
					) : (
						<Link
							style={{ color: 'navy', textDecoration: 'none', cursor: 'pointer' }}
							onClick={() => setType('login')}
						>
							Войти
						</Link>
					)}
				</Box>
			</Box>
		</>
	)
}

export default AuthForm