import { useEffect } from "react"
import { useState } from "react"
import NewsBanner from "../../components/NewsBanner/NewsBanner"
import styles from "./styles.module.css"
import { getCategories, getNews } from "../../api/apiNews"
import NewsList from "../../components/NewsList/NewsList"
import Skeleton from "../../components/Skeleton/Skeleton"
import Pagenation from "../../components/Pagenation/Pagenation"
import Categories from "../../components/Categories/Categories"

const Main = () => {
	const [news, setNews] = useState([])
	const [loading, setIsLoading] = useState(true)
	// --- состояние текущей страницы --- //
	const [currentPage, setCurrentPage] = useState(1)
	const [categories, setCategories] = useState([])
	const [selectedCategory, setSelectedCategory] = useState('All')
	const totalPages = 10
	const pageSize = 10
	const fetchNews = async (currentPage) => {
		try {
			setIsLoading(true)
			const response = await getNews(
				{ 
					page_number: currentPage, 
					page_size: pageSize, 
					category: selectedCategory === 'All' ? null : selectedCategory 
				}
			)
			setNews(response.news)
			setIsLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	const fetchCategories = async () => {
		try {
			const response = await getCategories()
			setCategories(['All', ...response.categories])
		} catch (error) {
			console.log(error)
		}
	}
	
	useEffect(() => {
		fetchCategories()
	}, []);


	useEffect(() => {
		fetchNews(currentPage)
	}, [currentPage, selectedCategory]);

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
			<Categories categories={categories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
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
