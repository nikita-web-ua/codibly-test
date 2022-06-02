import {useState} from "react";

export const Paginator = ({curPage, totalPages, onChangePage}) => {

    const [btnPrevDisabled, setBtnPrevDisabled] = useState(true)
    const [btnNextDisabled, setBtnNextDisabled] = useState(false)


    let onClickNext = () => {
        if (curPage < totalPages) {
            let nextPage = Number(curPage) + 1
            onChangePage(nextPage)
            setBtnPrevDisabled(false)
            if (nextPage === totalPages) setBtnNextDisabled(true)
        }
    }

    let onClickPrev = () => {
        if (curPage > 1) {
            let nextPage = Number(curPage) - 1
            onChangePage(nextPage)
            setBtnNextDisabled(false)
            if (nextPage === 1) setBtnPrevDisabled(true)

        }
    }

    return (
        <div className="paginator">
            <button onClick={onClickPrev} disabled={btnPrevDisabled}>{'<='}</button>
            <button onClick={onClickNext} disabled={btnNextDisabled}>{'=>'}</button>
        </div>
    )
}