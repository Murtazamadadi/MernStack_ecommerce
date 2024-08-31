export const scrollToTop=(e)=>{
    e.stopPropagation()
    window.scroll({top:0,behavior:"smooth"})
}