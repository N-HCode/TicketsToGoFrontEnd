import React, { useState,useRef, useEffect} from 'react'

const Pagination = ({numberOfPages, paginationConfig, changeShownDataByPageNum}) => {

    // //example paginationConfig:
    // const paginationConfig = {
    //     perPage: 1,
    //     numOfPageBthAfter: 2,
    //     numOfPageBthBefore: 2
    // }
    const pageNum = useRef();
    const arrayOfPages = Array.from(new Array(numberOfPages), (x,y) => y+1);
    const [visiblePages, setVisiblePages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const currentActivePageNum = useRef(0);

    useEffect(() => {
        //the numberOfpages comes from the main component. This is because the main component
        //has the data and the length of the data to divide by the paginationConfig.perPage.
        //There is not reason to send the data to the pagination component.
        //However, we need to rerender everytime there is a change to numberofPage
        //for ref, you can do this and it will return a true if it exist or false
        
        if (pageNum.current) {
            changePage(currentPage, arrayOfPages);
        }

    }, [numberOfPages])


    const changePage = (number, pages) => {
        //This is the function will change the data shown. This will be passed down from the main component
        changeShownDataByPageNum(number);
        setCurrentPage(number);

        ////Everything else below is the pagination logic

        //put upper and lower adjustment so there will only need to be one place to change the text
        //if we change the object property name
        const upperAdjustment = paginationConfig.numOfPageBthAfter;
        //we add one here to include the active number in the total. We could have put it in the
        //BtnAfter, then we would just have to adjust some calculations
        const lowerAdjustment = paginationConfig.numOfPageBthBefore +1;

        //These upper and lower limit is to be used to get the index for the slice.
        const upperLimit = number + upperAdjustment;
        const lowerLimit = number - lowerAdjustment;

        //this is just the total number of pagination button that would be shown.
        //That will just be the combined adjustments.
        const totalPages = upperAdjustment + lowerAdjustment;

        //The last page is the length as slice is non-inclusive at the end. So we need to have the last index+1
        const lastPage = pages.length;

        //This is to calculate the page number that will trigger the logic to not add anymore pages.
        //We need this for the edge case where the we have the last page already appearing
        const lastMinusTotal = lastPage - totalPages;

        //we need this incase the current page displayed is less than the total pages we want.
        const currentPageLength = pageNum.current.children.length;

        //This will change the active className to the page that is clicked.
        if(currentPageLength > 1){
            try {
                pageNum.current.children[currentActivePageNum.current].classList.remove("active");
            } catch (error) {
                
            }
            
        }

        if (number >= paginationConfig.numOfPageBthBefore + 1 && number <= lastPage - (upperAdjustment + 1) ) {

            
            //The active page will always be in the middle if there are enough pages and the total pages
            //does not cover the whole page.
            if(currentPageLength > 1){
                currentActivePageNum.current = lowerAdjustment-1;
                pageNum.current.children[lowerAdjustment-1].classList.add("active");
            }

            
            //we only want a subsection of the total page array. So we can slice it
            //Just make sure that slice is non-inclusive for the upperlimit.
            return setVisiblePages(pages.slice(lowerLimit, upperLimit));

        }else if(number < lowerAdjustment){
            
            if(currentPageLength > 1){
                let pageIndex = (number -1);
                currentActivePageNum.current = pageIndex;
                pageNum.current.children[pageIndex].classList.add("active");
            }
            return setVisiblePages(pages.slice(0, totalPages));
    
        }else{
        
            if(currentPageLength > 1){
                //total minus 1 will get us the total index since it is 0 based.
                //we use the length bec - the number will give us the amount away from the final index
                try {
                    let pageIndex = (currentPageLength - 1) - (lastPage - number); 
                    currentActivePageNum.current = pageIndex;
                    pageNum.current.children[pageIndex].classList.add("active");
                    
                } catch (error) {
                    return(changePage(1,pages))
                }
            }
            //if the totalpages is more that the available pages, the lower limit will be a negative
            //slice goes backwards if it has a negaive number. We do not want that, so we have a logic
            //to make sure that the lower limit does not go below 0
            
            return setVisiblePages(pages.slice(lastMinusTotal > 0? lastMinusTotal : 0, lastPage))

        }
    }



    const onKeyPress = (e) => {
        let value = e.target.value;
        if(e.key === "Enter"){
            //need to parse int because the value we get is in string format
            if(Number.isInteger(parseInt(value)) && value > 0 && value <= arrayOfPages.length){
                changePage(parseInt(value), arrayOfPages);
            }
            e.target.value = '';
        }

    }


    return (
        <div style={{
            "display" : "flex",
            "alignItems" : "end",
            "justifyContent" : "end"

        }}>
            <div>
                {arrayOfPages.length > 1 && 
                                
                    <div className="pagination">
                            <div className="page_numbers" ref={pageNum}> 
                                {visiblePages.map((num, index)=>
                                    <button key={"page_btn_num_" + index}
                                    className={index === 0? "active": ""}
                                    type="button" onClick={() => changePage(num, arrayOfPages)}>{num}</button>
                                )}

                            </div>
                            <div className="page_input">
                                <input type="number" min={1} max={arrayOfPages.length}    
                                placeholder="pg#"
                                
                                onKeyPress={(e) => onKeyPress(e)}></input>

                            </div>
                    </div>
                
                }    
            </div>
        </div>           
    )
}

export default Pagination
