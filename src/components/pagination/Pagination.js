// import React from 'react'

// const Pagination = ({tablePages, visiblePages, changePage, onKeyPress}) => {
//     return (
//         <div>
//             {tablePages.length > 1 && 
                            
//                 <div className="pagination">
//                         <div className="page_numbers" ref={pageNum}> 
//                             {visiblePages.map((num, index)=>
//                                 <button key={"page_btn_num_" + index}
//                                 className={index === 0? "active": ""}
//                                 type="button" onClick={() => changePage(num, tablePages)}>{num}</button>
//                             )}

//                         </div>
//                         <div className="page_input">
//                             <input type="number" min={1} max={tablePages.length}    
//                             placeholder="pg#"
                            
//                             onKeyPress={(e) => onKeyPress(e)}></input>

//                         </div>
//                 </div>
            
//             }    
//         </div>           
//     )
// }

// export default Pagination
