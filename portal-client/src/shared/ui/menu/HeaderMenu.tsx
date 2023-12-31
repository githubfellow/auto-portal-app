import { FC, useState } from 'react'
import {
	AdminPanelSettings as AdminPanelSettingsIcon,
	Bookmarks as BookmarksIcon,
	Group as GroupIcon,
	Inventory2 as Inventory2Icon,
	Logout as LogoutIcon
} from '@mui/icons-material'
import {
	Avatar,
	Box,
	Button,
	Divider,
	Link,
	ListItemIcon,
	Menu,
	MenuItem
} from '@mui/material'

import { AuthService } from '@/processes/auth/model/auth.service'
import { useAuth } from '@/processes/auth/model/hooks/useAuth'

const HeaderMenu: FC = () => {
	const { user } = useAuth()

	const [anchorMenuEl, setAnchorMenuEl] = useState(null)
	const openMenu = Boolean(anchorMenuEl)
	const handleMenuClick = (event: any) => {
		setAnchorMenuEl(event.currentTarget)
	}
	const handleMenuClose = () => {
		setAnchorMenuEl(null)
	}

	const logoutHandler = async () => {
		await AuthService.logout()
		location.reload()
		//setUser(null)
	}

	const buttonStyle = {
		ml: 2,
		color: 'text.muted',
		'&:focus': {
			outline: 'none',
			color: 'inherit',
		},
		'&:hover': {
			bgcolor: 'transparent',
			color: '#000',
		},
	}

	const menuStyle = {
		elevation: 0,
		sx: {
			overflow: 'visible',
			filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
			mt: 1.5,
			'& .MuiAvatar-root': {
				width: 32,
				height: 32,
				ml: -0.5,
				mr: 1,
			},
			'&:before': {
				content: '""',
				display: 'block',
				position: 'absolute',
				top: 0,
				right: 14,
				width: 10,
				height: 10,
				bgcolor: 'background.paper',
				transform: 'translateY(-50%) rotate(45deg)',
				zIndex: 0,
			},
		},
	}

	return (
		<Box sx={{ my: { sm: 1, xs: 1 } }}>
			{user ? (
				<>
					<Button
						onClick={handleMenuClick}
						size="small"
						sx={buttonStyle}
						aria-controls={openMenu ? 'account-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={openMenu ? 'true' : undefined}
					>
						<Avatar sx={{ mr: 1 }}>{`${user.firstName.charAt(
							0
						)}${user.lastName.charAt(0)}`}</Avatar>
						{`${user.firstName} ${user.lastName}`}
					</Button>
					<Menu
						anchorEl={anchorMenuEl}
						id="account-menu"
						open={openMenu}
						onClose={handleMenuClose}
						onClick={handleMenuClose}
						PaperProps={menuStyle}
						transformOrigin={{ horizontal: 'right', vertical: 'top' }}
						anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
					>
						<Link href="/personal-area" underline="none" color="text.primary">
							<MenuItem>
								<Avatar />
								Личный кабинет
							</MenuItem>
						</Link>
						<Divider />
						<MenuItem onClick={logoutHandler}>
							<ListItemIcon>
								<LogoutIcon fontSize="small" />
							</ListItemIcon>
							Logout
						</MenuItem>
					</Menu>
				</>
			) : (
				<Link href="/auth" underline="none" color="text.primary">
					Авторизация
				</Link>
			)}
		</Box>
	)
}

export default HeaderMenu
