const scrollTop = (e) =>{
    e.stopPropagation()
    window.scrollTo({ top : 0 , behavior : 'smooth'})
}

export default scrollTop