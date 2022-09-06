const yup = require('yup');

let schema = yup.object().shape({
    age: yup.number().required().min(10).max(20),
    email: yup.string().email(),
});

schema.validate({
    email: 'jkkl',
    age: 11
}).catch(err=>{
    console.log(err.message);
})