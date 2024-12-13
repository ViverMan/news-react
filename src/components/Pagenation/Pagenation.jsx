import styles from "./styles.module.css"
const Pagenation = ({ totalPages, currentPage, handlePageClick, handleNextPage, handlePrevPage }) => {
	return (
		<div className={styles.pagenation}>
			<button disabled={currentPage <= 1} onClick={handlePrevPage} className={styles.arrow}>{"<"}</button>
			<div className={styles.list}>
				{[...Array(totalPages)].map((_, index) => {
					return (
						<button onClick={() => handlePageClick(index + 1)} className={styles.pageNumber} disabled={index + 1 === currentPage} key={index}>
							{index + 1}
						</button>
					)
				})}
			</div>
			<button disabled={currentPage >= totalPages} onClick={handleNextPage} className={styles.arrow}>{">"}</button>
		</div>
	)
}
Pagenation.propTypes = String
export default Pagenation
