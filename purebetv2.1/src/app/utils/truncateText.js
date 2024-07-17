const truncateText = (text , size) => {
    if(text){
    if (text.length <= size) return text;
    return `${text.slice(0, size)}...`;
    }else{
      return text;
    }
  };
  export default truncateText;