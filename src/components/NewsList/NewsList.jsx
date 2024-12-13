import NewsItem from "../NewsItem/NewsItem"
import styles from "./styles.module.css"

const NewsList = ({ news }) => {
	return (
		<ul className={styles.list}>
			{news.map((item) => {
				return <NewsItem item={item} key={item.id} />
			})}
		</ul>
	)
}
NewsList.propTypes = String
export default NewsList
