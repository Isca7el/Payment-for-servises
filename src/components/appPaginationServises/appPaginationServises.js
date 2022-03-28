import './appPaginationServises.css';

const AppPaginationServises = ({postPerPage, totalServises, paginate}) => {
const pageNumbers = [];


for (let i = 1; i <= Math.ceil(totalServises / postPerPage); i++){
    pageNumbers.push(i);
}

const items = pageNumbers.map(number => {
    return(
        <li key={number} className="pagination__item">
            <span className="pagination__span" onClick={() => paginate(number)}>
                {number}
            </span>
        </li>
    )
});

return( 
    <nav>
        <ul className="pagination">
            {items}
        </ul>
    </nav>
)
};

export default AppPaginationServises;