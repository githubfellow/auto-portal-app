import { FC } from 'react'
import Image from 'next/image'
import { Box, Card, CardContent, Container } from '@mui/material'

import { IHomeCategoryBlockContent } from '@/shared/api/types/strapi-content.types'

const CategoryBlockList: FC<{homeCategoryBlocks: IHomeCategoryBlockContent[]}> = ({homeCategoryBlocks}) => {
	const mainCategory = homeCategoryBlocks.find((c: IHomeCategoryBlockContent) => c.attributes.isMain)
	const otherCategories = homeCategoryBlocks.filter((c: IHomeCategoryBlockContent) => c.id !== mainCategory?.id)

	return (
		<Container maxWidth="xl">
			<Box display='flex' justifyContent='center' flexWrap='wrap' gap={2} sx={{ mt: 3 }}>
				<Card sx={{ width: '860px', height: '340px' }}>
					<CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
						<Box sx={{ width: '380px', mt: '55px', ml: '55px' }}>
							<h3>{mainCategory?.attributes.title}</h3>
							<Box sx={{
								width: "5rem",
								height: "0.25rem",
								marginBottom: "1.25rem",
								background: "#E2B979",
								marginLeft: "auto",
								marginRight: "auto"
							}}></Box>
							<p>{mainCategory?.attributes.desc}</p>
						</Box>
						<Box sx={{ width: '325px', height: '220px', position: 'relative' }}>
							<Image
								layout='fill'
								draggable={false}
								priority
								src='/static/card_car1.png'
								alt=''
							/>
						</Box>
					</CardContent>
				</Card>
				{otherCategories.map((c: IHomeCategoryBlockContent) => (
					<Card sx={{ width: '420px', height: '340px' }} key={c.id}>
						<CardContent sx={{ margin: '55px 20px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
							<h3>{c.attributes.title}</h3>
							<Box sx={{
								width: "5rem",
								height: "0.25rem",
								marginBottom: "1.25rem",
								background: "#E2B979",
								marginLeft: "auto",
								marginRight: "auto"
							}}></Box>
							<p>{c.attributes.desc}.</p>
						</CardContent>
					</Card>
				))}
			</Box>
		</Container>
	)
}

export default CategoryBlockList