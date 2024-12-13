import { useEffect } from "react"
import { useState } from "react"
import { getNews } from "../../api/apiNews"
import NewsBanner from "../../components/NewsBanner/NewsBanner"
import NewsList from "../../components/NewsList/NewsList"
import Skeleton from "../../components/Skeleton/Skeleton"
import Pagenation from "../../components/Pagenation/Pagenation"
import styles from "./styles.module.css"
const Main = () => {
	const [news, setNews] = useState([])
	const [loading, setIsLoading] = useState(true)
	// --- состояние текущей страницы --- //
	const [currentPage, setCurrentPage] = useState(1)
	const totalPages = 10
	const pageSize = 10
	const fetchNews = async (currentPage) => {
		try {
			setIsLoading(true)
			const response = await getNews(currentPage, pageSize)
			setNews(response.news)
			setIsLoading(false)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		fetchNews(currentPage)
	}, [currentPage])

	// --- функционал переключения страниц --- //
	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1)
		}
	}
	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}
	}
	const handlePageClick = (pageNumber) => {
		setCurrentPage(pageNumber)
	}
	return (
		<main className={styles.main}>
			{news.length > 0 && !loading ? <NewsBanner item={news[0]} /> : <Skeleton type="banner" count={1} />}
			<Pagenation 
				handleNextPage={handleNextPage} 
				handlePrevPage={handlePrevPage} 
				handlePageClick={handlePageClick} 
				totalPages={totalPages} 
				currentPage={currentPage} 
			/>
			{!loading ? <NewsList news={news} /> : <Skeleton type="item" count={10} />}
			<Pagenation 
				handleNextPage={handleNextPage} 
				handlePrevPage={handlePrevPage} 
				handlePageClick={handlePageClick} 
				totalPages={totalPages} 
				currentPage={currentPage} 
			/>
		</main>
	)
}

export default Main
