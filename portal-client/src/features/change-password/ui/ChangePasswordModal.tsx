import { FC, ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import {
	Grid,
	FormControl,
	Box,
	Button,
	OutlinedInput,
	IconButton,
	InputLabel,
	InputAdornment
} from "@mui/material"
import { styled } from "@mui/material/styles"
import {
	Visibility,
	VisibilityOff
} from "@mui/icons-material"

import ModalWrapper from "@/shared/ui/modal-wrapper/ModalWrapper"
import { toastError } from "@/shared/libs/toast-error"
import { useAuth } from "@/processes/auth/model/hooks/useAuth"
import { IProfileInput } from "@/entities/profile/ui/profile.interface"
import { ProfileService } from "@/entities/profile/model/profile.service"
import { useUpdateProdileMutation } from "../model/useUpdateProfileMutation"

interface IChangePasswordModal {
	open: boolean
	setOpen: any
}

const ChangePasswordModal: FC<IChangePasswordModal> = ({ open, setOpen }) => {
	const {user} = useAuth()
	const [msg, setMsg] = useState(null)
	const [oldPassword, setOldPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [showOldPassword, setShowOldPassword] = useState(false)
	const [showNewPassword, setShowNewPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const handleClickShowOldPassword = () => {
		setShowOldPassword(!showOldPassword)
	}

	const handleClickShowNewPassword = () => {
		setShowNewPassword(!showNewPassword)
	}

	const handleClickShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword)
	}

	const handleMouseDownPassword = (e: any) => {
		e.preventDefault()
	}

	const CenterLayout = styled(Box)({
		display: "flex",
		justifyContent: "center",
		marginTop: "20px",
		marginBottom: "20px",
	})

	const { mutateAsync: editPassword } = useUpdateProdileMutation(user, newPassword)

	const submitHandler = async (e: MouseEvent) => {
		e.preventDefault()
		if (newPassword !== confirmPassword) {
			toastError('Пароль не совпадает', 'Error')
		} else {
			await editPassword({ email: user!.email, password: newPassword })
			setOpen(false)
			setOldPassword("")
			setNewPassword("")
			setConfirmPassword("")
		}
	}

	return (
		<>
			<ModalWrapper open={open} setOpen={setOpen} title={"Изменение пароля"}>
				<Grid>
					<FormControl sx={{ mt: 3, width: "100%" }} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">
							Старый пароль
						</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							placeholder="Введите пароль"
							type={showOldPassword ? "text" : "password"}
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowOldPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showOldPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="Password"
						/>
					</FormControl>
					<FormControl sx={{ mt: 3, width: "100%" }} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">
							Пароль
						</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							placeholder="Введите пароль"
							type={showNewPassword ? "text" : "password"}
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowNewPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showNewPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="Password"
						/>
					</FormControl>
					<FormControl sx={{ mt: 3, width: "100%" }} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">
							Подтверждение пароля
						</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							fullWidth
							placeholder="Подтвердите пароль"
							type={showConfirmPassword ? "text" : "password"}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowConfirmPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="Password"
						/>
					</FormControl>

					<CenterLayout>
						<Button onClick={submitHandler} variant="outlined" color="inherit">
							Обновить
						</Button>
					</CenterLayout>
				</Grid>
			</ModalWrapper>
		</>
	)
}

export default ChangePasswordModal
