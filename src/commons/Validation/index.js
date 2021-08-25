const validate = values =>{
    let errors = {};
    const {title} = values;
    if (!title){
        errors.title ='vui lòng nhập tiêu đề !'
    } else if (title.trim() && title.length <5){
        errors.title = 'Tiêu đề phải lớn hơn 5 kí tự !'
    }
    if (!values.email) {
        errors.email = 'Vui lòng nhập Email'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Đây không phải Email !'
      }
    if (!values.password){
        errors.password="Vui lòng nhập mật khẩu";
    }else if ((values.password.match(/[a-z]/g) && values.password.match( 
        /[A-Z]/g)  && values.password.match( 
            /[0-9]/g) && values.password.length > 8)) {
            errors.password="";
    }else{
        errors.password="Vui lòng kiểm tra lại mật khẩu";
    }
    if (!values.cPassword){
        errors.cPassword="Vui lòng nhập mật khẩu";
    }else if (values.cPassword.match(/[a-z]/g) && values.cPassword.match( 
        /[A-Z]/g) && values.cPassword.match( 
        /[0-9]/g) &&  values.cPassword.length >8 ){
            errors.cPassword="";
    }else{
        errors.cPassword="Vui lòng kiểm tra lại mật khẩu";
    }
    if(values.cPassword !==values.password){
        errors.cPassword="Mật khẩu không khớp !";
    }
    return errors;
}

export default validate;